require('./test-runner');

// Mock the plugin loader - create a simplified version for testing
class PluginLoader {
  constructor(bot, logFunction = null) {
    this.bot = bot;
    this.log = logFunction || this.defaultLog;
    this.loadedPlugins = new Map();
    this.failedPlugins = new Map();
  }

  defaultLog(type, message, data = null) {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] [${type}] ${message}${data ? ' | ' + JSON.stringify(data) : ''}`;
    // console.log(logEntry);
  }

  async loadPlugin(pluginModule, pluginName, options = {}) {
    try {
      this.log('INFO', `Attempting to load plugin: ${pluginName}`);
      
      if (!pluginModule) {
        throw new Error(`Plugin module is null or undefined`);
      }

      let pluginFunction = this.extractPluginFunction(pluginModule, pluginName);
      
      if (typeof pluginFunction !== 'function') {
        throw new Error(`Plugin is not a function. Got type: ${typeof pluginFunction}`);
      }

      this.bot.loadPlugin(pluginFunction);
      
      this.loadedPlugins.set(pluginName, {
        module: pluginModule,
        function: pluginFunction,
        loadedAt: new Date(),
        options: options
      });

      this.log('SUCCESS', `Plugin ${pluginName} loaded successfully`);
      return true;
    } catch (error) {
      this.log('ERROR', `Failed to load plugin ${pluginName}`, { error: error.message });
      this.failedPlugins.set(pluginName, {
        module: pluginModule,
        error: error.message,
        failedAt: new Date()
      });
      return false;
    }
  }

  extractPluginFunction(pluginModule, pluginName) {
    if (typeof pluginModule === 'function') {
      return pluginModule;
    }
    
    if (pluginModule && pluginModule.default) {
      return pluginModule.default;
    }
    
    if (pluginModule && pluginModule[pluginName]) {
      return pluginModule[pluginName];
    }
    
    return pluginModule;
  }

  async loadAllPlugins(plugins) {
    const results = { loaded: [], failed: [] };
    
    for (const plugin of plugins) {
      const success = await this.loadPlugin(plugin.module, plugin.name, plugin.options);
      if (success) {
        results.loaded.push(plugin.name);
      } else {
        results.failed.push(plugin.name);
      }
    }
    
    return results;
  }

  getLoadedPlugins() {
    return this.loadedPlugins;
  }

  getFailedPlugins() {
    return this.failedPlugins;
  }

  generateReport() {
    const loaded = this.loadedPlugins.size;
    const failed = this.failedPlugins.size;
    
    let report = `Plugin Loading Report\n`;
    report += `Successfully loaded: ${loaded}\n`;
    report += `Failed to load: ${failed}\n\n`;
    
    if (loaded > 0) {
      report += `Loaded Plugins:\n`;
      for (const [name, info] of this.loadedPlugins) {
        report += `- ${name} (loaded at ${info.loadedAt.toISOString()})\n`;
      }
      report += `\n`;
    }
    
    if (failed > 0) {
      report += `Failed Plugins:\n`;
      for (const [name, info] of this.failedPlugins) {
        report += `- ${name}: ${info.error}\n`;
      }
    }
    
    return report;
  }
}

describe('PluginLoader', () => {
  // Mock bot
  let mockBot;
  let pluginLoader;

  beforeEach(() => {
    mockBot = {
      loadPlugin: jest.fn(),
      on: jest.fn(),
      chat: jest.fn(),
      plugins: {}
    };
    pluginLoader = new PluginLoader(mockBot);
  });

  test('should initialize with bot and default log function', () => {
    expect(pluginLoader.bot).toBe(mockBot);
    expect(pluginLoader.loadedPlugins).toBeInstanceOf(Map);
    expect(pluginLoader.failedPlugins).toBeInstanceOf(Map);
  });

  test('should successfully load a valid plugin function', async () => {
    const mockPlugin = jest.fn();
    const pluginName = 'testPlugin';

    const result = await pluginLoader.loadPlugin(mockPlugin, pluginName);

    expect(result).toBe(true);
    expect(pluginLoader.loadedPlugins.has(pluginName)).toBe(true);
    expect(pluginLoader.failedPlugins.has(pluginName)).toBe(false);
  });

  test('should handle null/undefined plugin', async () => {
    const pluginName = 'nullPlugin';

    const result = await pluginLoader.loadPlugin(null, pluginName);

    expect(result).toBe(false);
    expect(pluginLoader.failedPlugins.has(pluginName)).toBe(true);
    expect(pluginLoader.loadedPlugins.has(pluginName)).toBe(false);
  });

  test('should handle non-function plugin', async () => {
    const pluginName = 'invalidPlugin';
    const invalidPlugin = { notAFunction: true };

    const result = await pluginLoader.loadPlugin(invalidPlugin, pluginName);

    expect(result).toBe(false);
    expect(pluginLoader.failedPlugins.has(pluginName)).toBe(true);
  });

  test('should load multiple plugins successfully', async () => {
    const plugins = [
      { module: jest.fn(), name: 'plugin1' },
      { module: jest.fn(), name: 'plugin2' }
    ];

    const results = await pluginLoader.loadAllPlugins(plugins);

    expect(results.loaded.length).toBe(2);
    expect(results.failed.length).toBe(0);
    expect(pluginLoader.loadedPlugins.size).toBe(2);
  });

  test('should generate comprehensive plugin loading report', async () => {
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

// Run the tests
if (require.main === module) {
  global.testRunner.run().then(success => {
    process.exit(success ? 0 : 1);
  });
}
