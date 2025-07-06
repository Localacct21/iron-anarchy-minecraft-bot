const mineflayer = require('mineflayer')
const { pathfinder, Movements } = require('mineflayer-pathfinder')
const mineflayerPvp = require('mineflayer-pvp')
const armorManager = require('mineflayer-armor-manager')

// Load configuration - use relative path from bot directory
const config = require('../../config/config.json')

async function createBasicBot() {
  console.log('🤖 Basic Iron-Anarchy Bot Starting...')
  
  // Dynamic import for ESM modules
  let autoEat = null
  
  try {
    const autoEatModule = await import('mineflayer-auto-eat')
    autoEat = autoEatModule.plugin || autoEatModule.default
    console.log('✅ mineflayer-auto-eat loaded successfully')
  } catch (error) {
    console.log('⚠️ mineflayer-auto-eat not available:', error.message)
  }

  console.log('🤖 Creating basic bot...')

  // Create bot
  const bot = mineflayer.createBot({
    host: config.server.host,
    port: config.server.port,
    username: config.bot.username,
    version: config.server.version,
    auth: config.bot.auth
  })

  console.log('🔌 Loading basic plugins...')

  // Load basic plugins
  bot.loadPlugin(pathfinder)
  bot.loadPlugin(mineflayerPvp.plugin)
  bot.loadPlugin(armorManager)
  
  if (autoEat) {
    bot.loadPlugin(autoEat)
    console.log('✅ Auto-eat loaded')
  }

  console.log('✅ Basic plugins loaded successfully!')

  bot.once('spawn', () => {
    console.log('✅ Basic bot spawned successfully!')
    console.log(`🎮 Connected to ${config.server.host}:${config.server.port}`)
    
    // Configure movement
    const defaultMove = new Movements(bot)
    bot.pathfinder.setMovements(defaultMove)
    
    bot.chat('🤖 Basic Iron-Anarchy Bot Online!')
    console.log('🎉 Basic bot is ready!')
  })

  bot.on('chat', (username, message) => {
    if (username === bot.username) return
    console.log(`💬 <${username}> ${message}`)
  })

  bot.on('error', (err) => {
    console.log('❌ Bot error:', err.message)
  })

  bot.on('end', (reason) => {
    console.log('🔌 Bot disconnected:', reason)
  })

  return bot
}

// Start the bot
if (require.main === module) {
  createBasicBot().catch(console.error)
}

module.exports = createBasicBot
