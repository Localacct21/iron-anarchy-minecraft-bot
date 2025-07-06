# 🔄 Migration Guide: Upgrading to ESM-Compatible Version

## Overview

This guide helps you migrate from previous versions of the Iron-Anarchy Minecraft Bot to the latest ESM-compatible version (v2.0.4+). The migration ensures compatibility with modern ESM-only npm packages while maintaining backward compatibility.

## Pre-Migration Checklist

### 1. System Requirements

- **Node.js**: Version 14.0.0+ (16.0.0+ recommended)
- **npm**: Version 6.0.0+ (8.0.0+ recommended)
- **Disk Space**: 500MB free for dependencies
- **Backup**: Complete backup of current setup

### 2. Current Version Check

```bash
# Check current version
npm list @localacct/iron-anarchy-minecraft-bot

# Check bot version from package.json
cat package.json | grep version

# Check Node.js version
node --version
```

### 3. Create Backup

```bash
# Create backup directory
mkdir -p ../minecraft-bot-backup-$(date +%Y%m%d)

# Copy current installation
cp -r . ../minecraft-bot-backup-$(date +%Y%m%d)/

# Backup configuration files
cp .env ../minecraft-bot-backup-$(date +%Y%m%d)/.env.backup
cp config/config.json ../minecraft-bot-backup-$(date +%Y%m%d)/config.json.backup
```

## Migration Paths

### Path A: Fresh Installation (Recommended)

Best for major version upgrades or when experiencing issues.

```bash
# 1. Create new directory
mkdir iron-anarchy-minecraft-bot-new
cd iron-anarchy-minecraft-bot-new

# 2. Clone latest version
git clone https://github.com/Localacct21/iron-anarchy-minecraft-bot.git .

# 3. Install dependencies
npm install

# 4. Copy configuration from backup
cp ../minecraft-bot-backup-*/config/config.json config/
cp ../minecraft-bot-backup-*/.env .

# 5. Run setup
npm run setup
```

### Path B: In-Place Update

For minor updates and when you have custom modifications.

```bash
# 1. Stop the bot
pkill -f "node.*bot"

# 2. Update package
npm update @localacct/iron-anarchy-minecraft-bot

# 3. Install new dependencies
npm install

# 4. Update configuration (see config changes below)
```

### Path C: Docker Migration

For containerized deployments.

```bash
# 1. Stop current container
docker-compose down

# 2. Pull latest image
docker-compose pull

# 3. Update docker-compose.yml (see Docker section)

# 4. Restart with new configuration
docker-compose up -d
```

## Configuration Migration

### 1. Update package.json

Ensure your package.json has the correct settings:

```json
{
  "name": "your-bot-name",
  "version": "2.0.4",
  "type": "commonjs",
  "engines": {
    "node": ">=14.0.0"
  },
  "scripts": {
    "start": "node index.js",
    "basic": "node src/bots/bot-fixed.js",
    "enhanced": "node src/bots/ironanarchy-bot-fixed.js",
    "test:esm": "node scripts/test-esm.js"
  }
}
```

### 2. Update config.json

Add ESM-specific settings:

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
    "collectBlock": {
      "enabled": true,
      "esm": true
    },
    "pathfinder": {
      "enabled": true,
      "esm": false
    }
  },
  "compatibility": {
    "esm": true,
    "dynamicImports": true
  }
}
```

### 3. Update .env File

Add ESM-related environment variables:

```bash
# Existing variables
MC_SERVER_HOST=ironanarchy.lol
MC_SERVER_PORT=25565
MC_BOT_USERNAME=YourBotName
MC_BOT_AUTH=microsoft

# New ESM-related variables
USE_ESM_PLUGINS=true
ESM_PLUGIN_TIMEOUT=30000
DYNAMIC_IMPORT_ENABLED=true
FALLBACK_TO_CJS=true
```

## Code Migration

### 1. Update Bot Initialization

**Before (v2.0.3 and earlier):**
```javascript
const mineflayer = require('mineflayer')
const autoEat = require('mineflayer-auto-eat')
const collectBlock = require('mineflayer-collectblock')

