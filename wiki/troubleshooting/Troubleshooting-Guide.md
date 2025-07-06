# 🔧 Troubleshooting Guide

## 🚨 Common Issues & Solutions

### 🔌 Plugin Loading Errors

#### ❌ "Plugin is not a function" Error

```
Error: Plugin mineflayer-pvp is not a function
```

**Causes:**

- Plugin version incompatibility
- Incorrect import statement
- Module export structure mismatch

**Solutions:**

```bash
# 1. Update plugin to latest version
npm update mineflayer-pvp

# 2. Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# 3. Check plugin import in code
const pvpPlugin = require('mineflayer-pvp').plugin || require('mineflayer-pvp')
```

#### ❌ Plugin Validation Failed

```
Failed to load mineflayer-auto-eat: Expected loader function
```

**Solutions:**

```javascript
// Correct plugin loading
const autoEat = require('mineflayer-auto-eat').loader || require('mineflayer-auto-eat')

// Validate before loading
if (typeof autoEat !== 'function') {
  throw new Error('Auto-eat plugin could not be loaded')
}
```

### 🌐 Connection Issues

#### ❌ Cannot Connect to Server

```
Error: Failed to connect to server
```

**Diagnostic Steps:**

1. **Check server status**

   ```bash
   ping minecraft.server.com
   telnet minecraft.server.com 25565
   ```

2. **Verify configuration**

   ```javascript
   const config = {
     host: 'correct.server.address',  // ✅ Correct format
     port: 25565,                     // ✅ Correct port
     version: '1.19.2',              // ✅ Match server version
     auth: 'offline'                  // ✅ or 'microsoft'
   }
   ```

3. **Check firewall**

   ```bash
   # Allow Minecraft traffic
   sudo ufw allow 25565
   ```

#### ❌ Frequent Disconnections

```
Bot keeps disconnecting every few minutes
```

**Solutions:**

1. **Enable auto-reconnect**

   ```javascript
   bot.on('end', () => {
     console.log('Reconnecting...')
     setTimeout(createBot, 5000)
   })
   ```

2. **Implement anti-AFK**

   ```javascript
   setInterval(() => {
     bot.look(Math.random() * Math.PI * 2, 0)
   }, 30000)
   ```

3. **Check server settings**
   - Increase player timeout
   - Disable strict anti-cheat

### 🤖 Bot Behavior Issues

#### ❌ Bot Gets Stuck During Pathfinding

```
Bot stops moving and doesn't reach destination
```

**Solutions:**

1. **Reset pathfinding**

   ```javascript
   bot.pathfinder.setGoal(null)
   bot.pathfinder.setGoal(new goals.GoalNear(x, y, z, 1))
   ```

2. **Adjust movement settings**

   ```javascript
   const movements = new Movements(bot)
   movements.allowFreeMotion = true
   movements.allowParkour = true
   movements.canDig = true
   bot.pathfinder.setMovements(movements)
   ```

3. **Check for obstacles**

   ```javascript
   // Debug pathfinding
   bot.on('goal_reached', () => console.log('Goal reached!'))
   bot.on('path_update', (r) => console.log('Path update:', r.status))
   ```

#### ❌ Bot Not Responding to Commands

```
Commands sent but bot doesn't react
```

**Diagnostic Steps:**

1. **Check chat event handler**

   ```javascript
   bot.on('chat', (username, message) => {
     console.log(`Received: ${username}: ${message}`)
     // Ensure this logs when you type
   })
   ```

2. **Verify command parsing**

   ```javascript
   if (message.startsWith('!')) {
     const command = message.slice(1)
     console.log(`Processing command: ${command}`)
     handleCommand(username, command)
   }
   ```

3. **Check permissions**

   ```javascript
   // Add user validation if needed
   const allowedUsers = ['YourUsername']
   if (!allowedUsers.includes(username)) return
   ```

### 💥 Combat & PvP Issues

#### ❌ Bot Won't Attack Targets

```
!attack command issued but bot doesn't engage
```

**Solutions:**

1. **Check PvP plugin status**

   ```javascript
   console.log('PvP plugin loaded:', bot.pvp ? '✅' : '❌')
   ```

2. **Verify target exists**

   ```javascript
   function attackPlayer(targetName) {
     const target = bot.players[targetName]
     if (!target || !target.entity) {
       bot.chat(`❌ Cannot find player: ${targetName}`)
       return
     }
     console.log('Attacking:', target.entity.position)
     bot.pvp.attack(target.entity)
   }
   ```

3. **Check distance**

   ```javascript
   const distance = target.entity.position.distanceTo(bot.entity.position)
   if (distance > 10) {
     bot.chat('🏃 Moving closer to target...')
     // Move closer first
   }
   ```

#### ❌ Auto-Eat Not Working

```
Bot starves despite having food
```

**Solutions:**

1. **Check auto-eat configuration**

   ```javascript
   bot.autoEat.options = {
     priority: 'foodPoints',
     startAt: 14,               // Lower = eat sooner
     bannedFood: []             // Remove food restrictions
   }
   ```

2. **Verify food in inventory**

   ```javascript
   const food = bot.inventory.items().filter(item => item.foodPoints > 0)
   console.log('Available food:', food.map(f => f.name))
   ```

3. **Manual eating test**

   ```javascript
   // Test eating manually
   const bread = bot.inventory.findInventoryItem('bread')
   if (bread) {
     bot.equip(bread, 'hand')
     bot.consume()
   }
   ```

### 📱 Discord Integration Issues

#### ❌ Discord Bot Not Responding

```
Discord commands not working
```

**Solutions:**

1. **Check bot token**

   ```javascript
   // Verify token is valid
   console.log('Token valid:', token.startsWith('MTA') || token.startsWith('ODc'))
   ```

