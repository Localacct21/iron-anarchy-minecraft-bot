const mineflayer = require('mineflayer')
const { pathfinder, Movements, goals } = require('mineflayer-pathfinder')
const mineflayerPvp = require('mineflayer-pvp')
const armorManager = require('mineflayer-armor-manager')
const bloodhound = require('mineflayer-bloodhound')
const webInventory = require('mineflayer-web-inventory')
const fs = require('fs-extra')
const moment = require('moment')

// Load configuration
const config = require('../../config/config.json')

async function createBot() {
  console.log('🔥 Iron-Anarchy Bot Starting...')
  
  // Dynamic import for ESM modules
  let autoEat = null
  let collectBlock = null
  
  try {
    const autoEatModule = await import('mineflayer-auto-eat')
    autoEat = autoEatModule.plugin || autoEatModule.default
    console.log('✅ mineflayer-auto-eat loaded successfully')
  } catch (error) {
    console.log('⚠️ mineflayer-auto-eat not available:', error.message)
  }
  
  try {
    const collectBlockModule = await import('mineflayer-collectblock')
    collectBlock = collectBlockModule.plugin || collectBlockModule.default
    console.log('✅ mineflayer-collectblock loaded successfully')
  } catch (error) {
    console.log('⚠️ mineflayer-collectblock not available:', error.message)
  }

  console.log('🤖 Creating bot...')

  // Create bot
  const bot = mineflayer.createBot({
    host: config.server.host,
    port: config.server.port,
    username: config.bot.username,
    version: config.server.version,
    auth: config.bot.auth
  })

  console.log('🔌 Loading plugins...')

  // Load core plugins
  try {
    bot.loadPlugin(pathfinder)
    console.log('✅ Pathfinder loaded')
  } catch (err) {
    console.log('❌ Pathfinder failed:', err.message)
  }

  try {
    bot.loadPlugin(mineflayerPvp.plugin)
    console.log('✅ PvP loaded')
  } catch (err) {
    console.log('❌ PvP failed:', err.message)
  }

  try {
    bot.loadPlugin(armorManager)
    console.log('✅ Armor Manager loaded')
  } catch (err) {
    console.log('❌ Armor Manager failed:', err.message)
  }

  try {
    // Fix bloodhound loading
    const bloodhoundPlugin = bloodhound.plugin || bloodhound
    bot.loadPlugin(bloodhoundPlugin)
    console.log('✅ Bloodhound loaded')
  } catch (err) {
    console.log('❌ Bloodhound failed:', err.message)
  }

  // Load ESM plugins if available
  if (autoEat) {
    try {
      bot.loadPlugin(autoEat)
      console.log('✅ Auto-eat loaded')
    } catch (err) {
      console.log('❌ Auto-eat failed:', err.message)
    }
  }

  if (collectBlock) {
    try {
      bot.loadPlugin(collectBlock)
      console.log('✅ Collect Block loaded')
    } catch (err) {
      console.log('❌ Collect Block failed:', err.message)
    }
  }

  // Create directories
  fs.ensureDirSync('./logs')
  fs.ensureDirSync('./recordings')
  fs.ensureDirSync('./screenshots')

  // Bot events
  bot.once('spawn', () => {
    console.log('✅ Bot spawned successfully!')
    console.log(`🎮 Connected to ${config.server.host}:${config.server.port}`)
    
    // Configure pathfinder
    const defaultMove = new Movements(bot)
    defaultMove.allowFreeMotion = true
    defaultMove.allowParkour = true
    defaultMove.canDig = true
    bot.pathfinder.setMovements(defaultMove)
    
    // Configure auto-eat if available
    if (bot.autoEat && config.features && config.features.autoEat) {
      bot.autoEat.options = {
        priority: config.features.autoEat.priority || 'foodPoints',
        startAt: config.features.autoEat.startAt || 14,
        bannedFood: []
      }
      console.log('✅ Auto-eat configured')
    }
    
    // Start web inventory if enabled
    if (config.features && config.features.webInventory && config.features.webInventory.enabled) {
      try {
        // Load web inventory plugin after spawn to avoid conflicts
        bot.loadPlugin(webInventory)
        bot.webInventory.start(config.features.webInventory.port)
        console.log(`✅ Web inventory started on port ${config.features.webInventory.port}`)
      } catch (err) {
        console.log('❌ Web inventory failed to start:', err.message)
      }
    }
    
    bot.chat('🔥 Iron-Anarchy Bot Online!')
    console.log('🎉 Bot is ready!')
  })

  bot.on('chat', (username, message) => {
    if (username === bot.username) return
    console.log(`💬 <${username}> ${message}`)
    
    // Simple command handling
    if (message.startsWith('!')) {
      const command = message.slice(1).toLowerCase()
      switch (command) {
        case 'status':
          bot.chat(`🤖 Status: Health ${bot.health}/20, Food ${bot.food}/20`)
          break
        case 'pos':
          if (bot.entity) {
            const pos = bot.entity.position
            bot.chat(`📍 Position: ${Math.floor(pos.x)}, ${Math.floor(pos.y)}, ${Math.floor(pos.z)}`)
          }
          break
        case 'help':
          bot.chat('🔥 Commands: !status, !pos, !help')
          break
      }
    }
  })

  bot.on('error', (err) => {
    console.log('❌ Bot error:', err.message)
    if (err.message.includes('EADDRINUSE')) {
      console.log('💡 Tip: Another service is using the port. Check your configuration.')
    }
  })

  bot.on('end', (reason) => {
    console.log('🔌 Bot disconnected:', reason)
  })

  // Graceful shutdown
  process.on('SIGINT', () => {
    console.log('🛑 Shutting down bot...')
    bot.quit()
    process.exit(0)
  })

  return bot
}

// Start the bot
if (require.main === module) {
  createBot().catch(console.error)
}

module.exports = createBot
