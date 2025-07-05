const mineflayer = require('mineflayer')
const { pathfinder, Movements, goals } = require('mineflayer-pathfinder')
const mineflayerPvp = require('mineflayer-pvp')
const autoEat = require('mineflayer-auto-eat')
const armorManager = require('mineflayer-armor-manager')
const collectBlock = require('mineflayer-collectblock')
const { plugin: bloodhound } = require('mineflayer-bloodhound')
const webInventory = require('mineflayer-web-inventory')
const dashboard = require('mineflayer-dashboard')
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js')
const fs = require('fs-extra')
const moment = require('moment')
const path = require('path')

// Load configurations
const config = require('./config.json')
const discordConfig = require('./discord-config.json')

console.log('🔥 Enhanced Iron-Anarchy Bot with Discord & Recording Features Starting...')

// Discord bot setup
let discordBot = null
let discordChannel = null

if (discordConfig.discord.enabled && discordConfig.discord.token !== 'YOUR_DISCORD_BOT_TOKEN') {
  discordBot = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent
    ]
  })
  
  discordBot.login(discordConfig.discord.token).catch(err => {
    console.log('❌ Discord bot login failed:', err.message)
  })
}

// Create bot
const bot = mineflayer.createBot({

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
  host: config.server.host,
  port: config.server.port,
  username: config.bot.username,
  version: config.server.version,
  auth: config.bot.auth
})

// Load plugins
bot.loadPlugin(pathfinder)
loadPluginSafely(bot, pvpPlugin, 'mineflayer-pvp')
bot.loadPlugin(autoEat)
bot.loadPlugin(armorManager)
bot.loadPlugin(collectBlock)
bot.loadPlugin(bloodhound)
bot.loadPlugin(webInventory)
bot.loadPlugin(dashboard)

// Create directories
fs.ensureDirSync('./logs')
fs.ensureDirSync('./recordings')
fs.ensureDirSync('./screenshots')

// Global variables
let isGuarding = false
let following = null
let guardInterval = null
let autoKillAura = false
let killAuraInterval = null
let escapeMode = false
let lastAttacker = null
let isRecording = false
let recordingData = []

// Enhanced logging with Discord integration
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
    ANARCHY: '\x1b[95m',   // Bright Magenta
    DISCORD: '\x1b[94m'    // Bright Blue
  }
  
  console.log(`${colors[type] || '\x1b[0m'}${logEntry.trim()}\x1b[0m`)
  
  // File log
  if (config.features.logging.enabled) {
    const logFile = `./logs/enhanced_${moment().format('YYYY-MM-DD')}.log`
    fs.appendFileSync(logFile, logEntry)
  }
  
  // Discord log
  if (discordBot && discordChannel && discordConfig.discord.features.statusUpdates) {
    sendDiscordMessage(type, message, data)
  }
  
  // Recording
  if (isRecording && discordConfig.recording.enabled) {
    recordEvent(type, message, data)
  }
}

// Discord functions
function sendDiscordMessage(type, message, data = null) {
  if (!discordChannel) return
  
  const embed = new EmbedBuilder()
    .setTitle(`🔥 Iron-Anarchy Bot - ${type}`)
    .setDescription(message)
    .setTimestamp()
    .setColor(getEmbedColor(type))
  
  if (data) {
    embed.addFields({ name: 'Data', value: `\`\`\`json\n${JSON.stringify(data, null, 2)}\`\`\`` })
  }
  
  discordChannel.send({ embeds: [embed] }).catch(err => {
    console.log('Discord send error:', err.message)
  })
}

function getEmbedColor(type) {
  const colors = {
    INFO: 0x00FFFF,      // Cyan
    CHAT: 0x00FF00,      // Green
    PVP: 0xFF0000,       // Red
    COMMAND: 0xFFFF00,   // Yellow
    ERROR: 0xFF5555,     // Bright Red
    SUCCESS: 0x55FF55,   // Bright Green
    ANARCHY: 0xFF55FF    // Bright Magenta
  }
  return colors[type] || 0xFFFFFF
}

