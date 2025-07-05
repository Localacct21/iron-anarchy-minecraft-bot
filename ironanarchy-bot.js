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

console.log('🔥 Iron-Anarchy PvP Bot Starting...')

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

// Global variables for Iron-Anarchy
let isGuarding = false
let following = null
let guardInterval = null
let autoKillAura = false
let killAuraInterval = null
let escapeMode = false
let lastAttacker = null

// Enhanced logging function
function logMessage(type, message, data = null) {
  const timestamp = moment().format('YYYY-MM-DD HH:mm:ss')
  const logEntry = `[${timestamp}] [${type}] ${message}${data ? ' | ' + JSON.stringify(data) : ''}\n`
  
  // Console log with colors
  const colors = {
    INFO: '\x1b[36m',      // Cyan
    CHAT: '\x1b[32m',      // Green
    PVP: '\x1b[31m',       // Red
    COMMAND: '\x1b[33m',   // Yellow
    ERROR: '\x1b[91m',     // Bright Red
    SUCCESS: '\x1b[92m',   // Bright Green
    ANARCHY: '\x1b[95m'    // Bright Magenta
  }
  
  console.log(`${colors[type] || '\x1b[0m'}${logEntry.trim()}\x1b[0m`)
  
  // File log
  if (config.features.logging.enabled) {
    const logFile = `./logs/ironanarchy_${moment().format('YYYY-MM-DD')}.log`
    fs.appendFileSync(logFile, logEntry)
  }
}

// Bot events
bot.once('spawn', () => {
  logMessage('SUCCESS', '🔥 Connected to Iron-Anarchy successfully!')
  
  // Set up pathfinder for anarchy server
  const defaultMove = new Movements(bot)
  defaultMove.allowFreeMotion = true
  defaultMove.allowParkour = true
  defaultMove.canDig = true
  bot.pathfinder.setMovements(defaultMove)
  
  // Configure auto-eat for survival
  if (config.features.autoEat.enabled) {
    bot.autoEat.options = {
      priority: config.features.autoEat.priority,
      startAt: config.features.autoEat.startAt,
      bannedFood: []
    }
    logMessage('INFO', 'Auto-eat configured for survival')
  }
  
  // Start web inventory
  if (config.features.webInventory.enabled) {
    bot.webInventory.start(config.features.webInventory.port)
    logMessage('INFO', `Web inventory: http://localhost:${config.features.webInventory.port}`)
  }
  
  // Iron-Anarchy welcome message
  setTimeout(() => {
    bot.chat('🔥 Iron-Anarchy PvP Bot Online! Type !help for commands')
  }, 2000)
  
  logMessage('ANARCHY', 'Ready for chaos on Iron-Anarchy! 🔥')
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
  
  // Auto-responses for anarchy server
  if (message.toLowerCase().includes('hack') || message.toLowerCase().includes('cheat')) {
    logMessage('ANARCHY', `Possible hacker detected: ${username}`)
  }
})

bot.on('whisper', (username, message) => {
  logMessage('CHAT', `${username} whispers: ${message}`)
  
  // Handle whisper commands
  if (message.startsWith('!')) {
    handleCommand(username, message.slice(1))
  }
})

bot.on('kicked', (reason) => {
  logMessage('ERROR', `Kicked from Iron-Anarchy: ${reason}`)
})

bot.on('error', (err) => {
  logMessage('ERROR', `Bot error: ${err.message}`)
})

bot.on('death', () => {
  logMessage('PVP', '💀 Bot died on Iron-Anarchy!')
  
  // Reset all combat modes
  isGuarding = false
  following = null
  autoKillAura = false
  escapeMode = false
  
  if (guardInterval) {
    clearInterval(guardInterval)
    guardInterval = null
  }
  if (killAuraInterval) {
    clearInterval(killAuraInterval)
    killAuraInterval = null
  }
  
  bot.chat('💀 Died! Respawning for revenge...')
})

bot.on('respawn', () => {
  logMessage('SUCCESS', '🔥 Respawned on Iron-Anarchy!')
})

// Enhanced PvP Events for Anarchy
bot.on('playerJoined', (player) => {
  logMessage('INFO', `Player joined Iron-Anarchy: ${player.username}`)
})

bot.on('playerLeft', (player) => {
  logMessage('INFO', `Player left Iron-Anarchy: ${player.username}`)
})

