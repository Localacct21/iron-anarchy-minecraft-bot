# 🤖 Fixed Bot Files Guide

## Overview

The Iron-Anarchy Minecraft Bot includes several "fixed" bot files that provide enhanced ESM (ES Module) compatibility and improved error handling. This guide explains when and how to use each fixed bot file.

## Available Fixed Bot Files

### 1. `src/bots/bot-fixed.js` - Basic ESM-Compatible Bot

**Command:** `npm run basic`

**Best For:**
- First-time users
- Testing ESM compatibility
- Minimal resource usage
- Development and debugging

**Features:**
- ✅ ESM plugin support (mineflayer-auto-eat)
- ✅ Graceful plugin loading fallbacks
- ✅ Basic pathfinding and PvP
- ✅ Simple configuration
- ✅ Lightweight operation
- ✅ Error recovery

**Resource Usage:**
- Memory: ~150-200MB
- CPU: Low
- Network: Minimal

**Example Usage:**
```bash
# Start basic bot
npm run basic

# Or directly
node src/bots/bot-fixed.js

# With custom config
CONFIG_FILE=custom-config.json npm run basic
```

### 2. `src/bots/ironanarchy-bot-fixed.js` - Enhanced ESM-Compatible Bot

**Command:** `node src/bots/ironanarchy-bot-fixed.js`

**Best For:**
- Production deployments
- Full feature utilization
- Advanced automation
- Long-running instances

**Features:**
- ✅ Full ESM plugin support
- ✅ Enhanced pathfinding and combat
- ✅ Web inventory interface
- ✅ Recording capabilities
- ✅ Advanced plugin management
- ✅ Performance monitoring
- ✅ Comprehensive logging

**Resource Usage:**
- Memory: ~300-500MB
- CPU: Medium
- Network: Moderate

**Example Usage:**
```bash
# Start enhanced bot
npm run enhanced

# Or directly
node src/bots/ironanarchy-bot-fixed.js

# With environment variables
USE_ESM_PLUGINS=true node src/bots/ironanarchy-bot-fixed.js
```

### 3. `src/bots/enhanced-discord-bot.js` - Discord-Integrated Bot

**Command:** `npm run discord`

**Best For:**
- Discord integration
- Community servers
- Remote monitoring
- Cross-platform communication

**Features:**
- ✅ ESM compatibility
- ✅ Discord bot integration
- ✅ Command interface
- ✅ Status reporting
- ✅ Chat relay

**Resource Usage:**
- Memory: ~250-400MB
- CPU: Medium
- Network: High (Discord + Minecraft)

## Comparison Matrix

| Feature | Basic Fixed | Enhanced Fixed | Discord Bot |
|---------|-------------|----------------|-------------|
| ESM Support | ✅ | ✅ | ✅ |
| Auto-Eat | ✅ | ✅ | ✅ |
| Collect Block | ❌ | ✅ | ✅ |
| Web Interface | ❌ | ✅ | ❌ |
| Recording | ❌ | ✅ | ❌ |
| Discord | ❌ | ❌ | ✅ |
| Memory Usage | Low | High | Medium |
| Setup Complexity | Simple | Advanced | Complex |

## ESM Compatibility Features

### Dynamic Import Implementation

All fixed bot files use this pattern for ESM modules:

```javascript
// Dynamic import for ESM modules
let autoEat = null

try {
  const autoEatModule = await import('mineflayer-auto-eat')
  autoEat = autoEatModule.plugin || autoEatModule.default
  console.log('✅ mineflayer-auto-eat loaded successfully')
} catch (error) {
  console.log('⚠️ mineflayer-auto-eat not available:', error.message)
}

// Use plugin if available
if (autoEat) {
  bot.loadPlugin(autoEat)
}
```

### Error Handling

Enhanced error handling prevents crashes:

```javascript
// Graceful error handling
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error)
  // Don't exit, log and continue
})

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason)
  // Don't exit, log and continue
})
```

## When to Use Each Bot

### Use Basic Fixed Bot (`bot-fixed.js`) When:

- 🆕 **New to the project**
- 🧪 **Testing ESM compatibility**
- 💾 **Limited system resources**
- 🐛 **Debugging issues**
- 📚 **Learning the codebase**
- ⚡ **Quick testing needed**

### Use Enhanced Fixed Bot (`ironanarchy-bot-fixed.js`) When:

- 🏭 **Production deployment**
- 🔄 **24/7 operation needed**
- 📊 **Full features required**
- 🎯 **Advanced automation**
- 📱 **Web interface needed**
- 🎥 **Recording capabilities**

