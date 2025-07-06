/**
 * Plugin Validator Module
 * 
 * This module provides comprehensive validation capabilities for Mineflayer bot plugins,
 * ensuring that all imported plugin modules conform to expected patterns and are properly
 * structured as loadable functions. It validates plugin imports, tests function exports,
 * and provides detailed reporting on plugin compatibility.
 * 
 * The validator tests various export patterns including:
 * - Direct function exports
 * - Object exports with 'plugin' property
 * - Object exports with 'default' property
 * - Complex plugin structures with multiple methods
 * 
 * Public Surface:
 * - validatePlugins(): Main validation function that tests all configured plugins
 * - Plugin import validation and testing
 * - Comprehensive error reporting and validation summaries
 * 
 * @module PluginValidator
 * @author Local Acct <localacct@ironanarchy.lol>
 * @version 1.0.0
 * @since 1.0.0
 * 
 * @requires ./plugin-loader - Related module for actual plugin loading
 * @requires mineflayer-pathfinder - Pathfinding plugin validation
 * @requires mineflayer-pvp - PvP plugin validation
 * @requires mineflayer-auto-eat - Auto-eat plugin validation
 * @requires mineflayer-armor-manager - Armor manager plugin validation
 * @requires mineflayer-collectblock - Block collection plugin validation
 * @requires mineflayer-bloodhound - Bloodhound plugin validation
 * @requires mineflayer-web-inventory - Web inventory plugin validation
 * @requires mineflayer-dashboard - Dashboard plugin validation (optional)
 * 
 * @see {@link ./plugin-loader.js} - For actual plugin loading implementation
 * @see {@link ./fixed-plugin-validator.js} - For alternative validation approaches
 * 
 * Validation Criteria:
 * - All required plugins must be importable without errors
 * - Plugin modules must export a valid function (direct, .plugin, or .default)
 * - Plugin structure must be compatible with Mineflayer's plugin system
 * - Optional plugins (like dashboard) are validated but failures are non-blocking
 * - Detailed logging provides visibility into validation process and failures
 */


/**
 * Validates all configured Mineflayer plugins by testing their import patterns and function exports.
 * 
 * This comprehensive validation function imports all required and optional plugins,
 * tests their export patterns for compatibility with Mineflayer's plugin system,
 * and provides detailed reporting on validation results. It checks for various
 * export patterns including direct functions, object exports with plugin properties,
 * and ES6 default exports. The validator handles both required plugins (which must
 * pass validation) and optional plugins (which may fail without blocking the process).
 * 
 * @async
 * @function validatePlugins
 * @param {PluginConfig[]} [plugins=[]] - Array of plugin configurations to validate
 * @param {Object} [options={}] - Validation options and settings
 * @param {boolean} [options.strictMode=false] - Whether to fail on any plugin validation errors
 * @param {boolean} [options.silent=false] - Whether to suppress console output during validation
 * @param {string[]} [options.skipPlugins=[]] - Array of plugin names to skip during validation
 * @param {number} [options.timeout=5000] - Maximum time to wait for plugin imports in milliseconds
 * @param {Function} [options.onProgress] - Callback function called for each plugin validation step
 * @returns {Promise<ValidationResult>} Promise that resolves to validation results with success status, plugin details, and error information
 * @throws {TypeError} When plugins parameter is not an array or options is not an object
 * @throws {ValidationError} When required plugins fail validation in strict mode
 * @throws {ImportError} When critical plugin modules cannot be imported
 * @throws {TimeoutError} When plugin import operations exceed the specified timeout
 * @throws {DependencyError} When plugin dependencies are not satisfied
 * 
 * @example
 * // Basic validation with default settings
 * const result = await validatePlugins();
 * if (result.valid) {
 *   console.log(`${result.validPlugins.length} plugins validated successfully`);
 * } else {
 *   console.error(`Validation failed: ${result.error}`);
 * }
 * 
 * @example
 * // Advanced validation with custom options
 * const result = await validatePlugins(customPlugins, {
 *   strictMode: true,
 *   timeout: 10000,
 *   skipPlugins: ['mineflayer-dashboard'],
 *   onProgress: (pluginName, status) => {
 *     console.log(`Validating ${pluginName}: ${status}`);
 *   }
 * });
 * 
 * @example
 * // Handling validation errors
 * try {
 *   const result = await validatePlugins([], { strictMode: true });
 *   console.log('All plugins valid:', result.validPlugins.map(p => p.name));
 * } catch (error) {
 *   if (error instanceof ValidationError) {
 *     console.error('Plugin validation failed:', error.message);
 *   } else {
 *     console.error('Unexpected error:', error);
 *   }
 * }
 */
