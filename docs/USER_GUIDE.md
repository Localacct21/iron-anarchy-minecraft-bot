# 🎮 Minecraft Bot User Guide

## Table of Contents

1. [Overview](#overview)
2. [Bot Commands](#bot-commands)
3. [In-Game Interactions](#in-game-interactions)
4. [Features](#features)
5. [Discord Integration](#discord-integration)
6. [Scheduling & Automation](#scheduling--automation)
7. [Anti-AFK & Auto-Reconnect](#anti-afk--auto-reconnect)
8. [Pathfinding & Movement](#pathfinding--movement)
9. [Configuration](#configuration)
10. [Troubleshooting](#troubleshooting)

---

## Overview

This Minecraft bot is a comprehensive automation tool built with **mineflayer** that provides advanced PvP capabilities, pathfinding, auto-eating, inventory management, Discord integration, and much more. The bot supports multiple variants optimized for different use cases.

### Available Bot Types

- **Basic Bot** (`bot.js`) - Essential features with PvP and pathfinding
- **Advanced Bot** (`advanced-bot.js`) - Enhanced features with logging and auto-reconnect
- **Enhanced Iron-Anarchy Bot** (`enhanced-ironanarchy-bot.js`) - Full-featured with Discord and recording
- **Discord Bot** (`enhanced-discord-bot.js`) - Discord-focused with chat bridging

---

## Bot Commands

All commands are prefixed with `!` and can be typed in Minecraft chat.

### 🎯 Movement & Navigation Commands

| Command | Description | Usage Example |
|---------|-------------|---------------|
| `!come` | Makes the bot come to you | `!come` |
| `!follow [player]` | Follow a specific player (or you if no player specified) | `!follow Steve` |
| `!stop` | Stop all current actions | `!stop` |
| `!pos` | Show bot's current position | `!pos` |

**Example Usage:**

```
<Player> !come
<Bot> 🏃 Coming to Player
<Player> !follow
<Bot> 🏃 Following Player
<Player> !stop
<Bot> 🛑 Stopped all actions
```

### ⚔️ Combat & PvP Commands

| Command | Description | Usage Example |
|---------|-------------|---------------|
| `!attack <player>` | Attack a specific player | `!attack Griefer123` |
| `!guard` | Toggle guard mode (attacks hostile mobs) | `!guard` |
| `!pvp` | Show PvP status | `!pvp` |

**Example Usage:**

```
<Player> !attack Griefer123
<Bot> ⚔️ Attacking Griefer123!
<Player> !guard
<Bot> 🛡️ Guard mode enabled - will attack hostile mobs nearby
<Player> !guard
<Bot> 🛡️ Guard mode disabled
```

### 🎒 Inventory & Items Commands

| Command | Description | Usage Example |
|---------|-------------|---------------|
| `!inv` | Show inventory contents | `!inv` |
| `!collect <block> [amount]` | Collect specific blocks | `!collect cobblestone 64` |
| `!health` | Show health and food status | `!health` |

**Example Usage:**

```
<Player> !inv
<Bot> 🎒 Inventory: 32x cobblestone, 16x dirt, 8x bread, 1x iron_sword...
<Player> !health
<Bot> ❤️ Health: 18/20 [█████████░]
<Bot> 🍖 Food: 14/20 [███████░░░]
<Player> !collect oak_log 10
<Bot> ⛏️ Collecting 8x oak_log
<Bot> ✅ Finished collecting 8x oak_log
```

### 📊 Information Commands

| Command | Description | Usage Example |
|---------|-------------|---------------|
| `!status` | Show comprehensive bot status | `!status` |
| `!players` | List online players | `!players` |
| `!plugins` | Show loaded plugins status | `!plugins` |
| `!help` | Display available commands | `!help` |

**Example Usage:**

```
<Player> !status
<Bot> 📊 Status: Following Player
<Bot> 📍 Position: X=123, Y=64, Z=-456
<Bot> 👥 Players online: 5
<Player> !plugins
<Bot> 🔌 All plugins loaded and validated!
```

---

## In-Game Interactions

### 🤖 Automatic Behaviors

#### Auto-Eating

- Automatically eats food when hunger drops below configured threshold (default: 14/20)
- Prioritizes food based on configuration (foodPoints, saturation, etc.)
- Supports banned food lists

#### Auto-Combat

- Automatically attacks hostile players within range
- Guards against hostile mobs when guard mode is enabled
- Responds to being attacked

#### Auto-Equipment

- Automatically equips better armor when found
- Manages armor durability
- Optimizes equipment based on situation

### 🎯 Smart Pathfinding

- Uses A* pathfinding algorithm for optimal routes
- Handles complex terrain navigation
- Supports parkour movements
- Can dig through blocks when necessary
- Avoids lava and dangerous areas

---

## Features

### 🔧 Core Features

#### Plugin System

The bot uses multiple validated plugins:

- **mineflayer-pathfinder** - Advanced pathfinding and movement
- **mineflayer-pvp** - Combat mechanics and target tracking
- **mineflayer-auto-eat** - Automatic food consumption
- **mineflayer-armor-manager** - Equipment optimization
- **mineflayer-collectblock** - Resource gathering
- **mineflayer-bloodhound** - Entity tracking
- **mineflayer-web-inventory** - Web-based inventory viewer

#### Logging System

- Comprehensive event logging with timestamps
- Color-coded console output
- File-based log storage
- Different log levels (INFO, CHAT, PVP, COMMAND, ERROR, SUCCESS)

#### Recording System

- Records all bot activities and events
- JSON-formatted session data
- Includes position, health, and interaction data
- Automatic session saving

### 🌐 Web Interfaces

#### Web Inventory

Access the bot's inventory through a web browser:

```
http://localhost:3000
```

#### Dashboard (if available)

Real-time bot monitoring dashboard:

```
http://localhost:8081
```

---

## Discord Integration

### 🤖 Discord Bot Setup

The enhanced bot includes full Discord integration with:

#### Features

- **Chat Bridging** - Messages sync between Minecraft and Discord
- **Status Updates** - Real-time bot status in Discord
- **Command Execution** - Control bot from Discord
- **Rich Embeds** - Formatted status messages

#### Discord Commands

| Command | Description | Usage |
|---------|-------------|-------|
| `!status` | Get bot status embed | `!status` |
| `!say <message>` | Send message to Minecraft | `!say Hello world!` |
| `!help` | Show Discord commands | `!help` |

#### Configuration

Set up Discord integration by configuring:

```json
{
  "discord": {
    "enabled": true,
    "token": "YOUR_BOT_TOKEN",
    "channelId": "YOUR_CHANNEL_ID",
    "prefix": "!",
    "features": {
      "chatBridge": true,
      "statusUpdates": true
    }
  }
}
```

### 📹 Recording Features

Enable session recording for analysis:

```json
{
  "recording": {
    "enabled": true,
    "maxEvents": 1000
  }
}
```

Recordings include:

- Player interactions
- Combat events
- Movement tracking
- Health/food changes
- Chat messages

---

## Scheduling & Automation

### ⏰ Auto-Scheduling Features

#### Reconnection Schedule

- Automatic reconnection with exponential backoff
- Maximum retry attempts (default: 10)
- Delay increases: 5s, 10s, 20s, 40s, 60s (max)

#### Activity Scheduling

The bot can be configured for:

- Periodic resource gathering
- Scheduled patrol routes
- Timed combat engagement
- Resource management cycles

### 🔄 Event-Based Automation

#### Health Management

```javascript
// Auto-eat when health drops below threshold
bot.autoEat.options = {
  priority: 'foodPoints',
  startAt: 14,
  bannedFood: []
}
```

#### Combat Automation

```javascript
// Auto-attack nearby threats
bot.on('physicsTick', () => {
  const enemy = bot.nearestEntity(entity => {
    return entity.type === 'player' && 
           entity.username !== bot.username &&
           entity.position.distanceTo(bot.entity.position) < 16
  })
  
  if (enemy && !bot.pvp.target) {
    bot.pvp.attack(enemy)
  }
})
```

---

## Anti-AFK & Auto-Reconnect

### 🔄 Auto-Reconnect System

#### Features

- **Exponential Backoff** - Intelligent retry timing
- **Connection Monitoring** - Detects disconnections
- **State Preservation** - Remembers settings across reconnects
- **Maximum Attempts** - Prevents infinite retry loops

#### Configuration

```javascript
let reconnectAttempts = 0
const maxReconnectAttempts = 10

bot.on('end', () => {
  if (reconnectAttempts < maxReconnectAttempts) {
    const delay = Math.min(5000 * Math.pow(2, reconnectAttempts), 60000)
    reconnectAttempts++
    
    setTimeout(() => {
      // Reconnect with same configuration
      createBot(config)
    }, delay)
  }
})
```

### 🎯 Anti-AFK Mechanisms

#### Movement-Based Anti-AFK

- Random small movements
- Periodic look direction changes
- Subtle position adjustments

#### Interaction-Based Anti-AFK

- Chat message responses
- Block interaction
- Inventory management

#### Smart Anti-AFK

```javascript
setInterval(() => {
  // Random small movement
  const randomAngle = Math.random() * Math.PI * 2
  const moveX = Math.cos(randomAngle) * 0.1
  const moveZ = Math.sin(randomAngle) * 0.1
  
  bot.entity.position.x += moveX
  bot.entity.position.z += moveZ
}, 30000) // Every 30 seconds
```

---

## Pathfinding & Movement

### 🗺️ Advanced Pathfinding

#### Pathfinding Capabilities

- **A* Algorithm** - Optimal path calculation
- **Obstacle Avoidance** - Smart navigation around barriers
- **Multi-level Pathfinding** - Handles vertical movement
- **Dynamic Replanning** - Adapts to changing environments

#### Movement Features

```javascript
// Configure pathfinding
const defaultMove = new Movements(bot)
defaultMove.allowFreeMotion = true  // More flexible movement
defaultMove.allowParkour = true     // Parkour movements
defaultMove.canDig = true           // Can break blocks
defaultMove.scafoldingBlocks = [blocks.dirt.id, blocks.cobblestone.id]

bot.pathfinder.setMovements(defaultMove)
```

#### Goal Types

| Goal Type | Description | Usage |
|-----------|-------------|-------|
| `GoalNear` | Move near a position | Navigate to coordinates |
| `GoalFollow` | Follow an entity | Follow players/mobs |
| `GoalBlock` | Reach exact block | Precise positioning |
| `GoalXZ` | Move to X,Z coordinates | Horizontal movement |
| `GoalY` | Reach specific Y level | Vertical movement |

#### Example Pathfinding Usage

```javascript
// Move to specific coordinates
const goal = new goals.GoalNear(100, 64, -200, 3)
bot.pathfinder.setGoal(goal)

// Follow a player
const player = bot.players['PlayerName']
if (player && player.entity) {
  const followGoal = new goals.GoalFollow(player.entity, 2)
  bot.pathfinder.setGoal(followGoal)
}

// Stop pathfinding
bot.pathfinder.setGoal(null)
```

### 🎯 Movement Optimization

#### Performance Settings

```javascript
// Optimize pathfinding performance
defaultMove.blocksCantBreak = new Set([
  blocks.bedrock.id,
  blocks.obsidian.id,
  blocks.barrier.id
])

defaultMove.blocksToAvoid = new Set([
  blocks.lava.id,
  blocks.fire.id,
  blocks.cactus.id
])
```

---

## Configuration

### ⚙️ Server Configuration

#### Basic Server Setup

```json
{
  "server": {
    "host": "localhost",
    "port": 25565,
    "version": "1.19.2"
  },
  "bot": {
    "username": "MyBot",
    "auth": "offline"
  }
}
```

#### Feature Configuration

```json
{
  "features": {
    "autoEat": {
      "enabled": true,
      "priority": "foodPoints",
      "startAt": 14
    },
    "webInventory": {
      "enabled": true,
      "port": 3000
    },
    "logging": {
      "enabled": true,
      "logChat": true,
      "logCommands": true
    }
  }
}
```

### 🔧 Plugin Configuration

#### Auto-Eat Settings

```javascript
bot.autoEat.options = {
  priority: 'foodPoints',    // 'foodPoints' | 'saturation'
  startAt: 14,              // Start eating at 14/20 food
  bannedFood: ['rotten_flesh', 'spider_eye']
}
```

#### PvP Settings

```javascript
// Configure combat behavior
bot.pvp.followRange = 2      // Follow distance during combat
bot.pvp.viewDistance = 128   // Detection range
```

---

## Troubleshooting

### 🐛 Common Issues

#### Connection Problems

```
Error: Failed to connect
```

**Solutions:**

1. Check server address and port
2. Verify server is online
3. Check firewall settings
4. Ensure correct Minecraft version

#### Plugin Loading Errors

```
Plugin mineflayer-pvp is not a function
```

**Solutions:**

1. Update plugin versions
2. Check plugin compatibility
3. Verify import statements
4. Clear node_modules and reinstall

#### Pathfinding Issues

```
Bot gets stuck or takes inefficient paths
```

**Solutions:**

1. Update pathfinding settings
2. Check movement restrictions
3. Verify terrain accessibility
4. Reset pathfinding goal

### 🔍 Debug Mode

Enable verbose logging:

```javascript
// Enable debug logging
console.log('Debug mode enabled')
bot.on('physicsTick', () => {
  if (bot.pathfinder.isMoving()) {
    console.log('Pathfinding status:', bot.pathfinder.goal)
  }
})
```

### 📋 Health Checks

#### Plugin Status Check

```javascript
function checkPluginStatus() {
  console.log('Plugin Status:')
  console.log('Pathfinder:', bot.pathfinder ? '✅' : '❌')
  console.log('PvP:', bot.pvp ? '✅' : '❌')
  console.log('Auto-eat:', bot.autoEat ? '✅' : '❌')
  console.log('Armor Manager:', bot.armorManager ? '✅' : '❌')
  console.log('Collect Block:', bot.collectBlock ? '✅' : '❌')
  console.log('Bloodhound:', bot.bloodhound ? '✅' : '❌')
  console.log('Web Inventory:', bot.webInventory ? '✅' : '❌')
}
```

#### Performance Monitoring

```javascript
// Monitor bot performance
setInterval(() => {
  console.log(`Health: ${bot.health}/20, Food: ${bot.food}/20`)
  console.log(`Players online: ${Object.keys(bot.players).length}`)
  console.log(`Position: ${Math.floor(bot.entity.position.x)}, ${Math.floor(bot.entity.position.y)}, ${Math.floor(bot.entity.position.z)}`)
}, 30000)
```

---

## 📸 Screenshots & GIFs

### Bot in Action

*Note: Screenshots and GIFs can be found in the `/screenshots` directory*

#### Command Usage Example

![Bot Commands](../screenshots/bot-commands-example.png)
*Example of bot responding to various commands*

#### Discord Integration

![Discord Integration](../screenshots/discord-integration.png)
*Discord bot showing real-time status updates*

#### Web Inventory Interface

![Web Inventory](../screenshots/web-inventory.png)
*Browser-based inventory management*

#### Pathfinding Demonstration

![Pathfinding](../screenshots/pathfinding-demo.gif)
*Bot navigating complex terrain automatically*

---

## 🎯 Advanced Usage Examples

### Custom Command Implementation

```javascript
// Add custom command
bot.on('chat', (username, message) => {
  if (message === '!dance') {
    // Make bot "dance" by looking around
    for (let i = 0; i < 8; i++) {
      setTimeout(() => {
        bot.look(Math.random() * Math.PI * 2, 0)
      }, i * 200)
    }
    bot.chat('💃 Dancing!')
  }
})
```

### Automated Resource Gathering

```javascript
// Automatic wood gathering
async function gatherWood() {
  const logs = bot.findBlocks({
    matching: block => block.name.includes('log'),
    maxDistance: 32,
    count: 10
  })
  
  for (const logPos of logs) {
    const log = bot.blockAt(logPos)
    if (log) {
      await bot.collectBlock.collect(log)
      bot.chat(`⛏️ Collected ${log.name}`)
    }
  }
}
```

### Smart Combat System

```javascript
// Intelligent combat behavior
bot.on('entityHurt', (entity) => {
  if (entity === bot.entity) {
    // Bot was hurt, find attacker
    const attacker = bot.nearestEntity(e => 
      e.type === 'player' && 
      e.position.distanceTo(bot.entity.position) < 5
    )
    
    if (attacker) {
      bot.pvp.attack(attacker)
      bot.chat(`⚔️ Defending against ${attacker.username}!`)
    }
  }
})
```

---

## 📚 Additional Resources

- [API Reference](./API_REFERENCE.md)
- [Discord Integration Guide](./DISCORD_INTEGRATION_GUIDE.md)
- [Enhanced Features](./ENHANCED_FEATURES.md)
- [Plugin Audit Summary](./PLUGIN_AUDIT_SUMMARY.md)
- [NPM Installation Guide](./NPM_INSTALLATION_GUIDE.md)

---

## 🤝 Support

For issues, questions, or contributions:

1. Check the troubleshooting section above
2. Review the documentation files
3. Check the logs for error details
4. Create an issue with detailed information

---

*Last updated: $(date '+%Y-%m-%d')*
