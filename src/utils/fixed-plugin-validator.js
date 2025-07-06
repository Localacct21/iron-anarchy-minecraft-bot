const PluginLoader = require('./plugin-loader')

/**
 * Fixed Plugin Validation Script
 * Tests all plugin imports with correct import patterns
 */
async function validatePluginsFixed() {
  console.log('🔧 Starting Fixed Plugin Validation...\n')

  const plugins = []

  try {
    // Import all plugins with correct patterns
    console.log('📦 Importing plugin modules with fixes...')
    
    const { pathfinder } = require('mineflayer-pathfinder')
    const mineflayerPvp = require('mineflayer-pvp')
    
    // Fix for mineflayer-auto-eat
    const autoEatModule = require('mineflayer-auto-eat')
    const autoEat = autoEatModule.loader || autoEatModule
    
    const armorManager = require('mineflayer-armor-manager')
    const collectBlock = require('mineflayer-collectblock')
    
    // Fix for mineflayer-bloodhound - try different import patterns
    let bloodhound = null
    try {
      const bloodhoundModule = require('mineflayer-bloodhound')
      if (bloodhoundModule.plugin) {
        bloodhound = bloodhoundModule.plugin
        console.log('✅ mineflayer-bloodhound imported via .plugin')
      } else if (typeof bloodhoundModule === 'function') {
        bloodhound = bloodhoundModule
        console.log('✅ mineflayer-bloodhound imported directly')
      } else {
        console.log('🔍 bloodhound module properties:', Object.keys(bloodhoundModule))
        console.log('❌ mineflayer-bloodhound: No valid export found')
      }
    } catch (error) {
      console.log('❌ mineflayer-bloodhound failed to import:', error.message)
    }
    
    const webInventory = require('mineflayer-web-inventory')
    
    // Try to import dashboard
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
      { module: webInventory, name: 'mineflayer-web-inventory', options: { required: true } }
    )

    if (bloodhound) {
      plugins.push({ module: bloodhound, name: 'mineflayer-bloodhound', options: { required: false } })
    }

    if (dashboard) {
      plugins.push({ module: dashboard, name: 'mineflayer-dashboard', options: { required: false } })
    }

    console.log('\n🧪 Testing fixed plugin validation...')

    // Test each plugin
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
        console.log(`✅ ${name}: Direct function export - READY TO LOAD`)
        continue
      }

      // Test { plugin } export
      if (module.plugin && typeof module.plugin === 'function') {
        console.log(`✅ ${name}: Has 'plugin' property as function - READY TO LOAD`)
        continue
      }

      // Test { default } export
      if (module.default && typeof module.default === 'function') {
        console.log(`✅ ${name}: Has 'default' property as function - READY TO LOAD`)
        continue
      }

      console.log(`❌ ${name}: No valid function export found`)
    }

    console.log('\n📊 Fixed Validation Summary:')
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

    return { validPlugins, invalidPlugins, allPlugins: plugins }

  } catch (error) {
    console.error('💥 Critical error during validation:', error.message)
    console.error(error.stack)
    return { validPlugins: [], invalidPlugins: [], allPlugins: [] }
  }
}

// Run validation
validatePluginsFixed().then(result => {
  console.log('\n🎯 READY FOR BOT TESTING!')
}).catch(console.error)
