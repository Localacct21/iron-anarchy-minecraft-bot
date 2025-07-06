const fs = require('fs-extra')
const moment = require('moment')

/**
 * Enhanced Plugin Loader for Mineflayer Bots
 * Safely loads and validates all plugins with proper error handling
 */
class PluginLoader {
  constructor(bot, logFunction = null) {
    this.bot = bot
    this.log = logFunction || this.defaultLog
    this.loadedPlugins = new Map()
    this.failedPlugins = new Map()
  }

  defaultLog(type, message, data = null) {
    const timestamp = moment().format('YYYY-MM-DD HH:mm:ss')
    const logEntry = `[${timestamp}] [${type}] ${message}${data ? ' | ' + JSON.stringify(data) : ''}`
    console.log(logEntry)
  }

  /**
   * Safely load a plugin with comprehensive validation
   */
  async loadPlugin(pluginModule, pluginName, options = {}) {
    try {
      this.log('INFO', `Attempting to load plugin: ${pluginName}`)
      
      // Validate plugin is defined
      if (!pluginModule) {
        throw new Error(`Plugin module is null or undefined`)
      }

      // Extract actual plugin function from various export patterns
      let pluginFunction = this.extractPluginFunction(pluginModule, pluginName)
      
      // Validate it's a function
      if (typeof pluginFunction !== 'function') {
        throw new Error(`Plugin is not a function. Got type: ${typeof pluginFunction}`)
      }

      // Load the plugin
      this.bot.loadPlugin(pluginFunction)
      
      // Mark as successfully loaded
      this.loadedPlugins.set(pluginName, {
        module: pluginModule,
        function: pluginFunction,
        loadedAt: new Date(),
        options: options
      })

      this.log('SUCCESS', `Successfully loaded plugin: ${pluginName}`)
      return true

    } catch (error) {
      this.failedPlugins.set(pluginName, {
        error: error.message,
        failedAt: new Date(),
        module: pluginModule
      })
      
      this.log('ERROR', `Failed to load plugin ${pluginName}: ${error.message}`)
      
      if (options.required) {
        throw error
      }
      
      return false
    }
  }

  /**
   * Extract plugin function from various export patterns
   */
  extractPluginFunction(pluginModule, pluginName) {
    // Direct function export
    if (typeof pluginModule === 'function') {
      return pluginModule
    }

    // { plugin } export pattern
    if (pluginModule.plugin && typeof pluginModule.plugin === 'function') {
      return pluginModule.plugin
    }

    // { default } export pattern (ES6 modules)
    if (pluginModule.default && typeof pluginModule.default === 'function') {
      return pluginModule.default
    }

    // Named export matching plugin name
    if (pluginModule[pluginName] && typeof pluginModule[pluginName] === 'function') {
      return pluginModule[pluginName]
    }

    // Check for common export names
    const commonNames = ['init', 'initialize', 'setup', 'main']
    for (const name of commonNames) {
      if (pluginModule[name] && typeof pluginModule[name] === 'function') {
        return pluginModule[name]
      }
    }

    return null
  }

  /**
   * Load multiple plugins in sequence
   */
  async loadPlugins(pluginList) {
    const results = []
    
    for (const pluginConfig of pluginList) {
      const { module, name, options = {} } = pluginConfig
      const result = await this.loadPlugin(module, name, options)
      results.push({ name, success: result })
      
      // Small delay between plugin loads to prevent issues
      await new Promise(resolve => setTimeout(resolve, 100))
    }
    
    return results
  }

  /**
   * Get status report of all plugins
   */
  getPluginStatus() {
    return {
      loaded: Array.from(this.loadedPlugins.keys()),
      failed: Array.from(this.failedPlugins.keys()),
      total: this.loadedPlugins.size + this.failedPlugins.size,
      successRate: this.loadedPlugins.size / (this.loadedPlugins.size + this.failedPlugins.size) * 100
    }
  }

  /**
   * Test bot functionality after plugin loading
   */
  async testBotFunctionality() {
    const tests = []
    
    // Test basic bot functions
    tests.push(this.testFunction('Basic bot ready', () => this.bot.username !== null))
    
    // Test loaded plugins
    if (this.loadedPlugins.has('pathfinder')) {
      tests.push(this.testFunction('Pathfinder', () => this.bot.pathfinder !== undefined))
    }
    
    if (this.loadedPlugins.has('mineflayer-pvp')) {
      tests.push(this.testFunction('PvP plugin', () => this.bot.pvp !== undefined))
    }
    
    if (this.loadedPlugins.has('mineflayer-auto-eat')) {
      tests.push(this.testFunction('Auto-eat plugin', () => this.bot.autoEat !== undefined))
    }

    return tests
  }

  testFunction(name, testFn) {
    try {
      const result = testFn()
      this.log('TEST', `${name}: ${result ? 'PASS' : 'FAIL'}`)
      return { name, passed: result }
    } catch (error) {
      this.log('TEST', `${name}: ERROR - ${error.message}`)
      return { name, passed: false, error: error.message }
    }
  }
}

module.exports = PluginLoader
