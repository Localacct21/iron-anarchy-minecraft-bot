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

// Chat logging function
function logMessage(type, message) {
  const timestamp = moment().format('YYYY-MM-DD HH:mm:ss')
  const logEntry = `[${timestamp}] [${type}] ${message}\n`
  
  // Console log
  console.log(logEntry.trim())
  
  // File log
  const logFile = `./logs/chat_${moment().format('YYYY-MM-DD')}.log`
  fs.appendFileSync(logFile, logEntry)
}

// Bot events
bot.once('spawn', () => {
  logMessage('INFO', 'Bot spawned successfully!')
  
  // Set up pathfinder
  const defaultMove = new Movements(bot)
  bot.pathfinder.setMovements(defaultMove)
  
  // Configure auto-eat
  bot.autoEat.options = {
    priority: 'foodPoints',
    startAt: 14,
    bannedFood: []
  }
  
  logMessage('INFO', 'All plugins loaded and configured!')
})

bot.on('chat', (username, message) => {
  if (username === bot.username) return
  
  logMessage('CHAT', `<${username}> ${message}`)
  
  // Command handling
  if (message.startsWith('!')) {
    handleCommand(username, message.slice(1))
  }
})

bot.on('whisper', (username, message) => {
  logMessage('WHISPER', `${username} whispers: ${message}`)
})

bot.on('kicked', (reason) => {
  logMessage('ERROR', `Bot was kicked: ${reason}`)
})

bot.on('error', (err) => {
  logMessage('ERROR', `Bot error: ${err.message}`)
})

bot.on('death', () => {
  logMessage('INFO', 'Bot died!')
  bot.chat('I died! Respawning...')
})

bot.on('respawn', () => {
  logMessage('INFO', 'Bot respawned!')
})

// PvP Events
bot.on('playerJoined', (player) => {
  logMessage('INFO', `Player joined: ${player.username}`)
})

bot.on('playerLeft', (player) => {
  logMessage('INFO', `Player left: ${player.username}`)
})

bot.on('entityHurt', (entity) => {
  if (entity === bot.entity) {
    logMessage('PVP', 'Bot took damage!')
  }
})

// Command handling
function handleCommand(username, command) {
  const args = command.split(' ')
  const cmd = args[0].toLowerCase()
  
  logMessage('COMMAND', `${username} executed: ${command}`)
  
  switch (cmd) {
    case 'follow':
      followPlayer(username)
      break
    case 'stop':
      stopFollowing()
      break
    case 'attack':
      if (args[1]) {
        attackPlayer(args[1])
      } else {
        bot.chat('Usage: !attack <player>')
      }
      break
    case 'guard':
      guardMode()
      break
    case 'collect':
      if (args[1]) {
        collectBlocks(args[1])
      } else {
        bot.chat('Usage: !collect <block_name>')
      }
      break
    case 'come':
      comeToPlayer(username)
      break
    case 'health':
      bot.chat(`Health: ${bot.health}/20, Food: ${bot.food}/20`)
      break
    case 'inv':
      showInventory()
      break
    case 'help':
      showHelp()
      break
    default:
      bot.chat(`Unknown command: ${cmd}. Use !help for available commands.`)
  }
}

// Command functions
function followPlayer(username) {
  const player = bot.players[username]
  if (!player || !player.entity) {
    bot.chat(`Cannot find player: ${username}`)
    return
  }
  
  const goal = new goals.GoalFollow(player.entity, 2)
  bot.pathfinder.setGoal(goal)
  bot.chat(`Following ${username}`)
  logMessage('INFO', `Started following ${username}`)
}

function stopFollowing() {
  bot.pathfinder.setGoal(null)
  bot.chat('Stopped following')
  logMessage('INFO', 'Stopped following')
}

function attackPlayer(targetName) {
  const target = bot.players[targetName]
  if (!target || !target.entity) {
    bot.chat(`Cannot find player: ${targetName}`)
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
  
  bot.chat(`Attacking ${targetName}!`)
  logMessage('PVP', `Started attacking ${targetName}`)
}

function guardMode() {
  bot.chat('Entering guard mode - will attack hostile mobs nearby')
  logMessage('INFO', 'Entered guard mode')
  
  setInterval(() => {
    const hostile = bot.nearestEntity(entity => {
      return entity.type === 'mob' && entity.mobType && 
             ['zombie', 'skeleton', 'spider', 'creeper', 'enderman'].includes(entity.mobType) &&
             entity.position.distanceTo(bot.entity.position) < 10
    })
    
    if (hostile) {
      bot.pvp.attack(hostile)
    }
  }, 1000)
}

function collectBlocks(blockName) {
  const block = bot.findBlock({
    matching: (block) => block.name === blockName,
    maxDistance: 64
  })
  
  if (!block) {
    bot.chat(`Cannot find ${blockName} nearby`)
    return
  }
  
  bot.collectBlock.collect(block)
  bot.chat(`Collecting ${blockName}`)
  logMessage('INFO', `Started collecting ${blockName}`)
}

function comeToPlayer(username) {
  const player = bot.players[username]
  if (!player || !player.entity) {
    bot.chat(`Cannot find player: ${username}`)
    return
  }
  
  const goal = new goals.GoalNear(player.entity.position.x, player.entity.position.y, player.entity.position.z, 2)
  bot.pathfinder.setGoal(goal)
  bot.chat(`Coming to ${username}`)
  logMessage('INFO', `Moving to ${username}`)
}

function showInventory() {
  const items = bot.inventory.items()
  if (items.length === 0) {
    bot.chat('Inventory is empty')
    return
  }
  
  const itemList = items.map(item => `${item.count}x ${item.name}`).join(', ')
  bot.chat(`Inventory: ${itemList}`)
}

function showHelp() {
  const commands = [
    '!follow <player> - Follow a player',
    '!stop - Stop following',
    '!attack <player> - Attack a player',
    '!guard - Enter guard mode',
    '!collect <block> - Collect blocks',
    '!come - Come to you',
    '!health - Show health status',
    '!inv - Show inventory',
    '!help - Show this help'
  ]
  
  bot.chat('Available commands:')
  commands.forEach(cmd => bot.chat(cmd))
}

// Auto-reconnect
bot.on('end', () => {
  logMessage('INFO', 'Bot disconnected, attempting to reconnect in 5 seconds...')
  setTimeout(() => {
    mineflayer.createBot(config)
  }, 5000)
})

// Start web inventory on port 3000
bot.once('spawn', () => {
  bot.webInventory.start(3000)
  logMessage('INFO', 'Web inventory started on http://localhost:3000')
})

logMessage('INFO', 'Bot script loaded, connecting to server...')
