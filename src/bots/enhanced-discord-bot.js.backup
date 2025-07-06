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

// Load configuration
const config = require('./config.json')

// Discord.js imports
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

// Discord configuration
let discordConfig = null
try {
  discordConfig = require('./discord-config.json')
  console.log('✅ Discord config loaded')
} catch (error) {
  console.log('⚠️  Discord config not found:', error.message)
  discordConfig = { discord: { enabled: false }, recording: { enabled: false } }
}

console.log('🔥 Enhanced Iron-Anarchy Bot with Advanced Discord Integration Starting...')

// Global variables
let bot = null
let discordBot = null
let discordChannel = null
let discordBotLogChannel = null

// Error handling for Discord
function handleDiscordError(error, context = '') {
  console.error(`❌ Discord Error ${context}:`, error.message)
  
  if (discordBotLogChannel) {
    const errorEmbed = new EmbedBuilder()
      .setColor('#ff0000')
      .setTitle('🚨 Bot Error')
      .setDescription(`**Context:** ${context}\n**Error:** ${error.message}`)
      .setTimestamp()
    
    discordBotLogChannel.send({ embeds: [errorEmbed] }).catch(err => {
      console.error('Failed to send error to bot log channel:', err.message)
    })
  }
}

// Enhanced logging with Discord integration
function logMessage(type, message, data = null) {
  const timestamp = moment().format('YYYY-MM-DD HH:mm:ss')
  const colors = {
    INFO: '\x1b[32m',      // Green
    ERROR: '\x1b[31m',     // Red
    WARNING: '\x1b[33m',   // Yellow
    SUCCESS: '\x1b[92m',   // Bright Green
    ANARCHY: '\x1b[95m',   // Bright Magenta
    PVP: '\x1b[91m',       // Bright Red
    CHAT: '\x1b[36m',      // Cyan
    COMMAND: '\x1b[35m',   // Magenta
    DISCORD: '\x1b[94m'    // Bright Blue
  }
  
  const colorCode = colors[type] || '\x1b[37m'
  const resetCode = '\x1b[0m'
  
  console.log(`${colorCode}[${timestamp}] [${type}] ${message}${resetCode}`)
  
  // Enhanced Discord logging
  if (discordBot && discordConfig.discord.features.statusUpdates) {
    sendDiscordMessage(type, message, data)
  }
}

// Enhanced Discord message sending
function sendDiscordMessage(type, message, data = null) {
  if (!discordChannel || !EmbedBuilder) return
  
  const embed = new EmbedBuilder()
    .setTimestamp()
    .setDescription(message)
  
  // Set color and title based on type
  switch (type) {
    case 'ERROR':
      embed.setColor('#ff0000').setTitle('🚨 Error')
      break
    case 'WARNING':
      embed.setColor('#ffaa00').setTitle('⚠️ Warning')
      break
    case 'SUCCESS':
      embed.setColor('#00ff00').setTitle('✅ Success')
      break
    case 'PVP':
      embed.setColor('#ff6600').setTitle('⚔️ PvP')
      break
    case 'CHAT':
      embed.setColor('#00aaff').setTitle('💬 Chat')
      break
    case 'DISCORD':
      embed.setColor('#7289da').setTitle('🤖 Discord')
      break
    default:
      embed.setColor('#888888').setTitle('ℹ️ Info')
  }
  
  // Add additional data if provided
  if (data) {
    embed.addFields({ name: 'Details', value: JSON.stringify(data, null, 2) })
  }
  
  discordChannel.send({ embeds: [embed] }).catch(err => {
    handleDiscordError(err, 'sending message to main channel')
  })
}

// Send critical errors to bot log channel
function sendBotLogMessage(title, message, color = '#ff0000') {
  if (!discordBotLogChannel || !EmbedBuilder) return
  
  const embed = new EmbedBuilder()
    .setColor(color)
    .setTitle(title)
    .setDescription(message)
    .setTimestamp()
  
  discordBotLogChannel.send({ embeds: [embed] }).catch(err => {
    console.error('Failed to send to bot log channel:', err.message)
  })
}