### Use Discord Bot (`enhanced-discord-bot.js`) When:

- 💬 **Discord integration required**
- 👥 **Community management**
- 📱 **Remote control needed**
- 🔔 **Notifications required**
- 🌉 **Cross-platform communication**

## Configuration for Fixed Bots

### Environment Variables

```bash
# Basic configuration
MC_SERVER_HOST=ironanarchy.lol
MC_SERVER_PORT=25565
MC_BOT_USERNAME=YourBotName
MC_BOT_AUTH=microsoft

# ESM-specific settings
USE_ESM_PLUGINS=true
ESM_PLUGIN_TIMEOUT=30000
DYNAMIC_IMPORT_ENABLED=true
FALLBACK_TO_CJS=true

# Bot-specific settings
BOT_TYPE=fixed
LOG_LEVEL=info
AUTO_RECONNECT=true
```

### Config.json Settings

```json
{
  "server": {
    "host": "ironanarchy.lol",
    "port": 25565,
    "version": "1.21.4"
  },
  "bot": {
    "username": "YourBotName",
    "auth": "microsoft",
    "type": "fixed"
  },
  "plugins": {
    "autoEat": {
      "enabled": true,
      "esm": true,
      "priority": "foodPoints",
      "startAt": 14
    },
    "pathfinder": {
      "enabled": true,
      "esm": false
    },
    "pvp": {
      "enabled": true,
      "esm": false
    }
  },
  "features": {
    "webInventory": false,    // Basic bot
    "recording": false,       // Basic bot
    "dashboard": false        // Basic bot
  }
}
```

## Startup Scripts

### Package.json Scripts

```json
{
  "scripts": {
    "basic": "node src/bots/bot-fixed.js",
    "enhanced": "node src/bots/ironanarchy-bot-fixed.js",
    "discord": "node src/bots/enhanced-discord-bot.js",
    "test:basic": "timeout 30s npm run basic",
    "test:enhanced": "timeout 30s npm run enhanced"
  }
}
```

### Custom Startup Scripts

Create custom launcher scripts:

```bash
#!/bin/bash
# start-basic.sh

export USE_ESM_PLUGINS=true
export NODE_OPTIONS="--max-old-space-size=1024"

echo "Starting basic ESM-compatible bot..."
node src/bots/bot-fixed.js
```

```bash
#!/bin/bash
# start-enhanced.sh

export USE_ESM_PLUGINS=true
export NODE_OPTIONS="--max-old-space-size=2048"

echo "Starting enhanced ESM-compatible bot..."
node src/bots/ironanarchy-bot-fixed.js
```

## Monitoring and Logging

### Log Output Examples

**Basic Bot:**
```
🤖 Basic Iron-Anarchy Bot Starting...
✅ mineflayer-auto-eat loaded successfully
🎯 Bot connected to ironanarchy.lol:25565
⚔️ PvP plugin loaded
🗺️ Pathfinder plugin loaded
✅ Bot ready for action!
```

**Enhanced Bot:**
```
🔥 Iron-Anarchy Bot Starting...
✅ mineflayer-auto-eat loaded successfully
✅ mineflayer-collectblock loaded successfully
🌐 Web inventory started on port 3001
🎥 Recording system initialized
📊 Performance monitoring enabled
⚔️ Advanced PvP system loaded
✅ All systems operational!
```

### Health Monitoring

```bash
# Monitor bot processes
ps aux | grep "bot-fixed\|ironanarchy-bot-fixed"

# Check memory usage
pmap -d $(pgrep -f "bot-fixed")

# Monitor log files
tail -f logs/bot.log | grep -E "(✅|❌|⚠️)"
```

## Troubleshooting Fixed Bots

### Common Issues

#### 1. ESM Plugin Not Loading

**Symptoms:**
```
⚠️ mineflayer-auto-eat not available: Cannot resolve module
```

**Solutions:**
```bash
# Install ESM-compatible version
npm install mineflayer-auto-eat@latest

# Check Node.js version
node --version  # Should be 14.0.0+

# Test direct import
node -e "import('mineflayer-auto-eat').then(console.log)"
```

#### 2. Bot Crashes on Startup

**Symptoms:**
```
Error: Cannot find module './config/config.json'
```

**Solutions:**
```bash
# Ensure config file exists
ls -la config/config.json

# Copy from example
cp config/config.example.json config/config.json

# Validate JSON syntax
node -e "JSON.parse(require('fs').readFileSync('config/config.json'))"
```

