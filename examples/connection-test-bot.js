const mineflayer = require('mineflayer')
const config = require('./config.json')

console.log('🔥 Iron-Anarchy Connection Test Starting...')

const bot = mineflayer.createBot({
  host: config.server.host,
  port: config.server.port,
  username: config.bot.username,
  version: config.server.version,
  auth: config.bot.auth
})

console.log(`Connecting to ${config.server.host}:${config.server.port} with username: ${config.bot.username}`)
console.log(`Auth mode: ${config.bot.auth}`)

bot.on('connect', () => {
  console.log('✅ Connected to Iron-Anarchy server!')
})

bot.on('spawn', () => {
  console.log('🎮 Bot spawned successfully!')
  console.log(`Position: ${bot.entity.position}`)
  console.log(`Health: ${bot.health}`)
  console.log(`Food: ${bot.food}`)
  
  // Send a message to confirm connection
  setTimeout(() => {
    bot.chat('🔥 Connection test bot online!')
  }, 2000)
})

bot.on('health', () => {
  console.log(`Health: ${bot.health}/20, Food: ${bot.food}/20`)
})

bot.on('chat', (username, message) => {
  if (username === bot.username) return
  console.log(`<${username}> ${message}`)
})

bot.on('kicked', (reason) => {
  console.log('❌ KICKED:', reason)
})

bot.on('error', (err) => {
  console.log('❌ ERROR:', err.message)
})

bot.on('end', () => {
  console.log('❌ CONNECTION ENDED')
})

// Keep alive ping monitoring
setInterval(() => {
  if (bot.player) {
    console.log(`🏓 Ping: ${bot.player.ping}ms | Players online: ${Object.keys(bot.players).length}`)
  }
}, 30000) // Every 30 seconds

console.log('Bot configured, attempting connection...')
