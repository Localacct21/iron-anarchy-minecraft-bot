require('./test-runner');
const { EventEmitter } = require('events');

describe('Discord Integration', () => {
  let discordClient;
  let mockBot;
  let discordConfig;
  let mockChannel;

  beforeEach(() => {
    // Simple mock channel
    mockChannel = {
      send: (msg) => Promise.resolve({ id: 'msg123' }),
      isTextBased: () => true
    };
    
    // Simple mock Discord client
    discordClient = {
      user: { tag: 'TestBot#1234' },
      channels: {
        cache: {
          get: (id) => mockChannel
        }
      },
      login: (token) => {
        if (!token || token === 'invalid-token') {
          return Promise.reject(new Error('Invalid token'));
        }
        return Promise.resolve('logged-in');
      }
    };
    
    mockBot = new EventEmitter();
    mockBot.chat = () => {};
    mockBot.username = 'TestBot';
    mockBot.health = 20;
    mockBot.entity = {
      position: { x: 100, y: 64, z: 200 }
    };

    discordConfig = {
      discord: {
        enabled: true,
        token: 'test-token',
        channelId: '123456789',
        botLogChannelId: '987654321'
      }
    };
  });

  test('should initialize Discord client successfully', async () => {
    const result = await discordClient.login(discordConfig.discord.token);
    expect(result).toBe('logged-in');
  });

  test('should handle Discord client login failure', async () => {
    let errorCaught = false;
    try {
      await discordClient.login('invalid-token');
    } catch (error) {
      errorCaught = true;
      expect(error.message).toBe('Invalid token');
    }
    expect(errorCaught).toBe(true);
  });

  test('should get channel by ID', () => {
    const channelId = '123456789';
    const channel = discordClient.channels.cache.get(channelId);
    
    expect(channel).toBe(mockChannel);
  });

  test('should send simple text message', async () => {
    const message = 'Test message';
    const result = await mockChannel.send(message);
    
    expect(result.id).toBe('msg123');
  });

  test('should handle bot spawn event', async () => {
    let messagesSent = [];
    
    // Override send method to capture messages
    mockChannel.send = (msg) => {
      messagesSent.push(msg);
      return Promise.resolve({ id: 'msg123' });
    };

    const handleBotSpawn = async () => {
      const message = `🎮 Bot ${mockBot.username} has spawned at position (${mockBot.entity.position.x}, ${mockBot.entity.position.y}, ${mockBot.entity.position.z})`;
      await mockChannel.send(message);
    };

    mockBot.on('spawn', handleBotSpawn);
    mockBot.emit('spawn');

    // Wait for async operations
    await new Promise(resolve => setTimeout(resolve, 10));

    expect(messagesSent.length).toBe(1);
    expect(messagesSent[0]).toContain('Bot TestBot has spawned');
    expect(messagesSent[0]).toContain('(100, 64, 200)');
  });

  test('should handle chat messages and relay to Discord', async () => {
    let relayedMessages = [];
    
    const handleChat = async (username, message) => {
      if (username !== mockBot.username) {
        const discordMessage = `💬 **${username}**: ${message}`;
        relayedMessages.push(discordMessage);
        await mockChannel.send(discordMessage);
      }
    };

    mockBot.on('chat', handleChat);
    mockBot.emit('chat', 'PlayerName', 'Hello world!');

    // Wait for async operations
    await new Promise(resolve => setTimeout(resolve, 10));

    expect(relayedMessages.length).toBe(1);
    expect(relayedMessages[0]).toBe('💬 **PlayerName**: Hello world!');
  });

  test('should not relay own messages to Discord', async () => {
    let relayedMessages = [];
    
    const handleChat = async (username, message) => {
      if (username !== mockBot.username) {
        relayedMessages.push(`💬 **${username}**: ${message}`);
        await mockChannel.send(`💬 **${username}**: ${message}`);
      }
    };

    mockBot.on('chat', handleChat);
    mockBot.emit('chat', mockBot.username, 'This is my message');

    // Wait for async operations
    await new Promise(resolve => setTimeout(resolve, 10));

    expect(relayedMessages.length).toBe(0);
  });

  test('should validate Discord configuration', () => {
    const validateConfig = (config) => {
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

    expect(validateConfig(discordConfig).valid).toBe(true);
    
    const invalidConfig = { discord: { enabled: true, token: 'test' } };
    const result = validateConfig(invalidConfig);
    expect(result.valid).toBe(false);
    expect(result.reason).toContain('channelId');
  });

  test('should monitor bot health and report to Discord', async () => {
    // Create a fresh test bot for this test
    const testBot = { health: 3, food: 20 };
    let healthWarnings = [];
    
    const monitorHealth = async (bot) => {
      const health = bot.health || 0;
      
      if (health < 5) {
        const warning = `⚠️ Bot health critical: ${health}/20`;
        healthWarnings.push(warning);
        await mockChannel.send(warning);
      }
    };

    await monitorHealth(testBot);
    
    expect(healthWarnings.length).toBe(1);
    expect(healthWarnings[0]).toBe('⚠️ Bot health critical: 3/20');
  });

  test('should monitor bot food and report to Discord', async () => {
    // Create a fresh test bot for this test
    const testBot = { health: 20, food: 2 };
    let foodWarnings = [];
    
    const monitorFood = async (bot) => {
      const food = bot.food || 0;
      
      if (food < 5) {
        const warning = `🍞 Bot food low: ${food}/20`;
        foodWarnings.push(warning);
        await mockChannel.send(warning);
      }
    };

    await monitorFood(testBot);
    
    expect(foodWarnings.length).toBe(1);
    expect(foodWarnings[0]).toBe('🍞 Bot food low: 2/20');
  });
});

// Run the tests
if (require.main === module) {
  global.testRunner.run().then(success => {
    process.exit(success ? 0 : 1);
  });
}
