const mineflayer = require('mineflayer')
const { pathfinder, Movements, goals } = require('mineflayer-pathfinder')
const pvp = require('mineflayer-pvp').plugin
const autoEat = require('mineflayer-auto-eat')
const armorManager = require('mineflayer-armor-manager')
const collectBlock = require('mineflayer-collectblock')
const { plugin: bloodhound } = require('mineflayer-bloodhound')
const webInventory = require('mineflayer-web-inventory')
const fs = require('fs-extra')
const moment = require('moment')

// Load configuration
const config = require('./config.json')

// Create bot
const bot = mineflayer.createBot({
  host: config.server.host,
  port: config.server.port,
  username: config.bot.username,
  version: config.server.version,
  auth: config.bot.auth
})

// Load plugins
bot.loadPlugin(pathfinder)
bot.loadPlugin(pvp)
bot.loadPlugin(autoEat)
bot.loadPlugin(armorManager)
bot.loadPlugin(collectBlock)
bot.loadPlugin(bloodhound)
bot.loadPlugin(webInventory)

// Create logs directory
fs.ensureDirSync('./logs')

// Global variables
let isGuarding = false
let following = null
let guardInterval = null

// Enhanced logging function
function logMessage(type, message, data = null) {
  const timestamp = moment().format('YYYY-MM-DD HH:mm:ss')
  const logEntry = `[${timestamp}] [${type}] ${message}${data ? ' | ' + JSON.stringify(data) : ''}\n`
  
  // Console log with colors
  const colors = {
    INFO: '\x1b[36m',    // Cyan
    CHAT: '\x1b[32m',    // Green
    PVP: '\x1b[31m',     // Red
    COMMAND: '\x1b[33m', // Yellow
    ERROR: '\x1b[91m',   // Bright Red
    SUCCESS: '\x1b[92m'  // Bright Green
  }
  
  console.log(`${colors[type] || '\x1b[0m'}${logEntry.trim()}\x1b[0m`)
  
  // File log
  if (config.features.logging.enabled) {
    const logFile = `./logs/bot_${moment().format('YYYY-MM-DD')}.log`
    fs.appendFileSync(logFile, logEntry)
  }
}

// Enhanced bot events
bot.once('spawn', () => {
  logMessage('SUCCESS', 'Bot spawned successfully!')
  
  // Set up pathfinder
  const defaultMove = new Movements(bot)
  defaultMove.allowFreeMotion = true
  bot.pathfinder.setMovements(defaultMove)
  
  // Configure auto-eat
  if (config.features.autoEat.enabled) {
    bot.autoEat.options = {
      priority: config.features.autoEat.priority,
      startAt: config.features.autoEat.startAt,
      bannedFood: []
    }
    logMessage('INFO', 'Auto-eat configured')
  }
  
  // Start web inventory
  if (config.features.webInventory.enabled) {
    bot.webInventory.start(config.features.webInventory.port)
    logMessage('INFO', `Web inventory started on http://localhost:${config.features.webInventory.port}`)
  }
  
  logMessage('SUCCESS', 'All plugins loaded and configured!')
})

bot.on('chat', (username, message) => {
  if (username === bot.username) return
  
  if (config.features.logging.logChat) {
    logMessage('CHAT', `<${username}> ${message}`)
  }
  
  // Command handling
  if (message.startsWith('!')) {
    handleCommand(username, message.slice(1))
  }
})

bot.on('whisper', (username, message) => {
  logMessage('CHAT', `${username} whispers: ${message}`)
})

bot.on('kicked', (reason) => {
  logMessage('ERROR', `Bot was kicked: ${reason}`)
})

bot.on('error', (err) => {
  logMessage('ERROR', `Bot error: ${err.message}`)
})

bot.on('death', () => {
  logMessage('PVP', 'Bot died!')
  bot.chat('💀 I died! Respawning...')
  
  // Reset states
  isGuarding = false
  following = null
  if (guardInterval) {
    clearInterval(guardInterval)
    guardInterval = null
  }
})

bot.on('respawn', () => {
  logMessage('INFO', 'Bot respawned!')
})

// Enhanced PvP Events
bot.on('playerJoined', (player) => {
  logMessage('INFO', `Player joined: ${player.username}`)
  bot.chat(`👋 Welcome ${player.username}!`)
})

bot.on('playerLeft', (player) => {
  logMessage('INFO', `Player left: ${player.username}`)
})

bot.on('entityHurt', (entity) => {
  if (entity === bot.entity) {
    logMessage('PVP', 'Bot took damage!', { 
      health: bot.health,
      food: bot.food,
      position: bot.entity.position
    })
  }
})

