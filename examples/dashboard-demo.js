const express = require('express')
const http = require('http')
const socketIo = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketIo(server)

// Simulated bot data
let botData = {
  connected: false,
  health: 20,
  food: 18,
  position: { x: 125, y: 64, z: -89 },
  inventory: [
    { slot: 0, name: 'diamond_sword', count: 1 },
    { slot: 1, name: 'cooked_beef', count: 32 },
    { slot: 2, name: 'diamond_pickaxe', count: 1 },
    { slot: 3, name: 'oak_planks', count: 64 },
    { slot: 4, name: 'torch', count: 45 }
  ],
  armor: [
    { slot: 'helmet', name: 'diamond_helmet' },
    { slot: 'chestplate', name: 'diamond_chestplate' },
    { slot: 'leggings', name: 'diamond_leggings' },
    { slot: 'boots', name: 'diamond_boots' }
  ]
}

// Simulate bot connecting after a delay
setTimeout(() => {
  botData.connected = true
  console.log('✅ Bot simulation connected!')
}, 3000)

// Main dashboard route
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Minecraft Bot Dashboard</title>
        <script src="/socket.io/socket.io.js"></script>
        <style>
          body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            margin: 0; 
            padding: 20px; 
            background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%); 
            color: #fff; 
            min-height: 100vh;
          }
          .container { 
            max-width: 1200px; 
            margin: 0 auto; 
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
          }
          .status-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
          }
          .status-box { 
            background: rgba(255,255,255,0.1); 
            padding: 25px; 
            border-radius: 15px; 
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.2);
            box-shadow: 0 8px 32px rgba(0,0,0,0.3);
          }
          .status-indicator {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            display: inline-block;
            margin-right: 8px;
          }
          .online { background: #4CAF50; }
          .offline { background: #f44336; }
          .connecting { background: #ff9800; animation: pulse 1s infinite; }
          
          @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.5; }
            100% { opacity: 1; }
          }
          
          .health-bar, .food-bar {
            width: 100%;
            height: 20px;
            background: rgba(0,0,0,0.3);
            border-radius: 10px;
            overflow: hidden;
            margin: 10px 0;
          }
          .health-fill {
            height: 100%;
            background: linear-gradient(90deg, #e74c3c, #e74c3c);
            transition: width 0.3s ease;
          }
          .food-fill {
            height: 100%;
            background: linear-gradient(90deg, #f39c12, #e67e22);
            transition: width 0.3s ease;
          }
          
          .inventory-grid {
            display: grid;
            grid-template-columns: repeat(9, 1fr);
            gap: 5px;
            margin: 20px 0;
          }
          .inventory-slot {
            aspect-ratio: 1;
            background: rgba(0,0,0,0.3);
            border: 2px solid rgba(255,255,255,0.2);
            border-radius: 8px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-size: 10px;
            text-align: center;
            position: relative;
            cursor: pointer;
            transition: all 0.2s ease;
          }
          .inventory-slot:hover {
            background: rgba(255,255,255,0.1);
            transform: scale(1.05);
          }
          .inventory-slot.has-item {
            background: rgba(76, 175, 80, 0.3);
            border-color: #4CAF50;
          }
          .item-count {
            position: absolute;
            bottom: 2px;
            right: 2px;
            font-size: 8px;
            background: rgba(0,0,0,0.7);
            padding: 1px 3px;
            border-radius: 3px;
          }
          
          .action-buttons {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 10px;
            margin: 20px 0;
          }
          button {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 14px;
            transition: all 0.2s ease;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
          }
          button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0,0,0,0.3);
          }
          button:active {
            transform: translateY(0);
          }
          
          .live-indicator {
            animation: pulse 2s infinite;
          }
          
          .armor-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 10px;
            margin: 15px 0;
          }
          .armor-slot {
            aspect-ratio: 1;
            background: rgba(0,0,0,0.3);
            border: 2px solid rgba(255,255,255,0.2);
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 10px;
            text-align: center;
          }
          .armor-slot.equipped {
            background: rgba(156, 39, 176, 0.3);
            border-color: #9C27B0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🤖 Minecraft Bot Dashboard</h1>
            <p class="live-indicator">● LIVE</p>
          </div>
          
          <div class="status-grid">
            <div class="status-box">
              <h3>🔌 Connection Status</h3>
              <p><span id="connection-status" class="status-indicator connecting"></span><span id="connection-text">Connecting...</span></p>
              <p><strong>Server:</strong> ironanarchy.lol:25565</p>
              <p><strong>Bot:</strong> PvPBot</p>
            </div>
            
            <div class="status-box">
              <h3>❤️ Health & Food</h3>
              <div>
                <label>Health: <span id="health-value">20</span>/20</label>
                <div class="health-bar">
                  <div id="health-fill" class="health-fill" style="width: 100%"></div>
                </div>
              </div>
              <div>
                <label>Food: <span id="food-value">18</span>/20</label>
                <div class="food-bar">
                  <div id="food-fill" class="food-fill" style="width: 90%"></div>
                </div>
              </div>
            </div>
            
            <div class="status-box">
              <h3>📍 Position</h3>
              <p><strong>X:</strong> <span id="pos-x">125</span></p>
              <p><strong>Y:</strong> <span id="pos-y">64</span></p>
              <p><strong>Z:</strong> <span id="pos-z">-89</span></p>
            </div>
          </div>
          
          <div class="status-box">
            <h3>🎒 Inventory</h3>
            <div class="inventory-grid" id="inventory-grid">
              ${Array.from({length: 36}, (_, i) => `
                <div class="inventory-slot" data-slot="${i}" onclick="interactWithSlot(${i})">
                  <div class="slot-content" id="slot-${i}"></div>
                </div>
              `).join('')}
            </div>
          </div>
          
          <div class="status-box">
            <h3>🛡️ Armor</h3>
            <div class="armor-grid">
              <div class="armor-slot equipped" title="Helmet">⛑️</div>
              <div class="armor-slot equipped" title="Chestplate">🦺</div>
              <div class="armor-slot equipped" title="Leggings">👖</div>
              <div class="armor-slot equipped" title="Boots">👢</div>
            </div>
          </div>
          
          <div class="status-box">
            <h3>🎮 Actions</h3>
            <div class="action-buttons">
              <button onclick="sendCommand('move-spawn')">🏠 Move to Spawn</button>
              <button onclick="sendCommand('equip-armor')">🛡️ Equip Best Armor</button>
              <button onclick="sendCommand('drop-items')">📦 Drop Excess Items</button>
              <button onclick="sendCommand('eat-food')">🍖 Eat Food</button>
              <button onclick="sendCommand('follow-player')">🚶 Follow Player</button>
              <button onclick="sendCommand('attack-nearest')">⚔️ Attack Nearest Enemy</button>
            </div>
          </div>
        </div>
        
        <script>
          const socket = io();
          
          socket.on('botUpdate', function(data) {
            updateDashboard(data);
          });
          
          function updateDashboard(data) {
            // Update connection status
            const statusEl = document.getElementById('connection-status');
            const textEl = document.getElementById('connection-text');
            if (data.connected) {
              statusEl.className = 'status-indicator online';
              textEl.textContent = 'Connected';
            } else {
              statusEl.className = 'status-indicator connecting';
              textEl.textContent = 'Connecting...';
            }
            
            // Update health and food
            document.getElementById('health-value').textContent = data.health;
            document.getElementById('health-fill').style.width = (data.health / 20) * 100 + '%';
            document.getElementById('food-value').textContent = data.food;
            document.getElementById('food-fill').style.width = (data.food / 20) * 100 + '%';
            
            // Update position
            document.getElementById('pos-x').textContent = data.position.x;
            document.getElementById('pos-y').textContent = data.position.y;
            document.getElementById('pos-z').textContent = data.position.z;
            
            // Update inventory
            data.inventory.forEach(item => {
              const slotEl = document.getElementById('slot-' + item.slot);
              if (slotEl) {
                slotEl.innerHTML = item.name.replace('_', ' ') + (item.count > 1 ? '<div class="item-count">' + item.count + '</div>' : '');
                slotEl.parentElement.classList.add('has-item');
              }
            });
          }
          
          function sendCommand(command) {
            socket.emit('command', command);
            showNotification('Command sent: ' + command);
          }
          
          function interactWithSlot(slot) {
            socket.emit('slotInteraction', slot);
            showNotification('Interacted with slot ' + slot);
          }
          
          function showNotification(message) {
            // Create temporary notification
            const notification = document.createElement('div');
            notification.style.cssText = 'position: fixed; top: 20px; right: 20px; background: rgba(76, 175, 80, 0.9); color: white; padding: 10px 20px; border-radius: 5px; z-index: 1000;';
            notification.textContent = message;
            document.body.appendChild(notification);
            setTimeout(() => document.body.removeChild(notification), 3000);
          }
          
          // Request initial data
          socket.emit('requestUpdate');
        </script>
      </body>
    </html>
  `)
})

// Web inventory simulation route
app.get('/inventory', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Web Inventory Viewer</title>
        <style>
          body { 
            font-family: 'Minecraft', monospace; 
            background: #383838; 
            color: #fff; 
            margin: 0; 
            padding: 20px; 
          }
          .inventory-container {
            max-width: 600px;
            margin: 0 auto;
            background: #2d2d2d;
            border: 3px solid #555;
            border-radius: 10px;
            padding: 20px;
          }
          .inventory-title {
            text-align: center;
            font-size: 24px;
            margin-bottom: 20px;
            color: #ffff55;
          }
          .inventory-grid {
            display: grid;
            grid-template-columns: repeat(9, 50px);
            gap: 3px;
            justify-content: center;
          }
          .inventory-slot {
            width: 50px;
            height: 50px;
            background: #1a1a1a;
            border: 2px solid #333;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            cursor: pointer;
            position: relative;
            transition: all 0.2s ease;
          }
          .inventory-slot:hover {
            border-color: #fff;
            background: #2a2a2a;
          }
          .inventory-slot.has-item {
            background: #3a3a3a;
            border-color: #ffff55;
          }
          .item-icon {
            font-size: 20px;
          }
          .item-count {
            position: absolute;
            bottom: 2px;
            right: 2px;
            font-size: 8px;
            background: rgba(0,0,0,0.8);
            padding: 1px 3px;
            border-radius: 2px;
          }
          .action-bar {
            margin-top: 20px;
            text-align: center;
          }
          .action-button {
            background: #4CAF50;
            color: white;
            border: none;
            padding: 8px 16px;
            margin: 5px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 12px;
          }
          .action-button:hover {
            background: #45a049;
          }
        </style>
      </head>
      <body>
        <div class="inventory-container">
          <div class="inventory-title">Bot Inventory</div>
          <div class="inventory-grid">
            ${Array.from({length: 36}, (_, i) => {
              const hasItem = i < 5;
              const icons = ['⚔️', '🥩', '⛏️', '🟫', '🕯️'];
              const counts = [1, 32, 1, 64, 45];
              return `
                <div class="inventory-slot ${hasItem ? 'has-item' : ''}" onclick="interactItem(${i})">
                  ${hasItem ? `
                    <span class="item-icon">${icons[i]}</span>
                    ${counts[i] > 1 ? `<span class="item-count">${counts[i]}</span>` : ''}
                  ` : ''}
                </div>
              `;
            }).join('')}
          </div>
          <div class="action-bar">
            <button class="action-button" onclick="dropItem()">Drop Selected</button>
            <button class="action-button" onclick="equipItem()">Equip</button>
            <button class="action-button" onclick="useItem()">Use Item</button>
            <button class="action-button" onclick="sortInventory()">Sort Inventory</button>
          </div>
        </div>
        
        <script>
          let selectedSlot = null;
          
          function interactItem(slot) {
            if (selectedSlot !== null) {
              document.querySelectorAll('.inventory-slot')[selectedSlot].style.border = '2px solid #333';
            }
            selectedSlot = slot;
            document.querySelectorAll('.inventory-slot')[slot].style.border = '2px solid #ff0000';
            console.log('Selected slot:', slot);
          }
          
          function dropItem() {
            if (selectedSlot !== null) {
              alert('Dropped item from slot ' + selectedSlot);
            } else {
              alert('No item selected');
            }
          }
          
          function equipItem() {
            if (selectedSlot !== null) {
              alert('Equipped item from slot ' + selectedSlot);
            } else {
              alert('No item selected');
            }
          }
          
          function useItem() {
            if (selectedSlot !== null) {
              alert('Used item from slot ' + selectedSlot);
            } else {
              alert('No item selected');
            }
          }
          
          function sortInventory() {
            alert('Inventory sorted!');
          }
        </script>
      </body>
    </html>
  `)
})