// Discord bot setup
if (discordConfig.discord.enabled && discordConfig.discord.token !== 'YOUR_DISCORD_BOT_TOKEN' && discordClient) {
  discordBot = new discordClient({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent
    ]
  })
  
  discordBot.login(discordConfig.discord.token).catch(err => {
    handleDiscordError(err, 'bot login')
  })
}

// Discord bot events
if (discordBot) {
  discordBot.once('ready', () => {
    logMessage('DISCORD', `Discord bot logged in as ${discordBot.user.tag}`)
    
    // Setup main channel
    if (discordConfig.discord.channelId && discordConfig.discord.channelId !== 'YOUR_DISCORD_CHANNEL_ID') {
      discordChannel = discordBot.channels.cache.get(discordConfig.discord.channelId)
      if (discordChannel) {
        logMessage('DISCORD', `Connected to Discord channel: ${discordChannel.name}`)
        discordChannel.send('🔥 Iron-Anarchy Bot is now online!')
      } else {
        logMessage('ERROR', 'Could not find Discord channel with provided ID')
      }
    }
    
    // Setup bot log channel
    if (discordConfig.discord.botLogChannelId && discordConfig.discord.botLogChannelId !== 'YOUR_DISCORD_CHANNEL_ID') {
      discordBotLogChannel = discordBot.channels.cache.get(discordConfig.discord.botLogChannelId)
      if (discordBotLogChannel) {
        logMessage('DISCORD', `Connected to bot log channel: ${discordBotLogChannel.name}`)
        sendBotLogMessage('🤖 Bot Started', 'Iron-Anarchy Discord bot has started successfully', '#00ff00')
      } else {
        logMessage('ERROR', 'Could not find bot log channel with provided ID')
      }
    } else {
      // Use main channel as fallback
      discordBotLogChannel = discordChannel
    }
  })
  
  discordBot.on('messageCreate', (message) => {
    if (message.author.bot) return
    if (!discordChannel || message.channel.id !== discordChannel.id) return
    
    const content = message.content.trim()
    if (content.startsWith(discordConfig.discord.prefix)) {
      const command = content.slice(discordConfig.discord.prefix.length)
      logMessage('DISCORD', `Discord command received: ${command}`)
      
      handleDiscordCommand(message, command)
    } else if (discordConfig.discord.features.chatBridge) {
      if (bot && bot.entity) {
        bot.chat(`[Discord] <${message.author.username}> ${content}`)
        logMessage('DISCORD', `Bridged message from ${message.author.username}: ${content}`)
      }
    }
  })
  
  discordBot.on('error', (error) => {
    handleDiscordError(error, 'Discord client error')
  })
}

// Enhanced Discord command handling
function handleDiscordCommand(message, command) {
  const args = command.split(' ')
  const cmd = args[0].toLowerCase()
  
  try {
    switch (cmd) {
      case 'status':
        if (bot && bot.entity) {
          const status = {
            health: bot.health,
            food: bot.food,
            position: bot.entity.position,
            dimension: bot.game.dimension
          }
          message.reply(`Bot Status: Health ${status.health}, Food ${status.food}, Position: ${Math.floor(status.position.x)}, ${Math.floor(status.position.y)}, ${Math.floor(status.position.z)}`)
        } else {
          message.reply('Bot is not connected to Minecraft server')
        }
        break
        
      case 'say':
        if (bot && bot.entity) {
          const msg = args.slice(1).join(' ')
          bot.chat(msg)
          message.reply(`Said: ${msg}`)
        } else {
          message.reply('Bot is not connected to Minecraft server')
        }
        break
        
      case 'pos':
        if (bot && bot.entity) {
          const pos = bot.entity.position
          message.reply(`Bot position: ${Math.floor(pos.x)}, ${Math.floor(pos.y)}, ${Math.floor(pos.z)}`)
        } else {
          message.reply('Bot is not connected to Minecraft server')
        }
        break
        
      case 'help':
        const helpEmbed = new EmbedBuilder()
          .setColor('#0099ff')
          .setTitle('🤖 Bot Commands')
          .setDescription('Available commands:')
          .addFields(
            { name: '!status', value: 'Show bot status' },
            { name: '!say <message>', value: 'Make bot say something' },
            { name: '!pos', value: 'Show bot position' },
            { name: '!help', value: 'Show this help message' }
          )
        message.reply({ embeds: [helpEmbed] })
        break
        
      default:
        message.reply(`Unknown command: ${cmd}. Use !help for available commands.`)
    }
  } catch (error) {
    handleDiscordError(error, `handling command: ${cmd}`)
    message.reply('❌ Error executing command')
  }
}

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
    handleDiscordError(error, `loading plugin ${pluginName}`)
    throw error
  }
}