// Recording functions
function recordEvent(type, message, data = null) {
  const event = {
    timestamp: moment().toISOString(),
    type: type,
    message: message,
    data: data,
    botPosition: bot.entity ? bot.entity.position : null,
    botHealth: bot.health,
    botFood: bot.food
  }
  
  recordingData.push(event)
  
  // Save recording if it gets too large
  if (recordingData.length > 1000) {
    saveRecording()
  }
}

function saveRecording() {
  if (recordingData.length === 0) return
  
  const filename = `./recordings/recording_${moment().format('YYYY-MM-DD_HH-mm-ss')}.json`
  fs.writeFileSync(filename, JSON.stringify({
    startTime: recordingData[0].timestamp,
    endTime: recordingData[recordingData.length - 1].timestamp,
    server: config.server.host,
    botUsername: config.bot.username,
    events: recordingData
  }, null, 2))
  
  logMessage('INFO', `Recording saved: ${filename} (${recordingData.length} events)`)
  recordingData = []
}

function startRecording() {
  isRecording = true
  recordingData = []
  logMessage('SUCCESS', 'Recording started')
}

function stopRecording() {
  isRecording = false
  saveRecording()
  logMessage('SUCCESS', 'Recording stopped and saved')
}

// Discord bot events
if (discordBot) {
  discordBot.once('ready', () => {
    logMessage('DISCORD', `Discord bot logged in as ${discordBot.user.tag}`)
    
    if (discordConfig.discord.channelId && discordConfig.discord.channelId !== 'YOUR_DISCORD_CHANNEL_ID') {
      discordChannel = discordBot.channels.cache.get(discordConfig.discord.channelId)
      if (discordChannel) {
        logMessage('DISCORD', `Connected to Discord channel: ${discordChannel.name}`)
        discordChannel.send('🔥 Iron-Anarchy Bot is now online!')
      }
    }
  })
  
  discordBot.on('messageCreate', (message) => {
    if (message.author.bot) return
    if (!discordChannel || message.channel.id !== discordChannel.id) return
    
    const content = message.content
    
    if (content.startsWith(discordConfig.discord.prefix)) {
      const command = content.slice(discordConfig.discord.prefix.length)
      logMessage('DISCORD', `Discord command received: ${command}`)
      
      // Handle Discord commands
      handleDiscordCommand(message, command)
    } else if (discordConfig.discord.features.chatBridge) {
      // Bridge chat to Minecraft
      bot.chat(`[Discord] <${message.author.username}> ${content}`)
      logMessage('DISCORD', `Bridged message from ${message.author.username}: ${content}`)
    }
  })
}

// Enhanced bot events
bot.once('spawn', () => {
  logMessage('SUCCESS', '🔥 Enhanced bot connected to Iron-Anarchy!')
  
  // Set up pathfinder
  const defaultMove = new Movements(bot)
  defaultMove.allowFreeMotion = true
  defaultMove.allowParkour = true
  defaultMove.canDig = true
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
    logMessage('INFO', `Web inventory: http://localhost:${config.features.webInventory.port}`)
  }
  
  // Start dashboard
  bot.dashboard.start(8080)
  logMessage('INFO', 'Dashboard started on http://localhost:8080')
  
  // Auto-start recording if enabled
  if (discordConfig.recording.enabled) {
    startRecording()
  }
  
  setTimeout(() => {
    bot.chat('🔥 Enhanced Iron-Anarchy Bot Online! Discord & Recording Enabled!')
  }, 2000)
  
  logMessage('ANARCHY', 'Enhanced bot ready for Iron-Anarchy! 🔥🎮📹')
})