bot.on('entityHurt', (entity) => {
  if (entity === bot.entity) {
    const attacker = findNearestPlayer()
    if (attacker) {
      lastAttacker = attacker.username
      logMessage('PVP', `Taking damage from ${attacker.username}!`)
      
      // Auto-retaliate if not in escape mode
      if (!escapeMode && autoKillAura) {
        setTimeout(() => {
          bot.pvp.attack(attacker)
        }, 100)
      }
    }
  }
})

// Enhanced command handling for anarchy server
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
    case 'killaura':
      toggleKillAura()
      break
    case 'escape':
      toggleEscapeMode()
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
    case 'coords':
      showCoords()
      break
    case 'revenge':
      revengeAttack()
      break
    case 'suicide':
      bot.chat('💀 Committing suicide...')
      bot.chat('/kill')
      break
    case 'help':
      showAnarchyHelp()
      break
    default:
      bot.chat(`❌ Unknown command: ${cmd}. Use !help for Iron-Anarchy commands.`)
  }
}

// Anarchy-specific functions
function toggleKillAura() {
  if (autoKillAura) {
    autoKillAura = false
    if (killAuraInterval) {
      clearInterval(killAuraInterval)
      killAuraInterval = null
    }
    bot.chat('🔥 Kill-Aura disabled')
    logMessage('ANARCHY', 'Kill-Aura disabled')
  } else {
    autoKillAura = true
    bot.chat('🔥 Kill-Aura enabled - will attack nearby players')
    logMessage('ANARCHY', 'Kill-Aura enabled')
    
    killAuraInterval = setInterval(() => {
      if (!autoKillAura || escapeMode) return
      
      const nearbyPlayer = findNearestPlayer()
      if (nearbyPlayer && nearbyPlayer.position.distanceTo(bot.entity.position) < 6) {
        bot.pvp.attack(nearbyPlayer)
        logMessage('PVP', `Kill-Aura attacking: ${nearbyPlayer.username}`)
      }
    }, 500)
  }
}

function toggleEscapeMode() {
  if (escapeMode) {
    escapeMode = false
    bot.chat('🛡️ Escape mode disabled')
    logMessage('ANARCHY', 'Escape mode disabled')
  } else {
    escapeMode = true
    autoKillAura = false
    if (killAuraInterval) {
      clearInterval(killAuraInterval)
      killAuraInterval = null
    }
    bot.chat('🏃 Escape mode enabled - will flee from combat')
    logMessage('ANARCHY', 'Escape mode enabled')
  }
}

function revengeAttack() {
  if (!lastAttacker) {
    bot.chat('😤 No one to get revenge on!')
    return
  }
  
  const target = bot.players[lastAttacker]
  if (!target || !target.entity) {
    bot.chat(`😤 ${lastAttacker} is not online for revenge!`)
    return
  }
  
  bot.chat(`😤 Getting revenge on ${lastAttacker}!`)
  attackPlayer(lastAttacker)
}

function findNearestPlayer() {
  const players = Object.values(bot.players)
    .filter(player => player.entity && player.username !== bot.username)
    .sort((a, b) => {
      const distA = a.entity.position.distanceTo(bot.entity.position)
      const distB = b.entity.position.distanceTo(bot.entity.position)
      return distA - distB
    })
  
  return players[0]?.entity || null
}

function showCoords() {
  const pos = bot.entity.position
  const coords = `X: ${Math.floor(pos.x)}, Y: ${Math.floor(pos.y)}, Z: ${Math.floor(pos.z)}`
  bot.chat(`📍 Coordinates: ${coords}`)
  logMessage('INFO', `Shared coordinates: ${coords}`)
}

function showAnarchyHelp() {
  const commands = [
    '🔥 Iron-Anarchy Bot Commands:',
    '!follow [player] - Follow a player',
    '!stop - Stop all actions',
    '!attack <player> - Attack a player',
    '!guard - Toggle guard mode',
    '!killaura - Toggle kill-aura mode',
    '!escape - Toggle escape mode',
    '!revenge - Attack last attacker',
    '!collect <block> [amount] - Collect blocks',
    '!come - Come to you',
    '!health - Show health status',
    '!inv - Show inventory',
    '!status - Show bot status',
    '!players - List online players',
    '!coords - Show coordinates',
    '!suicide - Kill bot',
    '!help - Show this help'
  ]
  
  commands.forEach((cmd, i) => {
    setTimeout(() => bot.chat(cmd), i * 150)
  })
}

// Enhanced functions for anarchy server
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
  bot.chat(`🏃 Following ${targetName} on Iron-Anarchy`)
  logMessage('INFO', `Started following ${targetName}`)
}

