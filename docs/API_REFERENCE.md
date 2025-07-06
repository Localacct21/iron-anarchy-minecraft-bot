# 🔧 Iron-Anarchy Bot API Reference

## Overview

Professional API documentation for developers integrating with or extending the Iron-Anarchy Minecraft Bot.

**Developer**: Local Acct (25+ years IT experience)  
**Version**: 2.0.0  
**Node.js**: 14.0+ required  

---

## 🚀 Getting Started

### Installation
```javascript
const IronAnarchyBot = require('iron-anarchy-minecraft-bot');
```

### Basic Usage
```javascript
const bot = new IronAnarchyBot({
  host: 'ironanarchy.net',
  username: 'your-username',
  password: 'your-password'
});

bot.start();
```

---

## 📋 Core API

### Bot Class

#### Constructor
```javascript
new IronAnarchyBot(config)
```

**Parameters:**
- `config` (Object) - Bot configuration object

**Example:**
```javascript
const config = {
  host: 'ironanarchy.net',
  port: 25565,
  username: 'player',
  password: 'password',
  version: '1.20.1'
};

const bot = new IronAnarchyBot(config);
```

#### Methods

##### `start()`
Starts the bot and connects to the server.

```javascript
bot.start()
  .then(() => console.log('Bot started successfully'))
  .catch(error => console.error('Failed to start:', error));
```

##### `stop()`
Safely disconnects and stops the bot.

```javascript
await bot.stop();
```

##### `reconnect()`
Reconnects to the server with exponential backoff.

```javascript
await bot.reconnect();
```

---

## 🎮 Game Features API

### PVP System

#### `enablePVP(options)`
Enables PVP assistance with configurable options.

```javascript
bot.enablePVP({
  autoAttack: true,
  criticalHits: true,
  dodgeProjectiles: true,
  targetPriority: ['player', 'mob']
});
```

#### `disablePVP()`
Disables PVP assistance.

```javascript
bot.disablePVP();
```

### Pathfinding

#### `goTo(position, options)`
Navigate to specific coordinates.

```javascript
await bot.goTo({ x: 100, y: 64, z: 200 }, {
  timeout: 30000,
  avoidMobs: true,
  avoidPlayers: false
});
```

#### `follow(player, distance)`
Follow a specific player.

```javascript
bot.follow('PlayerName', 3); // Follow at 3 block distance
```

---

## 💬 Discord Integration API

### Setup
```javascript
const discordConfig = {
  token: 'your-bot-token',
  channelId: 'channel-id',
  enabled: true
};

bot.enableDiscord(discordConfig);
```

### Events

#### `discord:message`
Triggered when a Discord message is received.

```javascript
bot.on('discord:message', (message) => {
  console.log(`Discord: ${message.author}: ${message.content}`);
});
```

#### `discord:command`
Triggered when a Discord command is executed.

```javascript
bot.on('discord:command', (command, args, message) => {
  if (command === 'status') {
    message.reply(`Bot is at ${bot.position}`);
  }
});
```

### Methods

#### `sendToDiscord(message)`
Send a message to the configured Discord channel.

```javascript
bot.sendToDiscord('Hello from Minecraft!');
```

---

## 📹 Recording System API

### Configuration
```javascript
const recordingConfig = {
  enabled: true,
  interval: 30000,
  format: 'mp4',
  quality: 'high'
};

bot.enableRecording(recordingConfig);
```

### Methods

#### `startRecording(filename)`
Start recording session.

```javascript
bot.startRecording('session-2023-01-01');
```

#### `stopRecording()`
Stop current recording.

```javascript
const recording = await bot.stopRecording();
console.log(`Recording saved: ${recording.filename}`);
```

#### `getRecordings()`
List all available recordings.

```javascript
const recordings = bot.getRecordings();
recordings.forEach(rec => {
  console.log(`${rec.name} - ${rec.duration}s`);
});
```

---

## 🌐 Web Dashboard API

### Configuration
```javascript
const dashboardConfig = {
  enabled: true,
  port: 3001,
  host: 'localhost',
  auth: false
};

bot.enableDashboard(dashboardConfig);
```

### REST Endpoints

#### GET `/api/status`
Get current bot status.

**Response:**
```json
{
  "status": "connected",
  "position": { "x": 100, "y": 64, "z": 200 },
  "health": 20,
  "food": 18,
  "experience": 127
}
```

#### POST `/api/command`
Execute bot command.

**Request:**
```json
{
  "command": "goTo",
  "params": { "x": 150, "y": 64, "z": 250 }
}
```

#### GET `/api/inventory`
Get current inventory state.

**Response:**
```json
{
  "slots": [
    { "slot": 0, "item": "diamond_sword", "count": 1 },
    { "slot": 1, "item": "cooked_beef", "count": 32 }
  ]
}
```

---

## 🧩 Plugin System API

### Creating Plugins

