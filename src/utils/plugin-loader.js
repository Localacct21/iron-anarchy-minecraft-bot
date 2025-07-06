const fs = require('fs-extra')
const moment = require('moment')
const { PluginLoadError, PluginValidationError, PluginDependencyError } = require('./plugin-types')

/**
 * @fileoverview Enhanced Plugin Loader for Mineflayer Bots
 * @author Local Acct <localacct@ironanarchy.lol>
 * @version 2.0.0
 */

/**
 * Configuration object for an individual plugin
 * @typedef {Object} PluginConfig
 * @property {string} name - The unique name identifier for the plugin
 * @property {Object|Function} module - The plugin module or function to load
 * @property {PluginOptions} [options={}] - Optional configuration options for the plugin
 * @property {boolean} [enabled=true] - Whether the plugin is enabled
 * @property {string} [version] - Plugin version string
 * @property {string[]} [dependencies=[]] - Array of plugin names this plugin depends on
 * @property {number} [priority=0] - Loading priority (higher numbers load first)
 * @property {string} [description] - Human-readable description of the plugin
 * @property {string} [author] - Plugin author information
 * @property {Object} [config] - Plugin-specific configuration object
 * 
 * @example
 * // Basic plugin configuration
 * {
 *   name: "pathfinder",
 *   module: require('mineflayer-pathfinder'),
 *   options: { required: true }
 * }
 * 
 * @example
 * // Advanced plugin configuration
 * {
 *   name: "auto-eat",
 *   module: require('mineflayer-auto-eat'),
 *   enabled: true,
 *   version: "2.1.0",
 *   dependencies: ["pathfinder"],
 *   priority: 10,
 *   description: "Automatically eats food when hungry",
 *   author: "Plugin Developer",
 *   config: {
 *     startAt: 14,
 *     bannedFood: ["rotten_flesh", "spider_eye"]
 *   },
 *   options: {
 *     required: false,
 *     timeout: 5000
 *   }
 * }
 */

/**
 * Plugin loading options
 * @typedef {Object} PluginOptions
 * @property {boolean} [required=false] - Whether the plugin is required for bot operation
 * @property {number} [timeout=10000] - Maximum time to wait for plugin loading (ms)
 * @property {boolean} [silent=false] - Whether to suppress loading messages
 * @property {Function} [onLoad] - Callback function called when plugin loads successfully
 * @property {Function} [onError] - Callback function called when plugin fails to load
 * @property {Object} [context] - Additional context to pass to the plugin
 * 
 * @example
 * {
 *   required: true,
 *   timeout: 5000,
 *   silent: false,
 *   onLoad: (pluginName) => console.log(`${pluginName} loaded successfully`),
 *   onError: (pluginName, error) => console.error(`${pluginName} failed: ${error.message}`),
 *   context: { bot: botInstance, config: pluginConfig }
 * }
 */

/**
 * Result object returned from plugin validation operations
 * @typedef {Object} ValidationResult
 * @property {boolean} valid - Whether the validation passed
 * @property {string} [error] - Error message if validation failed
 * @property {string[]} [warnings=[]] - Array of warning messages
 * @property {Object} [data] - Additional validation data
 * @property {string} pluginName - Name of the plugin that was validated
 * @property {Date} timestamp - When the validation occurred
 * @property {string} [suggestion] - Suggested fix for validation errors
 * 
 * @example
 * // Successful validation
 * {
 *   valid: true,
 *   pluginName: "pathfinder",
 *   timestamp: new Date(),
 *   data: { functionCount: 15, exportType: "default" }
 * }
 * 
 * @example
 * // Failed validation with suggestion
 * {
 *   valid: false,
 *   error: "Plugin is not a function",
 *   warnings: ["Plugin exports an object but no function found"],
 *   pluginName: "broken-plugin",
 *   timestamp: new Date(),
 *   suggestion: "Ensure the plugin exports a function or has a 'plugin' property"
 * }
 */

/**
 * Enhanced Plugin Loader for Mineflayer Bots
 * Safely loads and validates all plugins with proper error handling
 * 
 * @class PluginLoader
 * @author Local Acct <localacct@ironanarchy.lol>
 * @version 2.0.0
 * @since 1.0.0
 */
class PluginLoader {
  /**
   * Create a new PluginLoader instance
   * @param {Object} bot - The Mineflayer bot instance
   * @param {Function} [logFunction=null] - Optional custom logging function
   */
  constructor(bot, logFunction = null) {
    this.bot = bot
    this.log = logFunction || this.defaultLog
    this.loadedPlugins = new Map()
    this.failedPlugins = new Map()
  }

