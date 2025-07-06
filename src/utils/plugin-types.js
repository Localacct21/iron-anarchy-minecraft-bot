/**
 * @fileoverview Type definitions for the Minecraft Bot Plugin System
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
 * Plugin loading result for batch operations
 * @typedef {Object} PluginLoadResult
 * @property {string} name - Name of the plugin
 * @property {boolean} success - Whether the plugin loaded successfully
 * @property {string} [error] - Error message if loading failed
 * @property {number} loadTime - Time taken to load the plugin (ms)
 * @property {Date} timestamp - When the loading attempt occurred
 * 
 * @example
 * {
 *   name: "auto-eat",
 *   success: true,
 *   loadTime: 150,
 *   timestamp: new Date()
 * }
 */

/**
 * Plugin status information
 * @typedef {Object} PluginStatus
 * @property {string[]} loaded - Array of successfully loaded plugin names
 * @property {string[]} failed - Array of failed plugin names
 * @property {number} total - Total number of plugins attempted
 * @property {number} successRate - Success rate as percentage (0-100)
 * @property {Date} lastUpdate - When the status was last updated
 * @property {Object} details - Detailed information about each plugin
 * 
 * @example
 * {
 *   loaded: ["pathfinder", "auto-eat", "pvp"],
 *   failed: ["broken-plugin"],
 *   total: 4,
 *   successRate: 75,
 *   lastUpdate: new Date(),
 *   details: {
 *     "pathfinder": { loadTime: 120, version: "1.9.0" },
 *     "auto-eat": { loadTime: 89, version: "2.1.0" }
 *   }
 * }
 */

/**
 * Custom error class for plugin loading failures
 * @class PluginLoadError
 * @extends Error
 * @property {string} pluginName - Name of the plugin that failed to load
 * @property {string} phase - Loading phase where error occurred
 * @property {Error} [originalError] - Original error that caused the failure
 * @property {Date} timestamp - When the error occurred
 * 
 * @example
 * const error = new PluginLoadError(
 *   "Failed to load pathfinder plugin",
 *   "pathfinder",
 *   "validation",
 *   originalError
 * );
 */
class PluginLoadError extends Error {
  /**
   * Create a new PluginLoadError
   * @param {string} message - Error message
   * @param {string} pluginName - Name of the plugin
   * @param {string} [phase="unknown"] - Loading phase where error occurred
   * @param {Error} [originalError] - Original error that caused the failure
   */
  constructor(message, pluginName, phase = "unknown", originalError = null) {
    super(message);
    this.name = "PluginLoadError";
    this.pluginName = pluginName;
    this.phase = phase;
    this.originalError = originalError;
    this.timestamp = new Date();
  }
}

/**
 * Custom error class for plugin validation failures
 * @class PluginValidationError
 * @extends Error
 * @property {string} pluginName - Name of the plugin that failed validation
 * @property {string} validationType - Type of validation that failed
 * @property {string} [suggestion] - Suggested fix for the validation error
 * @property {Date} timestamp - When the error occurred
 * 
 * @example
 * const error = new PluginValidationError(
 *   "Plugin does not export a function",
 *   "pathfinder",
 *   "function-check",
 *   "Ensure the plugin exports a function or has a 'plugin' property"
 * );
 */
class PluginValidationError extends Error {
  /**
   * Create a new PluginValidationError
   * @param {string} message - Error message
   * @param {string} pluginName - Name of the plugin
   * @param {string} [validationType="unknown"] - Type of validation that failed
   * @param {string} [suggestion] - Suggested fix for the validation error
   */
  constructor(message, pluginName, validationType = "unknown", suggestion = null) {
    super(message);
    this.name = "PluginValidationError";
    this.pluginName = pluginName;
    this.validationType = validationType;
    this.suggestion = suggestion;
    this.timestamp = new Date();
  }
}

/**
 * Custom error class for plugin dependency failures
 * @class PluginDependencyError
 * @extends Error
 * @property {string} pluginName - Name of the plugin with dependency issues
 * @property {string[]} missingDependencies - Array of missing dependency names
 * @property {Date} timestamp - When the error occurred
 * 
 * @example
 * const error = new PluginDependencyError(
 *   "Missing required dependencies",
 *   "advanced-plugin",
 *   ["pathfinder", "auto-eat"]
 * );
 */
class PluginDependencyError extends Error {
  /**
   * Create a new PluginDependencyError
   * @param {string} message - Error message
   * @param {string} pluginName - Name of the plugin
   * @param {string[]} missingDependencies - Array of missing dependency names
   */
  constructor(message, pluginName, missingDependencies = []) {
    super(message);
    this.name = "PluginDependencyError";
    this.pluginName = pluginName;
    this.missingDependencies = missingDependencies;
    this.timestamp = new Date();
  }
}

module.exports = {
  PluginLoadError,
  PluginValidationError,
  PluginDependencyError
};