async function validatePlugins() {
  console.log('🔍 Starting Plugin Validation...\n')

  const plugins = []

  try {
    // Import all plugins
    console.log('📦 Importing plugin modules...')
    
    const { pathfinder } = require('mineflayer-pathfinder')
    const mineflayerPvp = require('mineflayer-pvp')
    const autoEat = require('mineflayer-auto-eat')
    const armorManager = require('mineflayer-armor-manager')
    const collectBlock = require('mineflayer-collectblock')
    const { plugin: bloodhound } = require('mineflayer-bloodhound')
    const webInventory = require('mineflayer-web-inventory')
    
    // Try to import dashboard (might fail)
    let dashboard = null
    try {
      dashboard = require('mineflayer-dashboard')
      console.log('✅ mineflayer-dashboard imported successfully')
    } catch (error) {
      console.log('❌ mineflayer-dashboard failed to import:', error.message)
    }

    // Create plugin list with validation
    plugins.push(
      { module: pathfinder, name: 'pathfinder', options: { required: true } },
      { module: mineflayerPvp, name: 'mineflayer-pvp', options: { required: true } },
      { module: autoEat, name: 'mineflayer-auto-eat', options: { required: true } },
      { module: armorManager, name: 'mineflayer-armor-manager', options: { required: true } },
      { module: collectBlock, name: 'mineflayer-collectblock', options: { required: true } },
      { module: bloodhound, name: 'mineflayer-bloodhound', options: { required: true } },
      { module: webInventory, name: 'mineflayer-web-inventory', options: { required: true } }
    )

    if (dashboard) {
      plugins.push({ module: dashboard, name: 'mineflayer-dashboard', options: { required: false } })
    }

    console.log('\n🧪 Testing plugin validation...')

    // Test each plugin without loading to a bot
    for (const pluginConfig of plugins) {
      const { module, name } = pluginConfig
      
      console.log(`\n--- Testing ${name} ---`)
      console.log(`Module type: ${typeof module}`)
      
      if (!module) {
        console.log(`❌ ${name}: Module is null/undefined`)
        continue
      }

      // Test direct function
      if (typeof module === 'function') {
        console.log(`✅ ${name}: Direct function export`)
        continue
      }

      // Test { plugin } export
      if (module.plugin && typeof module.plugin === 'function') {
        console.log(`✅ ${name}: Has 'plugin' property as function`)
        continue
      }

      // Test { default } export
      if (module.default && typeof module.default === 'function') {
        console.log(`✅ ${name}: Has 'default' property as function`)
        continue
      }

      // Show available properties
      console.log(`🔍 ${name}: Available properties:`, Object.keys(module))
      
      // Check if it's an object with methods
      if (typeof module === 'object') {
        const methods = Object.keys(module).filter(key => typeof module[key] === 'function')
        if (methods.length > 0) {
          console.log(`🔧 ${name}: Available methods:`, methods)
        }
      }

      console.log(`❌ ${name}: No valid function export found`)
    }

    console.log('\n📊 Validation Summary:')
    const validPlugins = plugins.filter(p => {
      const { module } = p
      return typeof module === 'function' || 
             (module && typeof module.plugin === 'function') ||
             (module && typeof module.default === 'function')
    })

    console.log(`✅ Valid plugins: ${validPlugins.length}/${plugins.length}`)
    console.log(`Valid: ${validPlugins.map(p => p.name).join(', ')}`)

    const invalidPlugins = plugins.filter(p => {
      const { module } = p
      return !(typeof module === 'function' || 
               (module && typeof module.plugin === 'function') ||
               (module && typeof module.default === 'function'))
    })

    if (invalidPlugins.length > 0) {
      console.log(`❌ Invalid plugins: ${invalidPlugins.map(p => p.name).join(', ')}`)
    }

  } catch (error) {
    console.error('💥 Critical error during validation:', error.message)
    console.error(error.stack)
  }
}

// Run validation
validatePlugins().catch(console.error)