  /**
   * Default logging function with timestamp
   * @param {string} type - Log type (INFO, ERROR, SUCCESS, etc.)
   * @param {string} message - Log message
   * @param {Object} [data=null] - Optional data object to include
   */
  defaultLog(type, message, data = null) {
    const timestamp = moment().format('YYYY-MM-DD HH:mm:ss')
    const logEntry = `[${timestamp}] [${type}] ${message}${data ? ' | ' + JSON.stringify(data) : ''}`
    console.log(logEntry)
  }

  /**
   * Validate a plugin configuration object
   * @param {PluginConfig} pluginConfig - Plugin configuration to validate
   * @returns {ValidationResult} Validation result object
   */
  validatePluginConfig(pluginConfig) {
    const result = {
      valid: true,
      warnings: [],
      pluginName: pluginConfig.name || 'unknown',
      timestamp: new Date()
    }

    // Check required fields
    if (!pluginConfig.name) {
      result.valid = false
      result.error = 'Plugin name is required'
      result.suggestion = 'Add a "name" property to the plugin configuration'
      return result
    }

    if (!pluginConfig.module) {
      result.valid = false
      result.error = 'Plugin module is required'
      result.suggestion = 'Add a "module" property with the plugin function or module'
      return result
    }

    // Check optional fields and provide warnings
    if (!pluginConfig.version) {
      result.warnings.push('Plugin version not specified')
    }

    if (!pluginConfig.description) {
      result.warnings.push('Plugin description not provided')
    }

    if (pluginConfig.dependencies && !Array.isArray(pluginConfig.dependencies)) {
      result.warnings.push('Dependencies should be an array')
    }

    result.data = {
      hasConfig: !!pluginConfig.config,
      hasOptions: !!pluginConfig.options,
      dependencyCount: pluginConfig.dependencies ? pluginConfig.dependencies.length : 0
    }

    return result
  }

  /**
   * Safely load a plugin with comprehensive validation
   * @param {Object|Function} pluginModule - The plugin module or function
   * @param {string} pluginName - Name of the plugin for identification
   * @param {PluginOptions} [options={}] - Plugin loading options
   * @returns {Promise<boolean>} True if plugin loaded successfully
   * @throws {PluginLoadError} If plugin is required and fails to load
   */
  async loadPlugin(pluginModule, pluginName, options = {}) {
    const startTime = Date.now()
    
    try {
      this.log('INFO', `Attempting to load plugin: ${pluginName}`)
      
      // Validate plugin is defined
      if (!pluginModule) {
        throw new PluginValidationError(
          `Plugin module is null or undefined`,
          pluginName,
          'module-check',
          'Ensure the plugin module is properly imported or defined'
        )
      }

      // Extract actual plugin function from various export patterns
      let pluginFunction = this.extractPluginFunction(pluginModule, pluginName)
      
      // Validate it's a function
      if (typeof pluginFunction !== 'function') {
        throw new PluginValidationError(
          `Plugin is not a function. Got type: ${typeof pluginFunction}`,
          pluginName,
          'function-check',
          'Ensure the plugin exports a function or has a "plugin" property'
        )
      }

      // Load the plugin
      this.bot.loadPlugin(pluginFunction)
      
      const loadTime = Date.now() - startTime
      
      // Mark as successfully loaded
      this.loadedPlugins.set(pluginName, {
        module: pluginModule,
        function: pluginFunction,
        loadedAt: new Date(),
        loadTime: loadTime,
        options: options
      })

      this.log('SUCCESS', `Successfully loaded plugin: ${pluginName}`, { loadTime })
      
      // Call onLoad callback if provided
      if (options.onLoad && typeof options.onLoad === 'function') {
        options.onLoad(pluginName)
      }
      
      return true

    } catch (error) {
      const loadTime = Date.now() - startTime
      
      const pluginError = error instanceof PluginValidationError 
        ? error 
        : new PluginLoadError(
            `Failed to load plugin ${pluginName}: ${error.message}`,
            pluginName,
            'loading',
            error
          )
      
      this.failedPlugins.set(pluginName, {
        error: pluginError,
        failedAt: new Date(),
        loadTime: loadTime,
        module: pluginModule
      })
      
      this.log('ERROR', `Failed to load plugin ${pluginName}: ${pluginError.message}`)
      
      // Call onError callback if provided
      if (options.onError && typeof options.onError === 'function') {
        options.onError(pluginName, pluginError)
      }
      
      if (options.required) {
        throw pluginError
      }
      
      return false
    }
  }