2. **Verify permissions**

   ```javascript
   // Bot needs these permissions:
   // - Read Messages
   // - Send Messages  
   // - Embed Links
   // - Read Message History
   ```

3. **Check channel ID**

   ```javascript
   const channel = discordBot.channels.cache.get(channelId)
   if (!channel) {
     console.log('❌ Invalid channel ID')
   }
   ```

#### ❌ Chat Bridge Not Working

```
Messages not syncing between Discord and Minecraft
```

**Solutions:**

1. **Enable chat bridge**

   ```javascript
   const config = {
     discord: {
       features: {
         chatBridge: true  // ✅ Ensure this is enabled
       }
     }
   }
   ```

2. **Check message handlers**

   ```javascript
   // Discord → Minecraft
   discordBot.on('messageCreate', (message) => {
     if (message.author.bot) return
     bot.chat(`[Discord] <${message.author.username}> ${message.content}`)
   })
   
   // Minecraft → Discord
   bot.on('chat', (username, message) => {
     if (username === bot.username) return
     discordChannel.send(`**${username}**: ${message}`)
   })
   ```

### 🖥️ Web Interface Issues

#### ❌ Web Inventory Not Loading

```
Cannot access http://localhost:3000
```

**Solutions:**

1. **Check if service started**

   ```javascript
   bot.webInventory.start(3000)
   console.log('Web inventory: http://localhost:3000')
   ```

2. **Port conflicts**

   ```bash
   # Check if port is in use
   lsof -i :3000
   
   # Use different port
   bot.webInventory.start(3001)
   ```

3. **Firewall issues**

   ```bash
   # Allow port through firewall
   sudo ufw allow 3000
   ```

## 🔍 Debugging Tools

### 📊 Enable Debug Logging

```javascript
// Comprehensive debug mode
const DEBUG = true

function debugLog(category, message) {
  if (DEBUG) {
    console.log(`[DEBUG:${category}] ${message}`)
  }
}

// Use throughout code
debugLog('PATHFINDING', `Moving to ${x}, ${y}, ${z}`)
debugLog('COMBAT', `Attacking ${target.username}`)
debugLog('COMMANDS', `Processing: ${command}`)
```

### 🔬 Plugin Status Checker

```javascript
function checkAllPlugins() {
  const plugins = {
    'Pathfinder': bot.pathfinder,
    'PvP': bot.pvp,
    'Auto-eat': bot.autoEat,
    'Armor Manager': bot.armorManager,
    'Collect Block': bot.collectBlock,
    'Bloodhound': bot.bloodhound,
    'Web Inventory': bot.webInventory
  }
  
  console.log('🔌 Plugin Status:')
  Object.entries(plugins).forEach(([name, plugin]) => {
    console.log(`${name}: ${plugin ? '✅' : '❌'}`)
  })
}

// Run periodically
setInterval(checkAllPlugins, 60000)
```

### 📈 Performance Monitor

```javascript
function monitorPerformance() {
  const used = process.memoryUsage()
  console.log('🔧 Performance Stats:')
  console.log(`Memory: ${Math.round(used.heapUsed / 1024 / 1024)} MB`)
  console.log(`Health: ${bot.health}/20`)
  console.log(`Food: ${bot.food}/20`)
  console.log(`Position: ${Math.floor(bot.entity.position.x)}, ${Math.floor(bot.entity.position.y)}, ${Math.floor(bot.entity.position.z)}`)
  console.log(`Players: ${Object.keys(bot.players).length}`)
}

setInterval(monitorPerformance, 30000)
```

### 🎯 Command Debugger

```javascript
bot.on('chat', (username, message) => {
  console.log(`[CHAT] ${username}: ${message}`)
  
  if (message.startsWith('!')) {
    const command = message.slice(1)
    console.log(`[COMMAND] Processing: ${command}`)
    console.log(`[COMMAND] From user: ${username}`)
    console.log(`[COMMAND] Bot position: ${bot.entity.position}`)
    
    try {
      handleCommand(username, command)
    } catch (error) {
      console.error(`[COMMAND] Error: ${error.message}`)
      bot.chat(`❌ Command error: ${error.message}`)
    }
  }
})
```

## 🆘 Emergency Recovery

### 🔄 Bot Reset Commands

```javascript
// Emergency stop all actions
function emergencyStop() {
  bot.pathfinder.setGoal(null)
  if (bot.pvp && bot.pvp.stop) bot.pvp.stop()
  bot.clearControlStates()
  bot.chat('🚨 Emergency stop executed')
}

// Reset to safe state
function resetToSafeState() {
  emergencyStop()
  
  // Clear all intervals
  if (guardInterval) clearInterval(guardInterval)
  if (killAuraInterval) clearInterval(killAuraInterval)
  
  // Reset variables
  isGuarding = false
  following = null
  autoKillAura = false
  
  bot.chat('🔄 Bot reset to safe state')
}

// Add emergency commands
bot.on('chat', (username, message) => {
  if (message === '!emergency') {
    emergencyStop()
  }
  if (message === '!reset') {
    resetToSafeState()
  }
})
```

### 📞 Support Information

When reporting issues, include:

1. **Error Message** - Full error text
2. **Configuration** - Server settings and bot config
3. **Steps to Reproduce** - What led to the issue
4. **Environment** - Node.js version, OS, etc.
5. **Logs** - Recent log entries around the issue

**Log Collection:**

```bash
# Collect recent logs
tail -100 logs/bot_$(date +%Y-%m-%d).log

# Check system resources
free -h
df -h
ps aux | grep node
```

This troubleshooting guide should help users diagnose and resolve most common issues they might encounter!

---

[🏠 Back to Home](Home.md)