#### Basic Plugin Structure
```javascript
// plugins/example-plugin.js
module.exports = function(bot) {
  bot.on('spawn', () => {
    console.log('Plugin: Bot spawned!');
  });
  
  bot.on('chat', (username, message) => {
    if (message === '!hello') {
      bot.chat('Hello from plugin!');
    }
  });
  
  return {
    name: 'ExamplePlugin',
    version: '1.0.0',
    disable: () => {
      // Cleanup code here
    }
  };
};
```

#### Loading Plugins
```javascript
bot.loadPlugin('./plugins/example-plugin.js');
```

#### Plugin Lifecycle
```javascript
const plugin = {
  initialize: (bot) => {
    // Setup code
  },
  
  enable: () => {
    // Enable plugin functionality
  },
  
  disable: () => {
    // Cleanup and disable
  },
  
  destroy: () => {
    // Final cleanup
  }
};
```

---

## 📊 Events System

### Core Events

#### `spawn`
Bot has spawned in the world.

```javascript
bot.on('spawn', () => {
  console.log(`Spawned at ${bot.entity.position}`);
});
```

#### `death`
Bot has died.

```javascript
bot.on('death', () => {
  console.log('Bot died, respawning...');
  bot.respawn();
});
```

#### `chat`
Chat message received.

```javascript
bot.on('chat', (username, message) => {
  console.log(`${username}: ${message}`);
});
```

#### `playerJoined`
Player joined the server.

```javascript
bot.on('playerJoined', (player) => {
  bot.chat(`Welcome ${player.username}!`);
});
```

### Custom Events

#### `bot:ready`
Bot is fully initialized and ready.

```javascript
bot.on('bot:ready', () => {
  console.log('Bot is ready for commands');
});
```

#### `bot:error`
Bot encountered an error.

```javascript
bot.on('bot:error', (error) => {
  console.error('Bot error:', error.message);
});
```

---

## 🔧 Configuration Schema

### Main Configuration
```javascript
const config = {
  // Server connection
  host: 'ironanarchy.net',
  port: 25565,
  username: 'your-username',
  password: 'your-password',
  version: '1.20.1',
  
  // Bot behavior
  autoReconnect: true,
  reconnectDelay: 5000,
  maxReconnectAttempts: 10,
  
  // Features
  pvp: {
    enabled: true,
    autoAttack: true,
    criticalHits: true
  },
  
  pathfinding: {
    enabled: true,
    avoidMobs: true,
    timeout: 30000
  },
  
  recording: {
    enabled: true,
    interval: 30000,
    format: 'mp4'
  },
  
  dashboard: {
    enabled: true,
    port: 3001,
    host: 'localhost'
  }
};
```

---

## 🚨 Error Handling

### Error Types

#### `ConnectionError`
Connection to Minecraft server failed.

```javascript
bot.on('error', (error) => {
  if (error instanceof ConnectionError) {
    console.log('Connection failed, retrying...');
    bot.reconnect();
  }
});
```

#### `AuthenticationError`
Invalid username or password.

```javascript
bot.on('error', (error) => {
  if (error instanceof AuthenticationError) {
    console.error('Invalid credentials');
    process.exit(1);
  }
});
```

#### `PluginError`
Plugin loading or execution error.

```javascript
bot.on('plugin:error', (pluginName, error) => {
  console.error(`Plugin ${pluginName} error:`, error.message);
});
```

### Best Practices

1. **Always handle errors** - Wrap API calls in try-catch blocks
2. **Use events** - Listen for error events for robust error handling
3. **Graceful degradation** - Disable features if components fail
4. **Logging** - Use proper logging for debugging and monitoring

---

## 🔒 Security Considerations

### Credentials Management
- Use environment variables for sensitive data
- Never commit passwords to version control
- Rotate bot passwords regularly

### Discord Integration
- Use dedicated bot accounts
- Limit bot permissions to necessary channels
- Validate all user inputs

### Plugin Security
- Validate plugin sources
- Sandbox plugin execution where possible
- Regular security audits

---

## 📈 Performance Optimization

### Memory Management
```javascript
// Enable garbage collection monitoring
bot.enableMemoryMonitoring({
  interval: 60000,
  logUsage: true,
  maxMemory: '1GB'
});
```

### Network Optimization
```javascript
// Configure packet handling
bot.setPacketOptions({
  bufferSize: 8192,
  compression: true,
  keepAlive: 30000
});
```

### Recording Performance
```javascript
// Optimize recording settings
bot.configureRecording({
  fps: 30,
  quality: 'medium',
  buffering: true
});
```

---

## 🧪 Testing

### Unit Tests
```javascript
const { IronAnarchyBot } = require('iron-anarchy-minecraft-bot');
const assert = require('assert');

describe('Bot Configuration', () => {
  it('should validate configuration', () => {
    const config = { host: 'test', username: 'test' };
    const bot = new IronAnarchyBot(config);
    assert(bot.isValidConfig());
  });
});
```

### Integration Tests
```javascript
describe('Bot Connection', () => {
  it('should connect to server', async () => {
    const bot = new IronAnarchyBot(testConfig);
    await bot.start();
    assert(bot.isConnected());
    await bot.stop();
  });
});
```

---

**Professional API built on 25 years of IT experience** 🏢  
**Contact**: localacct@ironanarchy.lol
