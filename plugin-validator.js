const PluginLoader = require('./plugin-loader')

/**
 * Plugin Validation Script
 * Tests all plugin imports and validates they are functions
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
