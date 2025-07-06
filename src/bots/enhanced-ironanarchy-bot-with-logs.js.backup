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
const path = require('path')

// Try to import dashboard (optional)
let dashboard = null
try {
  dashboard = require('mineflayer-dashboard')
  console.log('✅ mineflayer-dashboard imported successfully')
} catch (error) {
  console.log('⚠️  Dashboard plugin not available:', error.message)
}

// Try to import Discord.js (optional)
let discordClient = null
let EmbedBuilder = null
let GatewayIntentBits = null
try {
  const discord = require('discord.js')
  discordClient = discord.Client
  EmbedBuilder = discord.EmbedBuilder
  GatewayIntentBits = discord.GatewayIntentBits
  console.log('✅ Discord.js imported successfully')
} catch (error) {
  console.log('⚠️  Discord.js not available:', error.message)
}

// Load configurations
const config = require('./config.json')
let discordConfig = null
try {
  discordConfig = require('./discord-config.json')
  console.log('✅ Discord config loaded')
} catch (error) {
  console.log('⚠️  Discord config not found:', error.message)
  discordConfig = { discord: { enabled: false }, recording: { enabled: false } }
}

console.log('🔥 Enhanced Iron-Anarchy Bot with Discord & Recording Features Starting...')

// Enhanced plugin loading function
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

// Extract correct plugin functions
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

// Discord bot setup
let discordBot = null
let discordChannel = null

if (discordConfig.discord.enabled && discordConfig.discord.token !== 'YOUR_DISCORD_BOT_TOKEN' && discordClient) {
  discordBot = new discordClient({
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

console.log('🤖 Creating bot...')

// Create bot
const bot = mineflayer.createBot({
  host: config.server.host,
  port: config.server.port,
  username: config.bot.username,
  version: config.server.version,
  auth: config.bot.auth
})

console.log('🔌 Loading plugins sequentially...')

// Load plugins with validation
try {
  loadPluginSafely(bot, pathfinder, 'pathfinder')
  loadPluginSafely(bot, pvpPlugin, 'mineflayer-pvp')
  loadPluginSafely(bot, autoEat, 'mineflayer-auto-eat')
  loadPluginSafely(bot, armorManager, 'mineflayer-armor-manager')
  loadPluginSafely(bot, collectBlock, 'mineflayer-collectblock')
  loadPluginSafely(bot, bloodhound, 'mineflayer-bloodhound')
  loadPluginSafely(bot, webInventory, 'mineflayer-web-inventory')
  
  if (dashboard) {
    loadPluginSafely(bot, dashboard, 'mineflayer-dashboard')
  }
  
  console.log('🎉 All plugins loaded successfully!')
  
} catch (error) {
  console.error('💥 Critical plugin loading error:', error.message)
  console.error('Bot cannot continue without required plugins.')
  process.exit(1)
}

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
  if (!discordChannel || !EmbedBuilder) return
  
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
  
  // Test plugin functionality
  console.log('🧪 Testing plugin functionality...')
  console.log('Pathfinder:', bot.pathfinder ? '✅' : '❌')
  console.log('PvP:', bot.pvp ? '✅' : '❌')
  console.log('Auto-eat:', bot.autoEat ? '✅' : '❌')
  console.log('Armor Manager:', bot.armorManager ? '✅' : '❌')
  console.log('Collect Block:', bot.collectBlock ? '✅' : '❌')
  console.log('Bloodhound:', bot.bloodhound ? '✅' : '❌')
  console.log('Web Inventory:', bot.webInventory ? '✅' : '❌')
  if (dashboard) console.log('Dashboard:', bot.dashboard ? '✅' : '❌')
  
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
  
  // Start dashboard if available
  if (dashboard && bot.dashboard) {
    try {
      bot.dashboard.start(8080)
      logMessage('INFO', 'Dashboard started on http://localhost:8080')
    } catch (error) {
      logMessage('ERROR', `Dashboard failed to start: ${error.message}`)
    }
  }
  
  // Auto-start recording if enabled
  if (discordConfig.recording.enabled) {
    startRecording()
  }
  
  setTimeout(() => {
    bot.chat('🔥 Enhanced Iron-Anarchy Bot Online! Discord & Recording Enabled!')
  }, 2000)
  
  logMessage('ANARCHY', 'Enhanced bot ready for Iron-Anarchy! 🔥🎮📹')
})

// Basic bot functions (simplified for validation)
function stopAllActions() {
  bot.pathfinder.setGoal(null)
  if (bot.pvp && bot.pvp.stop) bot.pvp.stop()
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

function handleCommand(username, command) {
  const args = command.split(' ')
  const cmd = args[0].toLowerCase()
  
  logMessage('COMMAND', `${username} executed: ${command}`)
  
  switch (cmd) {
    case 'stop':
      stopAllActions()
      break
    case 'plugins':
      bot.chat('🔌 All plugins loaded and validated!')
      break
    case 'test':
      bot.chat('🧪 Bot is functioning correctly!')
      break
    case 'help':
      bot.chat('🔥 Enhanced Iron-Anarchy Bot - All plugins loaded!')
      break
    default:
      bot.chat(`❌ Unknown command: ${cmd}. Use !help for commands.`)
  }
}

function handleDiscordCommand(message, command) {
  const args = command.split(' ')
  const cmd = args[0].toLowerCase()
  
  switch (cmd) {
    case 'status':
      if (EmbedBuilder) {
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
      }
      break
      
    case 'say':
      if (args[1]) {
        const msg = args.slice(1).join(' ')
        bot.chat(msg)
        message.reply(`✅ Sent to Minecraft: "${msg}"`)
      }
      break
      
    case 'help':
      message.reply('🔥 Enhanced Iron-Anarchy Bot - All plugins loaded and validated!')
      break
      
    default:
      message.reply('❌ Unknown command. Use `!help` for available commands.')
  }
}

// Basic event handlers
bot.on('chat', (username, message) => {
  if (username === bot.username) return
  
  logMessage('CHAT', `<${username}> ${message}`)
  
  // Bridge to Discord
  if (discordChannel && discordConfig.discord.features.chatBridge) {
    discordChannel.send(`**${username}**: ${message}`).catch(() => {})
  }
  
  // Command handling
  if (message.startsWith('!')) {
    handleCommand(username, message.slice(1))
  }
})

bot.on('error', (err) => {
  logMessage('ERROR', `Bot error: ${err.message}`)
})

bot.on('end', () => {
  logMessage('ERROR', 'Disconnected from Iron-Anarchy')
  
  // Save recording before exit
  if (isRecording) {
    stopRecording()
  }
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

logMessage('ANARCHY', '🔥 Enhanced Iron-Anarchy Bot with Discord & Recording starting...', {
  host: config.server.host,
  port: config.server.port,
  username: config.bot.username,
  version: config.server.version,
  discord: discordConfig.discord.enabled,
  recording: discordConfig.recording.enabled
})