const bot = mineflayer.createBot(options)
bot.loadPlugin(autoEat)
bot.loadPlugin(collectBlock)
```

**After (v2.0.4+):**
```javascript
const mineflayer = require('mineflayer')

async function createBot() {
  const bot = mineflayer.createBot(options)
  
  // Load ESM plugins dynamically
  try {
    const autoEatModule = await import('mineflayer-auto-eat')
    bot.loadPlugin(autoEatModule.default)
  } catch (error) {
    console.log('Auto-eat plugin not available:', error.message)
  }
  
  return bot
}
```

### 2. Update Custom Plugins

**Before:**
```javascript
// custom-plugin.js
const { pathfinder } = require('mineflayer-pathfinder')

function init(bot) {
  bot.loadPlugin(pathfinder)
}

module.exports = init
```

**After:**
```javascript
// custom-plugin.js
const { pathfinder } = require('mineflayer-pathfinder')

async function init(bot) {
  // Load CommonJS plugins normally
  bot.loadPlugin(pathfinder)
  
  // Load ESM plugins dynamically
  try {
    const autoEatModule = await import('mineflayer-auto-eat')
    bot.loadPlugin(autoEatModule.default)
  } catch (error) {
    console.log('ESM plugin not available:', error.message)
  }
}

module.exports = init
```

### 3. Update Start Scripts

**Before:**
```bash
# Old start command
node bot.js
```

**After:**
```bash
# Use ESM-compatible bot files
npm run basic           # Basic bot with ESM support
npm run enhanced        # Enhanced bot with ESM support
node src/bots/bot-fixed.js  # Direct usage
```

## Plugin Migration

### 1. ESM Plugin Mapping

| Plugin | Old Version | New Version | Status |
|--------|-------------|-------------|--------|
| mineflayer-auto-eat | 4.x | 5.x | ESM-only |
| mineflayer-collectblock | 1.x | 2.x | ESM-only |
| mineflayer-dashboard | 1.x | 2.x | ESM-only |
| mineflayer-pathfinder | 2.x | 2.x | CommonJS |
| mineflayer-pvp | 1.x | 1.x | CommonJS |

### 2. Update Plugin Loading

Create a plugin loader function:

```javascript
// utils/plugin-loader.js
const esmPlugins = [
  'mineflayer-auto-eat',
  'mineflayer-collectblock',
  'mineflayer-dashboard'
]

const cjsPlugins = [
  'mineflayer-pathfinder',
  'mineflayer-pvp',
  'mineflayer-armor-manager'
]

async function loadAllPlugins(bot) {
  // Load CommonJS plugins
  for (const pluginName of cjsPlugins) {
    try {
      const plugin = require(pluginName)
      bot.loadPlugin(plugin)
      console.log(`✅ Loaded ${pluginName} (CommonJS)`)
    } catch (error) {
      console.log(`❌ Failed to load ${pluginName}:`, error.message)
    }
  }
  
  // Load ESM plugins
  for (const pluginName of esmPlugins) {
    try {
      const module = await import(pluginName)
      const plugin = module.default || module.plugin
      bot.loadPlugin(plugin)
      console.log(`✅ Loaded ${pluginName} (ESM)`)
    } catch (error) {
      console.log(`❌ Failed to load ${pluginName}:`, error.message)
    }
  }
}

module.exports = { loadAllPlugins }
```

## Testing Migration

### 1. Pre-Migration Tests

```bash
# Test current setup
npm test

# Test plugin loading
npm run test:plugin

# Check for compatibility issues
node -e "console.log(process.version)"
```

### 2. Post-Migration Tests

```bash
# Test ESM compatibility
npm run test:esm

# Test bot startup
npm run basic

# Test all plugins
npm run test:plugin

# Test Discord integration (if used)
npm run test:discord
```

### 3. Integration Tests

```bash
# Test server connection
npm run test:startup

# Test plugin functionality
npm run validate

# Test configuration loading
node scripts/test-config.js
```

## Docker Migration

### 1. Update Dockerfile

```dockerfile
# Use latest Node.js LTS
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies with ESM support
RUN npm ci --only=production

# Copy application files
COPY . .