function stopAllActions() {
  bot.pathfinder.setGoal(null)
  bot.pvp.stop()
  following = null
  isGuarding = false
  autoKillAura = false
  escapeMode = false
  
  if (guardInterval) {
    clearInterval(guardInterval)
    guardInterval = null
  }
  if (killAuraInterval) {
    clearInterval(killAuraInterval)
    killAuraInterval = null
  }
  
  bot.chat('🛑 All actions stopped')
  logMessage('INFO', 'Stopped all actions')
}

function attackPlayer(targetName) {
  const target = bot.players[targetName]
  if (!target || !target.entity) {
    bot.chat(`❌ Cannot find player: ${targetName}`)
    return
  }
  
  if (escapeMode) {
    bot.chat('🏃 Cannot attack in escape mode!')
    return
  }
  
  if (target.entity.position.distanceTo(bot.entity.position) > 6) {
    // Move closer first
    const goal = new goals.GoalNear(target.entity.position.x, target.entity.position.y, target.entity.position.z, 2)
    bot.pathfinder.setGoal(goal)
    
    bot.once('goal_reached', () => {
      bot.pvp.attack(target.entity)
    })
  } else {
    bot.pvp.attack(target.entity)
  }
  
  bot.chat(`⚔️ Attacking ${targetName} on Iron-Anarchy!`)
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
    bot.chat('🛡️ Guard mode enabled - protecting against mobs')
    logMessage('INFO', 'Guard mode enabled')
    
    guardInterval = setInterval(() => {
      if (!isGuarding || escapeMode) return
      
      const hostile = bot.nearestEntity(entity => {
        return entity.type === 'mob' && entity.mobType && 
               ['zombie', 'skeleton', 'spider', 'creeper', 'enderman', 'witch'].includes(entity.mobType) &&
               entity.position.distanceTo(bot.entity.position) < 8
      })
      
      if (hostile) {
        bot.pvp.attack(hostile)
        logMessage('PVP', `Guard mode attacking: ${hostile.mobType}`)
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
  
  bot.chat(`⛏️ Collecting ${blocks.length}x ${blockName} on Iron-Anarchy`)
  logMessage('INFO', `Started collecting ${blocks.length}x ${blockName}`)
  
  // Collect blocks
  blocks.forEach((blockPos, index) => {
    setTimeout(() => {
      const block = bot.blockAt(blockPos)
      if (block) {
        bot.dig(block)
      }
    }, index * 1000)
  })
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
  
  const itemList = items.slice(0, 8).map(item => `${item.count}x ${item.name}`).join(', ')
  bot.chat(`🎒 Inventory: ${itemList}${items.length > 8 ? '...' : ''}`)
}

function showStatus() {
  const pos = bot.entity.position
  const modes = []
  if (following) modes.push(`Following ${following}`)
  if (isGuarding) modes.push('Guarding')
  if (autoKillAura) modes.push('Kill-Aura')
  if (escapeMode) modes.push('Escape Mode')
  
  const status = modes.length > 0 ? modes.join(', ') : 'Idle'
  
  bot.chat(`📊 Status: ${status}`)
  bot.chat(`📍 Position: ${Math.floor(pos.x)}, ${Math.floor(pos.y)}, ${Math.floor(pos.z)}`)
  bot.chat(`👥 Players online: ${Object.keys(bot.players).length}`)
}

function listPlayers() {
  const players = Object.keys(bot.players).filter(name => name !== bot.username)
  if (players.length === 0) {
    bot.chat('👥 No other players online')
    return
  }
  
  bot.chat(`👥 Iron-Anarchy players: ${players.join(', ')}`)
}

// Auto-reconnect for Iron-Anarchy
let reconnectAttempts = 0
const maxReconnectAttempts = 10

bot.on('end', () => {
  logMessage('ERROR', 'Disconnected from Iron-Anarchy')
  
  if (reconnectAttempts < maxReconnectAttempts) {
    const delay = Math.min(5000 * Math.pow(2, reconnectAttempts), 30000)
    reconnectAttempts++
    
    logMessage('INFO', `Reconnecting to Iron-Anarchy in ${delay/1000}s... (${reconnectAttempts}/${maxReconnectAttempts})`)
    
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
    logMessage('ERROR', 'Max reconnection attempts reached for Iron-Anarchy')
  }
})

bot.on('spawn', () => {
  reconnectAttempts = 0
})

logMessage('ANARCHY', '🔥 Iron-Anarchy PvP Bot connecting...', {
  host: config.server.host,
  port: config.server.port,
  username: config.bot.username,
  version: config.server.version
})