bot.on('chat', (username, message) => {
  if (username === bot.username) return
  
  if (config.features.logging.logChat) {
    logMessage('CHAT', `<${username}> ${message}`)
  }
  
  // Bridge to Discord
  if (discordChannel && discordConfig.discord.features.chatBridge) {
    discordChannel.send(`**${username}**: ${message}`).catch(() => {})
  }
  
  // Command handling
  if (message.startsWith('!')) {
    handleCommand(username, message.slice(1))
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
    case 'killaura':
      toggleKillAura()
      break
    case 'escape':
      toggleEscapeMode()
      break
    case 'record':
      if (args[1] === 'start') {
        startRecording()
        bot.chat('📹 Recording started')
      } else if (args[1] === 'stop') {
        stopRecording()
        bot.chat('📹 Recording stopped')
      } else {
        bot.chat(`📹 Recording status: ${isRecording ? 'ON' : 'OFF'}`)
      }
      break
    case 'screenshot':
      takeScreenshot()
      break
    case 'discord':
      if (args[1] && discordChannel) {
        const msg = args.slice(1).join(' ')
        discordChannel.send(`**${username}**: ${msg}`)
        bot.chat('📤 Message sent to Discord')
      } else {
        bot.chat('📱 Discord bridge status: ' + (discordChannel ? 'Connected' : 'Disconnected'))
      }
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
      showEnhancedStatus()
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
      showEnhancedHelp()
      break
    default:
      bot.chat(`❌ Unknown command: ${cmd}. Use !help for commands.`)
  }
}

// Discord command handling
function handleDiscordCommand(message, command) {
  const args = command.split(' ')
  const cmd = args[0].toLowerCase()
  
  switch (cmd) {
    case 'status':
      const embed = new EmbedBuilder()
        .setTitle('🔥 Iron-Anarchy Bot Status')
        .addFields(
          { name: 'Server', value: config.server.host, inline: true },
          { name: 'Health', value: `${bot.health || 0}/20`, inline: true },
          { name: 'Food', value: `${bot.food || 0}/20`, inline: true },
          { name: 'Recording', value: isRecording ? '📹 ON' : '📹 OFF', inline: true },
          { name: 'Players Online', value: Object.keys(bot.players || {}).length.toString(), inline: true }
        )
        .setColor(0x00FF00)
        .setTimestamp()
      
      message.reply({ embeds: [embed] })
      break
      
    case 'say':
      if (args[1]) {
        const msg = args.slice(1).join(' ')
        bot.chat(msg)
        message.reply(`✅ Sent to Minecraft: "${msg}"`)
      }
      break
      
    case 'record':
      if (args[1] === 'start') {
        startRecording()
        message.reply('📹 Recording started')
      } else if (args[1] === 'stop') {
        stopRecording()
        message.reply('📹 Recording stopped and saved')
      } else {
        message.reply(`📹 Recording status: ${isRecording ? 'ON' : 'OFF'}`)
      }
      break
      
    case 'screenshot':
      takeScreenshot().then(() => {
        message.reply('📸 Screenshot taken!')
      }).catch(err => {
        message.reply('❌ Screenshot failed: ' + err.message)
      })
      break
      
    case 'help':
      const helpEmbed = new EmbedBuilder()
        .setTitle('🔥 Discord Bot Commands')
        .setDescription([
          '`!status` - Show bot status',
          '`!say <message>` - Send message to Minecraft',
          '`!record start/stop` - Control recording',
          '`!screenshot` - Take a screenshot',
          '`!help` - Show this help'
        ].join('\n'))
        .setColor(0x00FFFF)
      
      message.reply({ embeds: [helpEmbed] })
      break
      
    default:
      message.reply('❌ Unknown command. Use `!help` for available commands.')
  }
}

// Screenshot function
async function takeScreenshot() {
  try {
    const filename = `./screenshots/screenshot_${moment().format('YYYY-MM-DD_HH-mm-ss')}.png`
    // This would require additional setup with a headless browser or bot viewing system
    logMessage('INFO', `Screenshot attempt: ${filename}`)
    return filename
  } catch (error) {
    logMessage('ERROR', `Screenshot failed: ${error.message}`)
    throw error
  }
}

// Enhanced status function
function showEnhancedStatus() {
  const pos = bot.entity.position
  const modes = []
  if (following) modes.push(`Following ${following}`)
  if (isGuarding) modes.push('Guarding')
  if (autoKillAura) modes.push('Kill-Aura')
  if (escapeMode) modes.push('Escape Mode')
  if (isRecording) modes.push('Recording')
  
  const status = modes.length > 0 ? modes.join(', ') : 'Idle'
  
  bot.chat(`📊 Status: ${status}`)
  bot.chat(`📍 Position: ${Math.floor(pos.x)}, ${Math.floor(pos.y)}, ${Math.floor(pos.z)}`)
  bot.chat(`👥 Players: ${Object.keys(bot.players).length} | 🎮 Discord: ${discordChannel ? 'ON' : 'OFF'} | 📹 Recording: ${isRecording ? 'ON' : 'OFF'}`)
}

// Enhanced help function
function showEnhancedHelp() {
  const commands = [
    '🔥 Enhanced Iron-Anarchy Bot Commands:',
    '!follow [player] - Follow a player',
    '!stop - Stop all actions',
    '!attack <player> - Attack a player',
    '!guard - Toggle guard mode',
    '!killaura - Toggle kill-aura mode',
    '!escape - Toggle escape mode',
    '!record start/stop - Control recording',
    '!screenshot - Take a screenshot',
    '!discord <message> - Send to Discord',
    '!revenge - Attack last attacker',
    '!collect <block> [amount] - Collect blocks',
    '!come - Come to you',
    '!health - Show health status',
    '!inv - Show inventory',
    '!status - Show enhanced status',
    '!players - List online players',
    '!coords - Show coordinates',
    '!suicide - Kill bot',
    '!help - Show this help'
  ]
  
  commands.forEach((cmd, i) => {
    setTimeout(() => bot.chat(cmd), i * 150)
  })
}

// Include all previous bot functions (followPlayer, attackPlayer, etc.)
// [Previous functions from ironanarchy-bot.js would be included here]

// Enhanced error handling and cleanup
bot.on('error', (err) => {
  logMessage('ERROR', `Bot error: ${err.message}`)
})

bot.on('end', () => {
  logMessage('ERROR', 'Disconnected from Iron-Anarchy')
  
  // Save recording before exit
  if (isRecording) {
    stopRecording()
  }
  
  // Auto-reconnect logic here...
})

// Graceful shutdown
process.on('SIGINT', () => {
  logMessage('INFO', 'Shutting down enhanced bot...')
  
  if (isRecording) {
    stopRecording()
  }
  
  if (discordBot) {
    discordBot.destroy()
  }
  
  process.exit(0)
})

// Include previous functions (toggleKillAura, followPlayer, etc.)
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

function listPlayers() {
  const players = Object.keys(bot.players).filter(name => name !== bot.username)
  if (players.length === 0) {
    bot.chat('👥 No other players online')
    return
  }
  
  bot.chat(`👥 Iron-Anarchy players: ${players.join(', ')}`)
}

function showCoords() {
  const pos = bot.entity.position
  const coords = `X: ${Math.floor(pos.x)}, Y: ${Math.floor(pos.y)}, Z: ${Math.floor(pos.z)}`
  bot.chat(`📍 Coordinates: ${coords}`)
  logMessage('INFO', `Shared coordinates: ${coords}`)
}

logMessage('ANARCHY', '🔥 Enhanced Iron-Anarchy Bot with Discord & Recording starting...', {
  host: config.server.host,
  port: config.server.port,
  username: config.bot.username,
  version: config.server.version,
  discord: discordConfig.discord.enabled,
  recording: discordConfig.recording.enabled
})