// Enhanced command handling
function handleCommand(username, command) {
  const args = command.split(' ')
  const cmd = args[0].toLowerCase()
  
  if (config.features.logging.logCommands) {
    logMessage('COMMAND', `${username} executed: ${command}`)
  }
  
  switch (cmd) {
    case 'follow':
      followPlayer(username, args[1] || username)
      break
    case 'stop':
      stopAllActions()
      break
    case 'attack':
      if (args[1]) {
        attackPlayer(args[1])
      } else {
        bot.chat('⚔️ Usage: !attack <player>')
      }
      break
    case 'guard':
      toggleGuardMode()
      break
    case 'collect':
      if (args[1]) {
        collectBlocks(args[1], parseInt(args[2]) || 1)
      } else {
        bot.chat('⛏️ Usage: !collect <block_name> [amount]')
      }
      break
    case 'come':
      comeToPlayer(username)
      break
    case 'health':
      showHealth()
      break
    case 'inv':
      showInventory()
      break
    case 'status':
      showStatus()
      break
    case 'players':
      listPlayers()
      break
    case 'pos':
      showPosition()
      break
    case 'help':
      showHelp()
      break
    default:
      bot.chat(`❌ Unknown command: ${cmd}. Use !help for available commands.`)
  }
}

// Enhanced command functions
function followPlayer(commander, targetName) {
  const player = bot.players[targetName]
  if (!player || !player.entity) {
    bot.chat(`❌ Cannot find player: ${targetName}`)
    return
  }
  
  stopAllActions()
  following = targetName
  
  const goal = new goals.GoalFollow(player.entity, 2)
  bot.pathfinder.setGoal(goal)
  bot.chat(`🏃 Following ${targetName}`)
  logMessage('INFO', `Started following ${targetName}`)
}

function stopAllActions() {
  bot.pathfinder.setGoal(null)
  bot.pvp.stop()
  following = null
  isGuarding = false
  
  if (guardInterval) {
    clearInterval(guardInterval)
    guardInterval = null
  }
  
  bot.chat('🛑 Stopped all actions')
  logMessage('INFO', 'Stopped all actions')
}

function attackPlayer(targetName) {
  const target = bot.players[targetName]
  if (!target || !target.entity) {
    bot.chat(`❌ Cannot find player: ${targetName}`)
    return
  }
  
  if (target.entity.position.distanceTo(bot.entity.position) > 5) {
    // Move closer first
    const goal = new goals.GoalNear(target.entity.position.x, target.entity.position.y, target.entity.position.z, 2)
    bot.pathfinder.setGoal(goal)
    
    bot.once('goal_reached', () => {
      bot.pvp.attack(target.entity)
    })
  } else {
    bot.pvp.attack(target.entity)
  }
  
  bot.chat(`⚔️ Attacking ${targetName}!`)
  logMessage('PVP', `Started attacking ${targetName}`)
}

function toggleGuardMode() {
  if (isGuarding) {
    isGuarding = false
    if (guardInterval) {
      clearInterval(guardInterval)
      guardInterval = null
    }
    bot.chat('🛡️ Guard mode disabled')
    logMessage('INFO', 'Guard mode disabled')
  } else {
    isGuarding = true
    bot.chat('🛡️ Guard mode enabled - will attack hostile mobs nearby')
    logMessage('INFO', 'Guard mode enabled')
    
    guardInterval = setInterval(() => {
      if (!isGuarding) return
      
      const hostile = bot.nearestEntity(entity => {
        return entity.type === 'mob' && entity.mobType && 
               ['zombie', 'skeleton', 'spider', 'creeper', 'enderman', 'witch'].includes(entity.mobType) &&
               entity.position.distanceTo(bot.entity.position) < 10
      })
      
      if (hostile) {
        bot.pvp.attack(hostile)
        logMessage('PVP', `Attacking hostile mob: ${hostile.mobType}`)
      }
    }, 1000)
  }
}

