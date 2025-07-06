const mineflayer = require('mineflayer')
const webInventory = require('mineflayer-web-inventory')
const express = require('express')

// Create a simple test bot that doesn't need to connect to a server
const bot = mineflayer.createBot({
  host: 'localhost', // Local host for testing
  port: 25565,
  username: 'TestBot',
  version: '1.21.4',
  auth: 'offline'
})

// Load web inventory plugin
bot.loadPlugin(webInventory)

console.log('🚀 Starting web inventory test server...')

// Start web inventory on port 3001
bot.webInventory.start(3001)
console.log('✅ Web inventory started on http://localhost:3001')

// Create a simple Express server for dashboard simulation
const app = express()

app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Minecraft Bot Dashboard</title>
        <style>
          body { 
            font-family: Arial, sans-serif; 
            margin: 40px; 
            background: #1a1a1a; 
            color: #fff; 
          }
          .container { 
            max-width: 800px; 
            margin: 0 auto; 
          }
          .status-box { 
            background: #2d2d2d; 
            padding: 20px; 
            border-radius: 8px; 
            margin: 20px 0; 
          }
          .online { color: #4CAF50; }
          .offline { color: #f44336; }
          .warning { color: #ff9800; }
          .inventory-grid {
            display: grid;
            grid-template-columns: repeat(9, 40px);
            gap: 2px;
            margin: 20px 0;
          }
          .slot {
            width: 40px;
            height: 40px;
            background: #333;
            border: 2px solid #555;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
          }
          .has-item {
            background: #4CAF50;
            border-color: #66BB6A;
          }
          button {
            background: #2196F3;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 4px;
            cursor: pointer;
            margin: 5px;
          }
          button:hover {
            background: #1976D2;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>🤖 Minecraft Bot Dashboard</h1>
          
          <div class="status-box">
            <h2>Bot Status</h2>
            <p>Connection: <span class="warning">Connecting...</span></p>
            <p>Health: <span class="online">20/20 ❤️</span></p>
            <p>Food: <span class="online">20/20 🍗</span></p>
            <p>Position: X: 0, Y: 64, Z: 0</p>
          </div>

          <div class="status-box">
            <h2>Inventory</h2>
            <div class="inventory-grid">
              ${Array.from({length: 36}, (_, i) => 
                `<div class="slot ${i < 5 ? 'has-item' : ''}">${i < 5 ? i+1 : ''}</div>`
              ).join('')}
            </div>
          </div>

          <div class="status-box">
            <h2>Actions</h2>
            <button onclick="alert('Move command sent!')">Move to spawn</button>
            <button onclick="alert('Equip command sent!')">Equip armor</button>
            <button onclick="alert('Drop command sent!')">Drop items</button>
            <button onclick="alert('Eat command sent!')">Eat food</button>
          </div>

          <div class="status-box">
            <h2>Web Services</h2>
            <p>Web Inventory: <span class="online">Running on port 3001</span></p>
            <p>Dashboard: <span class="online">Running on port 8081</span></p>
            <p><a href="http://localhost:3001" target="_blank">Open Web Inventory →</a></p>
          </div>
        </div>
      </body>
    </html>
  `)
})

app.listen(8081, () => {
  console.log('✅ Dashboard started on http://localhost:8081')
})

// Handle connection events
bot.on('login', () => {
  console.log('✅ Bot connected successfully!')
})

bot.on('error', (err) => {
  console.log('⚠️ Connection error (expected for demo):', err.message)
})

// Keep the server running
setInterval(() => {
  console.log('📊 Dashboard services running - Web Inventory: 3001, Dashboard: 8081')
}, 30000)