// Bot creation with enhanced error handling
function createBot() {
  try {
    bot = mineflayer.createBot({
      host: config.server.host,
      port: config.server.port,
      username: config.bot.username,
      version: config.server.version,
      auth: config.bot.auth
    })
    
    // Load plugins with enhanced error handling
    try {
      loadPluginSafely(bot, pathfinder, 'pathfinder')
      loadPluginSafely(bot, mineflayerPvp.plugin || mineflayerPvp, 'mineflayer-pvp')
      loadPluginSafely(bot, autoEatModule.plugin || autoEatModule, 'mineflayer-auto-eat')
      loadPluginSafely(bot, armorManager, 'mineflayer-armor-manager')
      loadPluginSafely(bot, collectBlockModule.plugin || collectBlockModule, 'mineflayer-collectblock')
      loadPluginSafely(bot, bloodhound.plugin || bloodhound, 'mineflayer-bloodhound')
      loadPluginSafely(bot, webInventory, 'mineflayer-web-inventory')
    } catch (error) {
      logMessage('ERROR', `Failed to load plugins: ${error.message}`)
      sendBotLogMessage('🚨 Plugin Load Error', `Failed to load plugins: ${error.message}`)
    }
    
    // Bot events
    bot.once('spawn', () => {
      logMessage('SUCCESS', '🔥 Bot spawned successfully!')
      sendBotLogMessage('✅ Bot Spawned', 'Bot has successfully spawned on the server', '#00ff00')
      
      if (discordChannel) {
        discordChannel.send('✅ Bot has joined the Minecraft server!')
      }
    })
    
    bot.on('chat', (username, message) => {
      if (username === bot.username) return
      
      logMessage('CHAT', `<${username}> ${message}`)
      
      // Bridge to Discord
      if (discordChannel && discordConfig.discord.features.chatBridge) {
        discordChannel.send(`**${username}**: ${message}`).catch(err => {
          handleDiscordError(err, 'bridging chat to Discord')
        })
      }
    })
    
    bot.on('error', (err) => {
      logMessage('ERROR', `Bot error: ${err.message}`)
      sendBotLogMessage('🚨 Bot Error', `Bot encountered an error: ${err.message}`)
      
      // Attempt to reconnect after 5 seconds
      setTimeout(() => {
        logMessage('INFO', 'Attempting to reconnect...')
        createBot()
      }, 5000)
    })
    
    bot.on('end', () => {
      logMessage('WARNING', 'Bot disconnected')
      sendBotLogMessage('⚠️ Bot Disconnected', 'Bot has been disconnected from the server', '#ffaa00')
      
      // Attempt to reconnect after 5 seconds
      setTimeout(() => {
        logMessage('INFO', 'Attempting to reconnect...')
        createBot()
      }, 5000)
    })
    
  } catch (error) {
    logMessage('ERROR', `Failed to create bot: ${error.message}`)
    sendBotLogMessage('🚨 Bot Creation Error', `Failed to create bot: ${error.message}`)
  }
}

// Start the bot
createBot()

// Graceful shutdown
process.on('SIGINT', () => {
  logMessage('INFO', 'Shutting down bot...')
  sendBotLogMessage('🔴 Bot Shutting Down', 'Bot is shutting down gracefully', '#ff6600')
  
  if (bot) {
    bot.quit()
  }
  
  if (discordBot) {
    discordBot.destroy()
  }
  
  process.exit(0)
})

logMessage('ANARCHY', '🔥 Enhanced Iron-Anarchy Bot with Advanced Discord Integration starting...')
