const mineflayer = require('mineflayer')
const { pathfinder, Movements, goals } = require('mineflayer-pathfinder')
const mineflayerPvp = require('mineflayer-pvp')
const autoEat = require('mineflayer-auto-eat')
const armorManager = require('mineflayer-armor-manager')
const collectBlock = require('mineflayer-collectblock')
const { plugin: bloodhound } = require('mineflayer-bloodhound')
const webInventory = require('mineflayer-web-inventory')
const fs = require('fs-extra')
const moment = require('moment')

// Helper function to safely load plugins with better error handling
function loadPluginSafely(bot, plugin, pluginName) {
  if (typeof plugin !== 'function') {
    throw new Error(`Plugin ${pluginName} is not a function. Expected a function but got ${typeof plugin}. This may indicate a version mismatch or incorrect import.`)
  }
  bot.loadPlugin(plugin)
}

// Extract PVP plugin - handle both direct function export and { plugin } export
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

// Bot configuration
const config = {
  host: 'localhost',
  port: 25565,
  username: 'PvPBot',
  version: '1.19.2',
  auth: 'offline'
}

// Create bot
const bot = mineflayer.createBot(config)

// Load plugins with error handling
bot.loadPlugin(pathfinder)
loadPluginSafely(bot, pvpPlugin, 'mineflayer-pvp')
loadPluginSafely(bot, autoEat, 'mineflayer-auto-eat')
loadPluginSafely(bot, armorManager, 'mineflayer-armor-manager')
loadPluginSafely(bot, collectBlock, 'mineflayer-collectblock')
loadPluginSafely(bot, bloodhound, 'mineflayer-bloodhound')
loadPluginSafely(bot, webInventory, 'mineflayer-web-inventory')

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
  
  // Set up pathfinder
  const defaultMove = new Movements(bot)
  bot.pathfinder.setMovements(defaultMove)
  
  // Auto-eat setup
  bot.autoEat.options = {
    priority: 'foodPoints',
    startAt: 14,
    bannedFood: []
  }
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

console.log('Bot starting...')
