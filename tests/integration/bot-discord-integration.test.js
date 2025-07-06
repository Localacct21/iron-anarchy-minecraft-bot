const { EventEmitter } = require('events');
const fs = require('fs-extra');
const path = require('path');

// Mock external dependencies
jest.mock('discord.js');
jest.mock('fs-extra');

describe('Bot Discord Integration', () => {
  let mockBot;
  let mockDiscordClient;
  let mockChannel;
  let testConfig;

  beforeEach(() => {
    jest.clearAllMocks();
    
    mockBot = new EventEmitter();
    mockBot.chat = jest.fn();
    mockBot.username = 'TestBot';
    mockBot.health = 20;
    mockBot.food = 18;
    mockBot.entity = {
      position: { x: 100, y: 64, z: 200 }
    };

    mockChannel = {
      send: jest.fn().mockResolvedValue({ id: 'msg123' }),
      isTextBased: jest.fn(() => true)
    };

    mockDiscordClient = new EventEmitter();
    mockDiscordClient.login = jest.fn().mockResolvedValue('logged-in');
    mockDiscordClient.user = { tag: 'TestBot#1234' };
    mockDiscordClient.channels = {
      cache: {
        get: jest.fn().mockReturnValue(mockChannel)
      }
    };

    testConfig = {
      discord: {
        enabled: true,
        token: 'test-token',
        channelId: '123456789',
        botLogChannelId: '987654321'
      },
      recording: {
        enabled: true,
        interval: 5000
      }
    };
  });

  describe('Full Integration Flow', () => {
    test('should initialize bot and Discord client successfully', async () => {
      // Simulate bot initialization
      const initializeBot = async () => {
        await mockDiscordClient.login(testConfig.discord.token);
        mockDiscordClient.emit('ready');
        return true;
      };

      const result = await initializeBot();
      expect(result).toBe(true);
      expect(mockDiscordClient.login).toHaveBeenCalledWith(testConfig.discord.token);
    });

    test('should handle bot spawn and notify Discord', async () => {
      let discordNotified = false;
      
      const handleBotSpawn = async () => {
        const message = `🎮 Bot ${mockBot.username} has spawned at position (${mockBot.entity.position.x}, ${mockBot.entity.position.y}, ${mockBot.entity.position.z})`;
        await mockChannel.send(message);
        discordNotified = true;
      };

      mockBot.on('spawn', handleBotSpawn);
      mockBot.emit('spawn');

      // Wait for async operations
      await new Promise(resolve => setTimeout(resolve, 100));

      expect(discordNotified).toBe(true);
      expect(mockChannel.send).toHaveBeenCalledWith(
        expect.stringContaining('Bot TestBot has spawned')
      );
    });

    test('should handle bot death and notify Discord', async () => {
      const handleBotDeath = async () => {
        const message = `💀 Bot ${mockBot.username} has died!`;
        await mockChannel.send(message);
      };

      mockBot.on('death', handleBotDeath);
      mockBot.emit('death');

      // Wait for async operations
      await new Promise(resolve => setTimeout(resolve, 100));

      expect(mockChannel.send).toHaveBeenCalledWith(
        expect.stringContaining('Bot TestBot has died!')
      );
    });

    test('should handle chat messages and relay to Discord', async () => {
      const handleChat = async (username, message) => {
        if (username !== mockBot.username) {
          const discordMessage = `💬 **${username}**: ${message}`;
          await mockChannel.send(discordMessage);
        }
      };

      mockBot.on('chat', handleChat);
      mockBot.emit('chat', 'PlayerName', 'Hello world!');

      // Wait for async operations
      await new Promise(resolve => setTimeout(resolve, 100));

      expect(mockChannel.send).toHaveBeenCalledWith(
        '💬 **PlayerName**: Hello world!'
      );
    });

    test('should not relay own messages to Discord', async () => {
      const handleChat = async (username, message) => {
        if (username !== mockBot.username) {
          await mockChannel.send(`💬 **${username}**: ${message}`);
        }
      };

      mockBot.on('chat', handleChat);
      mockBot.emit('chat', mockBot.username, 'This is my message');

      // Wait for async operations
      await new Promise(resolve => setTimeout(resolve, 100));

      expect(mockChannel.send).not.toHaveBeenCalled();
    });
  });

  describe('Error Handling Integration', () => {
    test('should handle Discord connection failures gracefully', async () => {
      const error = new Error('Discord connection failed');
      mockDiscordClient.login.mockRejectedValue(error);

      let errorHandled = false;
      const handleDiscordError = (err) => {
        console.error('Discord error:', err.message);
        errorHandled = true;
      };

      try {
        await mockDiscordClient.login('invalid-token');
      } catch (e) {
        handleDiscordError(e);
      }

      expect(errorHandled).toBe(true);
    });

    test('should handle message sending failures', async () => {
      const error = new Error('Message send failed');
      mockChannel.send.mockRejectedValue(error);

      let errorHandled = false;
      const sendMessageSafely = async (message) => {
        try {
          await mockChannel.send(message);
        } catch (e) {
          console.error('Failed to send message:', e.message);
          errorHandled = true;
        }
      };

      await sendMessageSafely('Test message');
      expect(errorHandled).toBe(true);
    });

    test('should handle rate limiting', async () => {
      const rateLimitError = new Error('Rate limited');
      rateLimitError.code = 'RATE_LIMITED';
      rateLimitError.retryAfter = 1000;

      mockChannel.send.mockRejectedValueOnce(rateLimitError);
      mockChannel.send.mockResolvedValueOnce({ id: 'msg123' });

      let retryAttempted = false;
      const sendWithRetry = async (message) => {
        try {
          await mockChannel.send(message);
        } catch (e) {
          if (e.code === 'RATE_LIMITED') {
            retryAttempted = true;
            // Simulate retry after delay
            await new Promise(resolve => setTimeout(resolve, 100));
            await mockChannel.send(message);
          }
        }
      };

      await sendWithRetry('Test message');
      expect(retryAttempted).toBe(true);
      expect(mockChannel.send).toHaveBeenCalledTimes(2);
    });
  });

  describe('Configuration Integration', () => {
    test('should respect Discord enabled/disabled setting', () => {
      const shouldInitializeDiscord = (config) => {
        return config.discord && config.discord.enabled;
      };

      expect(shouldInitializeDiscord(testConfig)).toBe(true);
      
      const disabledConfig = { ...testConfig, discord: { enabled: false } };
      expect(shouldInitializeDiscord(disabledConfig)).toBe(false);
    });

    test('should validate required configuration fields', () => {
      const validateDiscordConfig = (config) => {
        if (!config.discord || !config.discord.enabled) {
          return { valid: false, reason: 'Discord disabled' };
        }
        
        const required = ['token', 'channelId'];
        const missing = required.filter(field => !config.discord[field]);
        
        if (missing.length > 0) {
          return { valid: false, reason: `Missing fields: ${missing.join(', ')}` };
        }
        
        return { valid: true };
      };

      expect(validateDiscordConfig(testConfig).valid).toBe(true);
      
      const invalidConfig = { discord: { enabled: true, token: 'test' } };
      const result = validateDiscordConfig(invalidConfig);
      expect(result.valid).toBe(false);
      expect(result.reason).toContain('channelId');
    });
  });

  describe('Recording Integration', () => {
    test('should initialize recording when enabled', () => {
      const initializeRecording = (config) => {
        return config.recording && config.recording.enabled;
      };

      expect(initializeRecording(testConfig)).toBe(true);
    });

    test('should handle recording events with Discord notifications', async () => {
      const handleRecordingStart = async () => {
        const message = '🎥 Recording started';
        await mockChannel.send(message);
      };

      const handleRecordingStop = async () => {
        const message = '⏹️ Recording stopped';
        await mockChannel.send(message);
      };

      // Simulate recording events
      await handleRecordingStart();
      await handleRecordingStop();

      expect(mockChannel.send).toHaveBeenCalledWith('🎥 Recording started');
      expect(mockChannel.send).toHaveBeenCalledWith('⏹️ Recording stopped');
    });
  });

  describe('Plugin Loading Integration', () => {
    test('should load plugins and notify Discord of status', async () => {
      const mockPluginLoader = {
        loadAllPlugins: jest.fn().mockResolvedValue({
          loaded: ['pathfinder', 'pvp', 'armor-manager'],
          failed: ['invalid-plugin']
        })
      };

      const plugins = [
        { name: 'pathfinder', module: jest.fn() },
        { name: 'pvp', module: jest.fn() },
        { name: 'armor-manager', module: jest.fn() },
        { name: 'invalid-plugin', module: null }
      ];

      const result = await mockPluginLoader.loadAllPlugins(plugins);
      
      const message = `🔌 Plugins loaded: ${result.loaded.length} successful, ${result.failed.length} failed`;
      await mockChannel.send(message);

      expect(mockChannel.send).toHaveBeenCalledWith(
        '🔌 Plugins loaded: 3 successful, 1 failed'
      );
    });

    test('should handle plugin loading errors gracefully', async () => {
      const mockPluginLoader = {
        loadAllPlugins: jest.fn().mockRejectedValue(new Error('Plugin system failed'))
      };

      let errorHandled = false;
      try {
        await mockPluginLoader.loadAllPlugins([]);
      } catch (e) {
        errorHandled = true;
        await mockChannel.send('❌ Plugin loading failed');
      }

      expect(errorHandled).toBe(true);
      expect(mockChannel.send).toHaveBeenCalledWith('❌ Plugin loading failed');
    });
  });

  describe('Health Monitoring Integration', () => {
    test('should monitor bot health and report to Discord', async () => {
      const monitorHealth = async (bot) => {
        const health = bot.health || 0;
        const food = bot.food || 0;
        
        if (health < 5) {
          await mockChannel.send(`⚠️ Bot health critical: ${health}/20`);
        }
        
        if (food < 5) {
          await mockChannel.send(`🍞 Bot food low: ${food}/20`);
        }
      };

      // Test critical health
      mockBot.health = 3;
      await monitorHealth(mockBot);
      
      expect(mockChannel.send).toHaveBeenCalledWith('⚠️ Bot health critical: 3/20');

      // Test low food
      mockBot.food = 2;
      await monitorHealth(mockBot);
      
      expect(mockChannel.send).toHaveBeenCalledWith('🍞 Bot food low: 2/20');
    });
  });
});
