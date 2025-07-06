const mineflayer = require('mineflayer')
const PluginLoader = require('./plugin-loader')

/**
 * Plugin Test Bot
 * Loads plugins one by one and validates each works correctly
 */
async function testPluginLoading() {
  console.log('🤖 Starting Plugin Test Bot...\n')

  // Create a test bot (won't actually connect)
  const bot = mineflayer.createBot({
    host: 'localhost', // dummy host
    port: 25565,
    username: 'PluginTestBot',
    version: '1.19.2',
    auth: 'offline'
  })

  // Create plugin loader
  const pluginLoader = new PluginLoader(bot, (type, message, data) => {
    const colors = {
      INFO: '\x1b[36m',    // Cyan
      SUCCESS: '\x1b[92m', // Bright Green
      ERROR: '\x1b[91m',   // Bright Red
      TEST: '\x1b[33m'     // Yellow
    }
    const timestamp = new Date().toISOString().slice(11, 19)
    console.log(`${colors[type] || '\x1b[0m'}[${timestamp}] [${type}] ${message}\x1b[0m`)
  })

  // Import plugins with correct patterns
  console.log('📦 Loading plugin modules...')
  
  const { pathfinder } = require('mineflayer-pathfinder')
  const mineflayerPvp = require('mineflayer-pvp')
  const autoEatModule = require('mineflayer-auto-eat')
  const autoEat = autoEatModule.loader || autoEatModule
  const armorManager = require('mineflayer-armor-manager')
  const collectBlock = require('mineflayer-collectblock')
  const bloodhound = require('mineflayer-bloodhound')
  const webInventory = require('mineflayer-web-inventory')
  
  let dashboard = null
  try {
    dashboard = require('mineflayer-dashboard')
  } catch (error) {
    console.log('⚠️  Dashboard plugin not available:', error.message)
  }

  // Define plugin loading sequence
  const pluginSequence = [
    { module: pathfinder, name: 'pathfinder', options: { required: true } },
    { module: mineflayerPvp, name: 'mineflayer-pvp', options: { required: true } },
    { module: autoEat, name: 'mineflayer-auto-eat', options: { required: true } },
    { module: armorManager, name: 'mineflayer-armor-manager', options: { required: true } },
    { module: collectBlock, name: 'mineflayer-collectblock', options: { required: true } },
    { module: bloodhound, name: 'mineflayer-bloodhound', options: { required: false } },
    { module: webInventory, name: 'mineflayer-web-inventory', options: { required: false } }
  ]

  if (dashboard) {
    pluginSequence.push({ module: dashboard, name: 'mineflayer-dashboard', options: { required: false } })
  }

  console.log('\n🔄 Loading plugins sequentially...\n')

  // Load plugins one by one
  const results = await pluginLoader.loadPlugins(pluginSequence)

  // Get final status
  const status = pluginLoader.getPluginStatus()
  
  console.log('\n📊 Final Plugin Loading Results:')
  console.log(`✅ Successfully loaded: ${status.loaded.length}`)
  console.log(`❌ Failed to load: ${status.failed.length}`)
  console.log(`📈 Success rate: ${status.successRate.toFixed(1)}%`)
  
  if (status.loaded.length > 0) {
    console.log(`\n✅ Loaded plugins: ${status.loaded.join(', ')}`)
  }
  
  if (status.failed.length > 0) {
    console.log(`\n❌ Failed plugins: ${status.failed.join(', ')}`)
    const details = pluginLoader.getPluginDetails()
    for (const [name, info] of Object.entries(details.failed)) {
      console.log(`   ${name}: ${info.error}`)
    }
  }

  // Test bot functionality (without connecting)
  console.log('\n🧪 Testing bot functionality...')
  
  try {
    // Check if plugins attached correctly
    console.log('Testing pathfinder...', bot.pathfinder ? '✅' : '❌')
    console.log('Testing pvp...', bot.pvp ? '✅' : '❌')
    console.log('Testing autoEat...', bot.autoEat ? '✅' : '❌')
    console.log('Testing armorManager...', bot.armorManager ? '✅' : '❌')
    console.log('Testing collectBlock...', bot.collectBlock ? '✅' : '❌')
    console.log('Testing bloodhound...', bot.bloodhound ? '✅' : '❌')
    console.log('Testing webInventory...', bot.webInventory ? '✅' : '❌')
    
    if (dashboard) {
      console.log('Testing dashboard...', bot.dashboard ? '✅' : '❌')
    }
    
  } catch (error) {
    console.log('❌ Error during functionality test:', error.message)
  }

  // Don't actually connect, just test loading
  bot.end()

  return status
}

// Run the test
testPluginLoading().then(status => {
  console.log('\n🎯 Plugin loading test completed!')
  console.log(`Result: ${status.loaded.length}/${status.total} plugins loaded successfully`)
  
  if (status.successRate === 100) {
    console.log('🎉 All plugins loaded successfully! Ready for production use.')
  } else {
    console.log('⚠️  Some plugins failed to load. Check the errors above.')
  }
}).catch(error => {
  console.error('💥 Test failed:', error.message)
  console.error(error.stack)
})