// Socket.IO handling
io.on('connection', (socket) => {
  console.log('📱 Client connected to dashboard')
  
  socket.on('requestUpdate', () => {
    socket.emit('botUpdate', botData)
  })
  
  socket.on('command', (command) => {
    console.log('🎮 Command received:', command)
    // Simulate command effects
    if (command === 'eat-food' && botData.food < 20) {
      botData.food = Math.min(20, botData.food + 2)
    }
    if (command === 'move-spawn') {
      botData.position = { x: 0, y: 64, z: 0 }
    }
    socket.emit('botUpdate', botData)
  })
  
  socket.on('slotInteraction', (slot) => {
    console.log('🎒 Slot interaction:', slot)
  })
  
  socket.on('disconnect', () => {
    console.log('📱 Client disconnected')
  })
})

// Simulate live updates
setInterval(() => {
  // Simulate position changes
  botData.position.x += Math.floor(Math.random() * 3) - 1
  botData.position.z += Math.floor(Math.random() * 3) - 1
  
  // Simulate health/food changes
  if (Math.random() > 0.8) {
    botData.health = Math.max(1, botData.health - 1)
  }
  if (Math.random() > 0.9) {
    botData.food = Math.max(0, botData.food - 1)
  }
  
  io.emit('botUpdate', botData)
}, 5000)

server.listen(8081, () => {
  console.log('✅ Dashboard demo running on http://localhost:8081')
  console.log('✅ Web inventory demo running on http://localhost:8081/inventory')
})

// Simulate web inventory server
const inventoryApp = express()
inventoryApp.get('/', (req, res) => {
  res.redirect('/inventory')
})
inventoryApp.get('/inventory', (req, res) => {
  res.redirect('http://localhost:8081/inventory')
})

inventoryApp.listen(3001, () => {
  console.log('✅ Web inventory simulation running on http://localhost:3001')
})