function collectBlocks(blockName, amount) {
  const blocks = bot.findBlocks({
    matching: (block) => block.name === blockName,
    maxDistance: 64,
    count: amount
  })
  
  if (blocks.length === 0) {
    bot.chat(`❌ Cannot find ${blockName} nearby`)
    return
  }
  
  bot.chat(`⛏️ Collecting ${blocks.length}x ${blockName}`)
  logMessage('INFO', `Started collecting ${blocks.length}x ${blockName}`)
  
  // Collect blocks one by one
  let collected = 0
  function collectNext() {
    if (collected >= blocks.length) {
      bot.chat(`✅ Finished collecting ${collected}x ${blockName}`)
      return
    }
    
    const block = bot.blockAt(blocks[collected])
    if (block) {
      bot.collectBlock.collect(block, (err) => {
        if (!err) {
          collected++
          collectNext()
        } else {
          bot.chat(`❌ Error collecting ${blockName}: ${err.message}`)
        }
      })
    } else {
      collected++
      collectNext()
    }
  }
  
  collectNext()
}

function comeToPlayer(username) {
  const player = bot.players[username]
  if (!player || !player.entity) {
    bot.chat(`❌ Cannot find player: ${username}`)
    return
  }
  
  const goal = new goals.GoalNear(player.entity.position.x, player.entity.position.y, player.entity.position.z, 2)
  bot.pathfinder.setGoal(goal)
  bot.chat(`🏃 Coming to ${username}`)
  logMessage('INFO', `Moving to ${username}`)
}

function showHealth() {
  const healthBar = '█'.repeat(Math.floor(bot.health / 2)) + '░'.repeat(10 - Math.floor(bot.health / 2))
  const foodBar = '█'.repeat(Math.floor(bot.food / 2)) + '░'.repeat(10 - Math.floor(bot.food / 2))
  
  bot.chat(`❤️ Health: ${bot.health}/20 [${healthBar}]`)
  bot.chat(`🍖 Food: ${bot.food}/20 [${foodBar}]`)
}

function showInventory() {
  const items = bot.inventory.items()
  if (items.length === 0) {
    bot.chat('🎒 Inventory is empty')
    return
  }
  
  const itemList = items.slice(0, 10).map(item => `${item.count}x ${item.name}`).join(', ')
  bot.chat(`🎒 Inventory: ${itemList}${items.length > 10 ? '...' : ''}`)
}

function showStatus() {
  const pos = bot.entity.position
  bot.chat(`📊 Status: ${following ? `Following ${following}` : isGuarding ? 'Guarding' : 'Idle'}`)
  bot.chat(`📍 Position: ${Math.floor(pos.x)}, ${Math.floor(pos.y)}, ${Math.floor(pos.z)}`)
  bot.chat(`👥 Players online: ${Object.keys(bot.players).length}`)
}

function listPlayers() {
  const players = Object.keys(bot.players).filter(name => name !== bot.username)
  if (players.length === 0) {
    bot.chat('👥 No other players online')
    return
  }
  
  bot.chat(`👥 Players online: ${players.join(', ')}`)
}

function showPosition() {
  const pos = bot.entity.position
  bot.chat(`📍 Position: X=${Math.floor(pos.x)}, Y=${Math.floor(pos.y)}, Z=${Math.floor(pos.z)}`)
}

function showHelp() {
  const commands = [
    '!follow [player] - Follow a player',
    '!stop - Stop all actions',
    '!attack <player> - Attack a player',
    '!guard - Toggle guard mode',
    '!collect <block> [amount] - Collect blocks',
    '!come - Come to you',
    '!health - Show health status',
    '!inv - Show inventory',
    '!status - Show bot status',
    '!players - List online players',
    '!pos - Show position',
    '!help - Show this help'
  ]
  
  bot.chat('📋 Available commands:')
  commands.forEach((cmd, i) => {
    setTimeout(() => bot.chat(cmd), i * 100)
  })
}

// Auto-reconnect with exponential backoff
let reconnectAttempts = 0
const maxReconnectAttempts = 10

bot.on('end', () => {
  logMessage('ERROR', 'Bot disconnected')
  
  if (reconnectAttempts < maxReconnectAttempts) {
    const delay = Math.min(5000 * Math.pow(2, reconnectAttempts), 60000)
    reconnectAttempts++
    
    logMessage('INFO', `Attempting to reconnect in ${delay/1000} seconds... (${reconnectAttempts}/${maxReconnectAttempts})`)
    
    setTimeout(() => {
      const newBot = mineflayer.createBot({
        host: config.server.host,
        port: config.server.port,
        username: config.bot.username,
        version: config.server.version,
        auth: config.bot.auth
      })
    }, delay)
  } else {
    logMessage('ERROR', 'Max reconnection attempts reached. Bot will not reconnect.')
  }
})

bot.on('spawn', () => {
  reconnectAttempts = 0 // Reset on successful connection
})

logMessage('INFO', 'Bot script loaded, connecting to server...', {
  host: config.server.host,
  port: config.server.port,
  username: config.bot.username
})
