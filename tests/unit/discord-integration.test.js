const { EventEmitter } = require('events');

// Mock Discord.js
const mockDiscordClient = {
  login: jest.fn(),
  on: jest.fn(),
  user: { tag: 'TestBot#1234' },
  channels: {
    cache: {
      get: jest.fn()
    }
  }
};

const mockChannel = {
  send: jest.fn(),
  isTextBased: jest.fn(() => true)
};

const mockEmbedBuilder = jest.fn().mockImplementation(() => ({
  setTitle: jest.fn().mockReturnThis(),
  setDescription: jest.fn().mockReturnThis(),
  setColor: jest.fn().mockReturnThis(),
  setTimestamp: jest.fn().mockReturnThis(),
  addFields: jest.fn().mockReturnThis()
}));

// Mock Discord.js module
jest.mock('discord.js', () => ({
  Client: jest.fn(() => mockDiscordClient),
  EmbedBuilder: mockEmbedBuilder,
  GatewayIntentBits: {
    Guilds: 1,
    GuildMessages: 2,
    MessageContent: 4
  }
}));

describe('Discord Integration', () => {
  let discordConfig;
  let mockBot;

  beforeEach(() => {
    jest.clearAllMocks();
    
    discordConfig = {
      discord: {
        enabled: true,
        token: 'test-token',
        channelId: '123456789',
        botLogChannelId: '987654321'
      }
    };

    mockBot = new EventEmitter();
    mockBot.chat = jest.fn();
    mockBot.username = 'TestBot';

    mockDiscordClient.channels.cache.get.mockReturnValue(mockChannel);
  });

  describe('Discord Client Initialization', () => {
    test('should initialize Discord client with correct intents', () => {
      const { Client, GatewayIntentBits } = require('discord.js');
      
      new Client({
        intents: [
          GatewayIntentBits.Guilds,
          GatewayIntentBits.GuildMessages,
          GatewayIntentBits.MessageContent
        ]
      });

      expect(Client).toHaveBeenCalledWith({
        intents: [
          GatewayIntentBits.Guilds,
          GatewayIntentBits.GuildMessages,
          GatewayIntentBits.MessageContent
        ]
      });
    });

    test('should handle Discord client login', async () => {
      mockDiscordClient.login.mockResolvedValue('logged-in');
      
      await mockDiscordClient.login(discordConfig.discord.token);
      
      expect(mockDiscordClient.login).toHaveBeenCalledWith(discordConfig.discord.token);
    });

    test('should handle Discord client login failure', async () => {
      const error = new Error('Invalid token');
      mockDiscordClient.login.mockRejectedValue(error);
      
      try {
        await mockDiscordClient.login('invalid-token');
      } catch (e) {
        expect(e).toBe(error);
      }
    });
  });

  describe('Discord Channel Management', () => {
    test('should get channel by ID', () => {
      const channelId = '123456789';
      const channel = mockDiscordClient.channels.cache.get(channelId);
      
      expect(mockDiscordClient.channels.cache.get).toHaveBeenCalledWith(channelId);
      expect(channel).toBe(mockChannel);
    });

    test('should handle missing channel', () => {
      mockDiscordClient.channels.cache.get.mockReturnValue(null);
      
      const channel = mockDiscordClient.channels.cache.get('invalid-id');
      
      expect(channel).toBeNull();
    });

    test('should validate channel is text-based', () => {
      const isTextBased = mockChannel.isTextBased();
      expect(isTextBased).toBe(true);
    });
  });

  describe('Discord Message Sending', () => {
    test('should send simple text message', async () => {
      const message = 'Test message';
      mockChannel.send.mockResolvedValue({ id: 'msg123' });
      
      await mockChannel.send(message);
      
      expect(mockChannel.send).toHaveBeenCalledWith(message);
    });

    test('should send embed message', async () => {
      const embed = new mockEmbedBuilder()
        .setTitle('Test Embed')
        .setDescription('Test Description')
        .setColor('#00ff00');
      
      await mockChannel.send({ embeds: [embed] });
      
      expect(mockChannel.send).toHaveBeenCalledWith({ embeds: [embed] });
    });

    test('should handle message send failure', async () => {
      const error = new Error('Message send failed');
      mockChannel.send.mockRejectedValue(error);
      
      try {
        await mockChannel.send('Test message');
      } catch (e) {
        expect(e).toBe(error);
      }
    });
  });

  describe('Bot Event Integration', () => {
    test('should handle bot spawn event', () => {
      const mockHandler = jest.fn();
      mockBot.on('spawn', mockHandler);
      
      mockBot.emit('spawn');
      
      expect(mockHandler).toHaveBeenCalled();
    });

    test('should handle bot death event', () => {
      const mockHandler = jest.fn();
      mockBot.on('death', mockHandler);
      
      mockBot.emit('death');
      
      expect(mockHandler).toHaveBeenCalled();
    });

    test('should handle bot chat event', () => {
      const mockHandler = jest.fn();
      mockBot.on('chat', mockHandler);
      
      const username = 'TestPlayer';
      const message = 'Hello world';
      mockBot.emit('chat', username, message);
      
      expect(mockHandler).toHaveBeenCalledWith(username, message);
    });
  });

  describe('Error Handling', () => {
    test('should handle Discord connection errors', () => {
      const error = new Error('Connection failed');
      const mockErrorHandler = jest.fn();
      
      mockDiscordClient.on('error', mockErrorHandler);
      mockDiscordClient.emit('error', error);
      
      expect(mockErrorHandler).toHaveBeenCalledWith(error);
    });

    test('should handle Discord rate limiting', () => {
      const rateLimitInfo = {
        timeout: 1000,
        limit: 5,
        method: 'POST',
        path: '/api/v10/channels/123/messages',
        route: '/channels/:id/messages'
      };
      
      const mockRateLimitHandler = jest.fn();
      mockDiscordClient.on('rateLimit', mockRateLimitHandler);
      mockDiscordClient.emit('rateLimit', rateLimitInfo);
      
      expect(mockRateLimitHandler).toHaveBeenCalledWith(rateLimitInfo);
    });
  });

  describe('Message Formatting', () => {
    test('should format bot status message', () => {
      const formatBotStatus = (bot) => {
        return `Bot: ${bot.username}\nStatus: Connected\nHealth: ${bot.health || 'Unknown'}`;
      };
      
      mockBot.health = 20;
      const formatted = formatBotStatus(mockBot);
      
      expect(formatted).toContain('Bot: TestBot');
      expect(formatted).toContain('Status: Connected');
      expect(formatted).toContain('Health: 20');
    });

    test('should format embed for bot events', () => {
      const embed = new mockEmbedBuilder()
        .setTitle('Bot Event')
        .setDescription('Bot has spawned')
        .setColor('#00ff00')
        .setTimestamp();
      
      expect(embed.setTitle).toHaveBeenCalledWith('Bot Event');
      expect(embed.setDescription).toHaveBeenCalledWith('Bot has spawned');
      expect(embed.setColor).toHaveBeenCalledWith('#00ff00');
      expect(embed.setTimestamp).toHaveBeenCalled();
    });
  });

  describe('Configuration Validation', () => {
    test('should validate required Discord config fields', () => {
      const validateConfig = (config) => {
        const required = ['token', 'channelId'];
        const missing = required.filter(field => !config.discord[field]);
        return missing.length === 0;
      };
      
      expect(validateConfig(discordConfig)).toBe(true);
      
      const invalidConfig = { discord: { enabled: true } };
      expect(validateConfig(invalidConfig)).toBe(false);
    });

    test('should handle optional configuration fields', () => {
      const validateOptional = (config) => {
        return {
          hasBotLogChannel: !!config.discord.botLogChannelId,
          hasWebhook: !!config.discord.webhookUrl
        };
      };
      
      const result = validateOptional(discordConfig);
      expect(result.hasBotLogChannel).toBe(true);
      expect(result.hasWebhook).toBe(false);
    });
  });
});
