
// Mock mineflayer bot
const mockBot = {
  loadPlugin: jest.fn(),
  on: jest.fn(),
  chat: jest.fn(),
  plugins: {}
};

// Import the plugin loader
const PluginLoader = require('../../plugin-loader');

describe('PluginLoader', () => {
  let pluginLoader;

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    
    // Create new plugin loader instance
    pluginLoader = new PluginLoader(mockBot);
  });

  describe('Constructor', () => {
    test('should initialize with bot and default log function', () => {
      expect(pluginLoader.bot).toBe(mockBot);
      expect(pluginLoader.loadedPlugins).toBeInstanceOf(Map);
      expect(pluginLoader.failedPlugins).toBeInstanceOf(Map);
      expect(typeof pluginLoader.log).toBe('function');
    });

    test('should accept custom log function', () => {
      const customLog = jest.fn();
      const loader = new PluginLoader(mockBot, customLog);
      expect(loader.log).toBe(customLog);
    });
  });

  describe('loadPlugin', () => {
    test('should successfully load a valid plugin function', async () => {
      const mockPlugin = jest.fn();
      const pluginName = 'testPlugin';

      await pluginLoader.loadPlugin(mockPlugin, pluginName);

      expect(mockBot.loadPlugin).toHaveBeenCalledWith(mockPlugin);
      expect(pluginLoader.loadedPlugins.has(pluginName)).toBe(true);
      expect(pluginLoader.failedPlugins.has(pluginName)).toBe(false);
    });

    test('should handle null/undefined plugin', async () => {
      const pluginName = 'nullPlugin';

      await pluginLoader.loadPlugin(null, pluginName);

      expect(mockBot.loadPlugin).not.toHaveBeenCalled();
      expect(pluginLoader.failedPlugins.has(pluginName)).toBe(true);
      expect(pluginLoader.loadedPlugins.has(pluginName)).toBe(false);
    });

    test('should handle non-function plugin', async () => {
      const pluginName = 'invalidPlugin';
      const invalidPlugin = { notAFunction: true };

      await pluginLoader.loadPlugin(invalidPlugin, pluginName);

      expect(mockBot.loadPlugin).not.toHaveBeenCalled();
      expect(pluginLoader.failedPlugins.has(pluginName)).toBe(true);
    });

    test('should handle plugin loading errors', async () => {
      const mockPlugin = jest.fn();
      const pluginName = 'errorPlugin';
      
      mockBot.loadPlugin.mockImplementation(() => {
        throw new Error('Plugin loading failed');
      });

      await pluginLoader.loadPlugin(mockPlugin, pluginName);

      expect(pluginLoader.failedPlugins.has(pluginName)).toBe(true);
      expect(pluginLoader.loadedPlugins.has(pluginName)).toBe(false);
    });
  });

  describe('extractPluginFunction', () => {
    test('should extract function from default export', () => {
      const mockPlugin = jest.fn();
      const result = pluginLoader.extractPluginFunction(mockPlugin, 'test');
      expect(result).toBe(mockPlugin);
    });

    test('should extract function from module.exports', () => {
      const mockPlugin = { default: jest.fn() };
      const result = pluginLoader.extractPluginFunction(mockPlugin, 'test');
      expect(result).toBe(mockPlugin.default);
    });

    test('should extract function from named export', () => {
      const mockFunction = jest.fn();
      const mockPlugin = { namedPlugin: mockFunction };
      const result = pluginLoader.extractPluginFunction(mockPlugin, 'namedPlugin');
      expect(result).toBe(mockFunction);
    });
  });

  describe('loadAllPlugins', () => {
    test('should load multiple plugins successfully', async () => {
      const plugins = [
        { module: jest.fn(), name: 'plugin1' },
        { module: jest.fn(), name: 'plugin2' }
      ];

      await pluginLoader.loadAllPlugins(plugins);

      expect(mockBot.loadPlugin).toHaveBeenCalledTimes(2);
      expect(pluginLoader.loadedPlugins.size).toBe(2);
      expect(pluginLoader.failedPlugins.size).toBe(0);
    });

    test('should handle mixed success/failure scenarios', async () => {
      const plugins = [
        { module: jest.fn(), name: 'plugin1' },
        { module: null, name: 'plugin2' },
        { module: jest.fn(), name: 'plugin3' }
      ];

      await pluginLoader.loadAllPlugins(plugins);

      expect(pluginLoader.loadedPlugins.size).toBe(2);
      expect(pluginLoader.failedPlugins.size).toBe(1);
    });
  });

  describe('getLoadedPlugins', () => {
    test('should return loaded plugins map', () => {
      const result = pluginLoader.getLoadedPlugins();
      expect(result).toBe(pluginLoader.loadedPlugins);
    });
  });

  describe('getFailedPlugins', () => {
    test('should return failed plugins map', () => {
      const result = pluginLoader.getFailedPlugins();
      expect(result).toBe(pluginLoader.failedPlugins);
    });
  });

  describe('generateReport', () => {
    test('should generate comprehensive plugin loading report', async () => {
      // Load some plugins
      await pluginLoader.loadPlugin(jest.fn(), 'plugin1');
      await pluginLoader.loadPlugin(null, 'plugin2');

      const report = pluginLoader.generateReport();

      expect(report).toContain('Plugin Loading Report');
      expect(report).toContain('Successfully loaded: 1');
      expect(report).toContain('Failed to load: 1');
      expect(report).toContain('plugin1');
      expect(report).toContain('plugin2');
    });
  });
});