  /**
   * Extract plugin function from various export patterns
   * @param {Object|Function} pluginModule - The plugin module
   * @param {string} pluginName - Name of the plugin
   * @returns {Function|null} The extracted plugin function or null if not found
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
   * Load multiple plugins in sequence with dependency resolution
   * @param {PluginConfig[]} pluginList - Array of plugin configurations
   * @returns {Promise<PluginLoadResult[]>} Array of results with name and success status
   */
  async loadPlugins(pluginList) {
    const results = []
    
    // Sort plugins by priority (higher priority loads first)
    const sortedPlugins = [...pluginList].sort((a, b) => (b.priority || 0) - (a.priority || 0))
    
    for (const pluginConfig of sortedPlugins) {
      const startTime = Date.now()
      
      // Validate plugin configuration
      const validation = this.validatePluginConfig(pluginConfig)
      if (!validation.valid) {
        results.push({
          name: pluginConfig.name || 'unknown',
          success: false,
          error: validation.error,
          loadTime: Date.now() - startTime,
          timestamp: new Date()
        })
        continue
      }

      // Check if plugin is enabled
      if (pluginConfig.enabled === false) {
        results.push({
          name: pluginConfig.name,
          success: false,
          error: 'Plugin is disabled',
          loadTime: Date.now() - startTime,
          timestamp: new Date()
        })
        continue
      }

      // Check dependencies
      if (pluginConfig.dependencies && pluginConfig.dependencies.length > 0) {
        const missingDeps = this.checkDependencies(pluginConfig.dependencies)
        if (missingDeps.length > 0) {
          const depError = new PluginDependencyError(
            `Missing required dependencies: ${missingDeps.join(', ')}`,
            pluginConfig.name,
            missingDeps
          )
          
          results.push({
            name: pluginConfig.name,
            success: false,
            error: depError.message,
            loadTime: Date.now() - startTime,
            timestamp: new Date()
          })
          continue
        }
      }

      // Load the plugin
      const { module, name, options = {} } = pluginConfig
      const result = await this.loadPlugin(module, name, options)
      
      results.push({
        name,
        success: result,
        loadTime: Date.now() - startTime,
        timestamp: new Date()
      })
      
      // Small delay between plugin loads to prevent issues
      await new Promise(resolve => setTimeout(resolve, 100))
    }
    
    return results
  }

  /**
   * Check if dependencies are satisfied
   * @param {string[]} dependencies - Array of dependency names
   * @returns {string[]} Array of missing dependency names
   */
  checkDependencies(dependencies) {
    const missing = []
    for (const dep of dependencies) {
      if (!this.loadedPlugins.has(dep)) {
        missing.push(dep)
      }
    }
    return missing
  }

  /**
   * Get status report of all plugins
   * @returns {PluginStatus} Status report with loaded/failed counts and success rate
   */
  getPluginStatus() {
    const loaded = Array.from(this.loadedPlugins.keys())
    const failed = Array.from(this.failedPlugins.keys())
    const total = loaded.length + failed.length
    
    const details = {}
    
    // Add loaded plugin details
    for (const [name, info] of this.loadedPlugins) {
      details[name] = {
        status: 'loaded',
        loadTime: info.loadTime,
        loadedAt: info.loadedAt
      }
    }
    
    // Add failed plugin details
    for (const [name, info] of this.failedPlugins) {
      details[name] = {
        status: 'failed',
        error: info.error.message,
        failedAt: info.failedAt,
        loadTime: info.loadTime
      }
    }
    
    return {
      loaded,
      failed,
      total,
      successRate: total > 0 ? Math.round((loaded.length / total) * 100) : 0,
      lastUpdate: new Date(),
      details
    }
  }

  /**
   * Test bot functionality after plugin loading
   * @returns {Promise<Array<Object>>} Array of test results
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

  /**
   * Test a specific function and log results
   * @param {string} name - Test name
   * @param {Function} testFn - Test function to execute
   * @returns {Object} Test result object
   */
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

  /**
   * Generate a comprehensive plugin loading report
   * @returns {string} Formatted report string
   */
  generateReport() {
    const status = this.getPluginStatus()
    
    let report = '\n=== Plugin Loading Report ===\n'
    report += `Total plugins processed: ${status.total}\n`
    report += `Successfully loaded: ${status.loaded.length}\n`
    report += `Failed to load: ${status.failed.length}\n`
    report += `Success rate: ${status.successRate}%\n`
    report += `Last updated: ${status.lastUpdate.toISOString()}\n\n`
    
    if (status.loaded.length > 0) {
      report += '✅ Successfully loaded plugins:\n'
      status.loaded.forEach(name => {
        const detail = status.details[name]
        report += `  - ${name} (${detail.loadTime}ms)\n`
      })
      report += '\n'
    }
    
    if (status.failed.length > 0) {
      report += '❌ Failed plugins:\n'
      status.failed.forEach(name => {
        const detail = status.details[name]
        report += `  - ${name}: ${detail.error}\n`
      })
      report += '\n'
    }
    
    return report
  }
}

module.exports = PluginLoader
