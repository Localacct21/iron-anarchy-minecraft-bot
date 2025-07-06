const mineflayer = require('mineflayer')
const { pathfinder, Movements, goals } = require('mineflayer-pathfinder')
const mineflayerPvp = require('mineflayer-pvp')
const autoEatModule = require('mineflayer-auto-eat')
const armorManager = require('mineflayer-armor-manager')
const collectBlockModule = require('mineflayer-collectblock')
const bloodhound = require('mineflayer-bloodhound')
const webInventory = require('mineflayer-web-inventory')
const fs = require('fs-extra')
const moment = require('moment')

// Enhanced plugin loading function with validation
function loadPluginSafely(bot, plugin, pluginName) {
  console.log(`Loading plugin: ${pluginName}`)
  
  if (!plugin) {
    throw new Error(`Plugin ${pluginName} is null or undefined`)
  }
  
  if (typeof plugin !== 'function') {
    throw new Error(`Plugin ${pluginName} is not a function. Expected a function but got ${typeof plugin}. This may indicate a version mismatch or incorrect import.`)
  }
  
  try {
    bot.loadPlugin(plugin)
    console.log(`✅ Successfully loaded: ${pluginName}`)
    return true
  } catch (error) {
    console.error(`❌ Failed to load ${pluginName}:`, error.message)
    throw error
  }
}

// Extract correct plugin functions from modules
console.log('📦 Preparing plugins...')

// PVP plugin - handle { plugin } export
let pvpPlugin
if (typeof mineflayerPvp === 'function') {
  pvpPlugin = mineflayerPvp
} else if (mineflayerPvp.plugin && typeof mineflayerPvp.plugin === 'function') {
  pvpPlugin = mineflayerPvp.plugin
} else if (mineflayerPvp.default && typeof mineflayerPvp.default === 'function') {
  pvpPlugin = mineflayerPvp.default
} else {
  throw new Error('mineflayer-pvp plugin could not be loaded. Expected a function export, { plugin } export, or { default } export.')
}

// Auto-eat plugin - handle { loader } export
const autoEat = autoEatModule.loader || autoEatModule
if (typeof autoEat !== 'function') {
  throw new Error('mineflayer-auto-eat plugin could not be loaded. Expected loader function.')
}

// Collect block plugin - handle { plugin } export
const collectBlock = collectBlockModule.plugin || collectBlockModule
if (typeof collectBlock !== 'function') {
  throw new Error('mineflayer-collectblock plugin could not be loaded. Expected plugin function.')
}

// Bot configuration
const config = {
  host: 'localhost',
  port: 25565,
  username: 'PvPBot',
  version: '1.19.2',
  auth: 'offline'
}

console.log('🤖 Creating bot...')

// Create bot
const bot = mineflayer.createBot(config)

console.log('🔌 Loading plugins sequentially...')

// Load plugins with enhanced error handling and validation
try {
  // Load pathfinder first (required for movement)
  loadPluginSafely(bot, pathfinder, 'pathfinder')
  
  // Load PvP plugin
  loadPluginSafely(bot, pvpPlugin, 'mineflayer-pvp')
  
  // Load auto-eat plugin
  loadPluginSafely(bot, autoEat, 'mineflayer-auto-eat')
  
  // Load armor manager
  loadPluginSafely(bot, armorManager, 'mineflayer-armor-manager')
  
  // Load collect block plugin
  loadPluginSafely(bot, collectBlock, 'mineflayer-collectblock')
  
  // Load bloodhound plugin
  loadPluginSafely(bot, bloodhound, 'mineflayer-bloodhound')
  
  // Load web inventory plugin
  loadPluginSafely(bot, webInventory, 'mineflayer-web-inventory')
  
  console.log('🎉 All plugins loaded successfully!')
  
} catch (error) {
  console.error('💥 Critical plugin loading error:', error.message)
  console.error('Bot cannot continue without required plugins.')
  process.exit(1)
}