#### 3. Memory Issues

**Symptoms:**
```
<--- JS stacktrace --->
FATAL ERROR: Reached heap limit
```

**Solutions:**
```bash
# Increase memory limit
export NODE_OPTIONS="--max-old-space-size=2048"

# Use basic bot for lower memory usage
npm run basic

# Monitor memory usage
watch -n 5 'ps aux | grep bot'
```

### Debug Mode

Enable debug mode for troubleshooting:

```bash
# Enable debug logging
DEBUG=* npm run basic

# Enable Node.js debug
node --inspect src/bots/bot-fixed.js

# Enable specific debug modules
DEBUG=mineflayer npm run basic
```

## Performance Optimization

### Memory Optimization

```javascript
// Optimize garbage collection
process.env.NODE_OPTIONS = '--max-old-space-size=1024 --gc-interval=100'

// Memory monitoring
setInterval(() => {
  const usage = process.memoryUsage()
  console.log(`Memory: ${Math.round(usage.heapUsed / 1024 / 1024)}MB`)
}, 60000)
```

### Plugin Loading Optimization

```javascript
// Load plugins in order of priority
const pluginOrder = [
  { name: 'pathfinder', esm: false, critical: true },
  { name: 'pvp', esm: false, critical: true },
  { name: 'mineflayer-auto-eat', esm: true, critical: false }
]

for (const plugin of pluginOrder) {
  try {
    if (plugin.esm) {
      const module = await import(plugin.name)
      bot.loadPlugin(module.default)
    } else {
      bot.loadPlugin(require(plugin.name))
    }
  } catch (error) {
    if (plugin.critical) {
      throw error  // Fail fast for critical plugins
    } else {
      console.log(`Optional plugin ${plugin.name} not available`)
    }
  }
}
```

## Development and Customization

### Creating Custom Fixed Bot

```javascript
// custom-bot-fixed.js
const mineflayer = require('mineflayer')
const config = require('../config/config.json')

async function createCustomBot() {
  console.log('🛠️ Custom ESM-Compatible Bot Starting...')
  
  // Create bot instance
  const bot = mineflayer.createBot({
    host: config.server.host,
    port: config.server.port,
    username: config.bot.username,
    auth: config.bot.auth,
    version: config.server.version
  })
  
  // Load ESM plugins with error handling
  await loadESMPlugins(bot)
  
  // Add custom behavior
  bot.on('spawn', () => {
    console.log('🎯 Custom bot spawned and ready!')
  })
  
  return bot
}

async function loadESMPlugins(bot) {
  const esmPlugins = [
    'mineflayer-auto-eat',
    'mineflayer-collectblock'
  ]
  
  for (const pluginName of esmPlugins) {
    try {
      const module = await import(pluginName)
      const plugin = module.default || module.plugin
      bot.loadPlugin(plugin)
      console.log(`✅ Loaded ${pluginName}`)
    } catch (error) {
      console.log(`⚠️ ${pluginName} not available:`, error.message)
    }
  }
}

// Start bot if run directly
if (require.main === module) {
  createCustomBot().catch(console.error)
}

module.exports = createCustomBot
```

### Testing Custom Bots

```bash
# Test custom bot
node custom-bot-fixed.js

# Add to package.json
{
  "scripts": {
    "custom": "node custom-bot-fixed.js"
  }
}

# Run tests
npm run test:plugin
npm run test:esm
```

## Migration from Standard Bots

### From `bot.js` to `bot-fixed.js`

1. **Update scripts:**
```json
{
  "scripts": {
    "start": "node src/bots/bot-fixed.js"
  }
}
```

2. **Update imports:**
```javascript
// Old way
const autoEat = require('mineflayer-auto-eat')

// New way (in bot-fixed.js)
const autoEatModule = await import('mineflayer-auto-eat')
const autoEat = autoEatModule.default
```

3. **Test migration:**
```bash
npm run basic
npm run test:plugin
```

## Related Documentation

- [ESM Compatibility Guide](./ESM-Compatibility-Guide.md)
- [ESM Troubleshooting Guide](./ESM-Troubleshooting-Guide.md)
- [Migration Guide](./Migration-Guide.md)
- [Installation Guide](./Installation.md)

---

*This guide is for Iron-Anarchy Minecraft Bot v2.0.4+ fixed bot files*

---

[🏠 Back to Home](../Home.md) | [📖 Table of Contents](../Table-of-Contents.md)