# Use ESM-compatible entry point
CMD ["npm", "run", "basic"]
```

### 2. Update docker-compose.yml

```yaml
version: '3.8'

services:
  minecraft-bot:
    build: .
    container_name: iron-anarchy-bot
    environment:
      - USE_ESM_PLUGINS=true
      - ESM_PLUGIN_TIMEOUT=30000
      - NODE_OPTIONS=--max-old-space-size=2048
    restart: unless-stopped
    depends_on:
      - redis
```

## Performance Optimization

### 1. Memory Settings

```bash
# Increase Node.js memory limit
export NODE_OPTIONS="--max-old-space-size=2048"

# For Docker
ENV NODE_OPTIONS="--max-old-space-size=2048"
```

### 2. Plugin Loading Optimization

```javascript
// Parallel loading for better performance
async function loadPluginsParallel(bot) {
  const esmPromises = esmPlugins.map(async (pluginName) => {
    try {
      const module = await import(pluginName)
      return { name: pluginName, plugin: module.default }
    } catch (error) {
      console.log(`Failed to load ${pluginName}:`, error.message)
      return null
    }
  })
  
  const results = await Promise.all(esmPromises)
  
  results.forEach(result => {
    if (result) {
      bot.loadPlugin(result.plugin)
      console.log(`✅ Loaded ${result.name}`)
    }
  })
}
```

## Rollback Procedures

### 1. Quick Rollback

```bash
# Stop new version
pkill -f "node.*bot"

# Restore backup
cp -r ../minecraft-bot-backup-*/* .

# Restore configuration
cp ../minecraft-bot-backup-*/.env .
cp ../minecraft-bot-backup-*/config.json config/

# Restart old version
npm start
```

### 2. Docker Rollback

```bash
# Stop new containers
docker-compose down

# Use previous image
docker-compose -f docker-compose.old.yml up -d
```

## Troubleshooting Migration

### Common Issues

1. **Plugin Loading Failures**
   - Check plugin versions
   - Verify ESM compatibility
   - Review error logs

2. **Configuration Errors**
   - Validate JSON syntax
   - Check environment variables
   - Verify file permissions

3. **Performance Issues**
   - Monitor memory usage
   - Check plugin loading times
   - Optimize startup sequence

### Debug Commands

```bash
# Check plugin compatibility
node -e "import('mineflayer-auto-eat').then(console.log).catch(console.error)"

# Verify configuration
node scripts/validate-config.js

# Test ESM loading
node scripts/test-esm.js
```

## Post-Migration Validation

### 1. Functionality Checklist

- [ ] Bot connects to server successfully
- [ ] All plugins load without errors
- [ ] Configuration settings are applied
- [ ] Discord integration works (if enabled)
- [ ] Web interface accessible (if enabled)
- [ ] Logging functions correctly
- [ ] Performance is acceptable

### 2. Monitoring Setup

```bash
# Set up log monitoring
tail -f logs/bot.log | grep -i "error\|plugin\|esm"

# Monitor resource usage
top -p $(pgrep -f "node.*bot")

# Check plugin status
curl http://localhost:3001/status
```

## Best Practices After Migration

1. **Regular Updates**: Keep dependencies updated
2. **Version Pinning**: Pin critical plugin versions
3. **Monitoring**: Set up proper monitoring
4. **Backups**: Regular configuration backups
5. **Testing**: Regular compatibility testing

## Getting Support

If you encounter issues during migration:

1. **Check Logs**: Review `logs/bot.log` and `logs/error.log`
2. **Run Diagnostics**: Use troubleshooting commands
3. **GitHub Issues**: Search/create issues
4. **Discord Community**: Real-time help
5. **Email Support**: localacct@ironanarchy.lol

## Related Documentation

- [ESM Compatibility Guide](./ESM-Compatibility-Guide.md)
- [ESM Troubleshooting Guide](./ESM-Troubleshooting-Guide.md)
- [Installation Guide](./Installation.md)
- [Configuration Guide](./Configuration-Guide.md)

---

*This migration guide is for Iron-Anarchy Minecraft Bot v2.0.4+*

---

[🏠 Back to Home](../Home.md) | [📖 Table of Contents](../Table-of-Contents.md)