// Create logs directory
fs.ensureDirSync('./logs')

// Chat logging function
function logMessage(type, message) {
  const timestamp = moment().format('YYYY-MM-DD HH:mm:ss')
  const logEntry = `[${timestamp}] [${type}] ${message}\n`
  
  console.log(logEntry.trim())
  fs.appendFileSync('./logs/chat.log', logEntry)
}

// Bot events
bot.on('spawn', () => {
  logMessage('INFO', 'Bot spawned successfully')
  
  // Test plugin functionality
  console.log('🧪 Testing plugin functionality...')
  console.log('Pathfinder:', bot.pathfinder ? '✅' : '❌')
  console.log('PvP:', bot.pvp ? '✅' : '❌')
  console.log('Auto-eat:', bot.autoEat ? '✅' : '❌')
  console.log('Armor Manager:', bot.armorManager ? '✅' : '❌')
  console.log('Collect Block:', bot.collectBlock ? '✅' : '❌')
  console.log('Bloodhound:', bot.bloodhound ? '✅' : '❌')
  console.log('Web Inventory:', bot.webInventory ? '✅' : '❌')
  
  // Set up pathfinder
  const defaultMove = new Movements(bot)
  bot.pathfinder.setMovements(defaultMove)
  
  // Auto-eat setup
  bot.autoEat.options = {
    priority: 'foodPoints',
    startAt: 14,
    bannedFood: []
  }
  
  logMessage('SUCCESS', 'All plugins initialized and ready!')
})

bot.on('playerJoined', (player) => {
  logMessage('JOIN', `${player.username} joined the game`)
})

bot.on('playerLeft', (player) => {
  logMessage('LEAVE', `${player.username} left the game`)
})

bot.on('chat', (username, message) => {
  if (username === bot.username) return
  
  logMessage('CHAT', `<${username}> ${message}`)
  
  // Basic chat commands
  if (message.startsWith('!come')) {
    const target = bot.players[username]
    if (target && target.entity) {
      const goal = new goals.GoalNear(target.entity.position.x, target.entity.position.y, target.entity.position.z, 2)
      bot.pathfinder.setGoal(goal)
      bot.chat(`Coming to you, ${username}!`)
    }
  }
  
  if (message.startsWith('!stop')) {
    bot.pathfinder.setGoal(null)
    bot.chat('Stopped!')
  }
  
  if (message.startsWith('!attack')) {
    const target = bot.nearestEntity(entity => entity.type === 'player' && entity.username !== bot.username)
    if (target) {
      bot.pvp.attack(target)
      bot.chat(`Attacking ${target.username}!`)
    }
  }
  
  if (message.startsWith('!guard')) {
    const target = bot.players[username]
    if (target && target.entity) {
      bot.pvp.guard(target.entity)
      bot.chat(`Now guarding ${username}!`)
    }
  }
  
  if (message.startsWith('!plugins')) {
    bot.chat('🔌 Loaded plugins: pathfinder, pvp, auto-eat, armor-manager, collectblock, bloodhound, web-inventory')
  }
})

bot.on('physicsTick', () => {
  // Check for threats and respond
  const enemy = bot.nearestEntity(entity => {
    return entity.type === 'player' && 
           entity.username !== bot.username &&
           entity.position.distanceTo(bot.entity.position) < 16
  })
  
  if (enemy && !bot.pvp.target) {
    bot.pvp.attack(enemy)
  }
})

bot.on('death', () => {
  logMessage('DEATH', 'Bot died')
  bot.chat('I died! Respawning...')
})

bot.on('respawn', () => {
  logMessage('RESPAWN', 'Bot respawned')
  bot.chat('I have respawned!')
})

bot.on('error', (err) => {
  logMessage('ERROR', `Bot error: ${err.message}`)
  console.error(err)
})

bot.on('end', () => {
  logMessage('INFO', 'Bot disconnected')
  console.log('Bot disconnected')
})

console.log('🚀 Bot starting...')
