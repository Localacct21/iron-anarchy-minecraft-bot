# 🛠️ Installation Guide - ESM Compatible Version

## Overview

This guide covers the installation of the Iron-Anarchy Minecraft Bot v2.0.4+ with full ESM (ES Module) compatibility. The bot supports both CommonJS and ESM packages, ensuring compatibility with modern npm packages.

## Quick Start

For users who want to get started immediately:

```bash
# Clone the repository
git clone https://github.com/Localacct21/iron-anarchy-minecraft-bot.git
cd iron-anarchy-minecraft-bot

# Install dependencies
npm install

# Set up configuration
cp .env.example .env
# Edit .env with your settings

# Start with ESM support
npm run basic
```

## System Requirements

### Node.js Version Requirements

| Node.js Version | ESM Support | Recommended |
|----------------|-------------|-------------|
| 12.20.0+ | Basic dynamic import | ❌ |
| 14.0.0+ | Stable dynamic import | ⚠️ Minimum |
| 16.0.0+ | Full ESM support | ✅ Good |
| 18.0.0+ | Latest ESM features | ✅ Best |

### Checking Your Version

```bash
# Check current Node.js version
node --version

# Check npm version
npm --version

# Verify ESM support
node -e "console.log(typeof import)"  # Should output: function
```

### Updating Node.js

#### Windows
```powershell
# Using winget
winget install OpenJS.NodeJS

# Using Chocolatey
choco upgrade nodejs

# Or download from https://nodejs.org/
```

#### macOS
```bash
# Using Homebrew
brew install node

# Using MacPorts
sudo port install nodejs18

# Or download from https://nodejs.org/
```

#### Linux (Ubuntu/Debian)
```bash
# Using NodeSource repository (recommended)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

## Installation Methods

### Method 1: NPM Package (Recommended)

```bash
# Install globally
npm install -g @localacct/iron-anarchy-minecraft-bot

# Create new project
mkdir my-minecraft-bot
cd my-minecraft-bot

# Initialize with ESM support
npx @localacct/iron-anarchy-minecraft-bot init

# Start the bot
npm run basic
```

### Method 2: Git Clone

```bash
# Clone repository
git clone https://github.com/Localacct21/iron-anarchy-minecraft-bot.git
cd iron-anarchy-minecraft-bot

# Install dependencies
npm install

# Run setup script
npm run setup

# Start with ESM support
npm run basic
```

### Method 3: Download ZIP

```bash
# Download and extract
curl -L https://github.com/Localacct21/iron-anarchy-minecraft-bot/archive/main.zip -o bot.zip
unzip bot.zip
cd iron-anarchy-minecraft-bot-main

# Install dependencies
npm install

# Configure and start
npm run setup
npm run basic
```

## ESM-Compatible Bot Types

The project includes several bot files optimized for ESM compatibility:

### 1. Basic Bot (Recommended for beginners)
```bash
# Start basic bot with ESM support
npm run basic

# Or directly
node src/bots/bot-fixed.js
```

**Features:**
- ESM-compatible plugin loading
- Graceful fallback for missing plugins
- Minimal configuration required
- Automatic error handling

### 2. Enhanced Bot (Production ready)
```bash
# Start enhanced bot
npm run enhanced

# Or directly
node src/bots/ironanarchy-bot-fixed.js
```

**Features:**
- Full ESM support
- Advanced plugin management
- Performance optimizations
- Comprehensive logging

### 3. Discord Bot (With Discord integration)
```bash
# Start Discord-integrated bot
npm run discord

# Or directly
node src/bots/enhanced-discord-bot.js
```

**Features:**
- Discord integration with ESM support
- Cross-platform compatibility
- Advanced command handling

## Configuration for ESM

### 1. Environment Variables

Create `.env` file with ESM-specific settings:

```bash
# Copy example file
cp .env.example .env

# Edit with your settings
nano .env
```

**ESM-Specific Variables:**
```bash
# Enable ESM plugin support
USE_ESM_PLUGINS=true

# Set ESM plugin timeout (milliseconds)
ESM_PLUGIN_TIMEOUT=30000

# Enable dynamic imports
DYNAMIC_IMPORT_ENABLED=true

# Fallback to CommonJS if ESM fails
FALLBACK_TO_CJS=true

# Node.js memory settings for ESM
NODE_OPTIONS="--max-old-space-size=2048"
```

### 2. Configuration File

Update `config/config.json`:

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
    "dynamicImports": true,
    "fallbackToCjs": true
  }
}
```

### 3. Package.json Configuration

Ensure your `package.json` is configured correctly:

```json
{
  "name": "iron-anarchy-minecraft-bot",
  "version": "2.0.4",
  "type": "commonjs",
  "engines": {
    "node": ">=14.0.0"
  },
  "scripts": {
    "start": "node index.js",
    "basic": "node src/bots/bot-fixed.js",
    "enhanced": "node src/bots/ironanarchy-bot-fixed.js",
    "discord": "node src/bots/enhanced-discord-bot.js",
    "test:esm": "node scripts/test-esm.js"
  }
}
```

## Plugin Installation

### ESM Plugins

Install ESM-compatible plugins:

```bash
# Install latest ESM versions
npm install mineflayer-auto-eat@latest
npm install mineflayer-collectblock@latest
npm install mineflayer-dashboard@latest

# Verify ESM compatibility
node -e "import('mineflayer-auto-eat').then(console.log).catch(console.error)"
```

### CommonJS Plugins

Install traditional CommonJS plugins:

```bash
# Install CommonJS plugins
npm install mineflayer-pathfinder
npm install mineflayer-pvp
npm install mineflayer-armor-manager

# These work with both ESM and non-ESM bots
```

### Plugin Compatibility Check

```bash
# Run plugin compatibility test
npm run test:plugin

# Check specific plugin
node scripts/test-plugin.js mineflayer-auto-eat
```

## Docker Installation with ESM

### 1. Dockerfile

```dockerfile
# Use Node.js 18 for best ESM support
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application files
COPY . .

# Set environment variables for ESM
ENV USE_ESM_PLUGINS=true
ENV NODE_OPTIONS="--max-old-space-size=2048"

# Create necessary directories
RUN mkdir -p logs recordings screenshots

# Use ESM-compatible entry point
CMD ["npm", "run", "basic"]
```

### 2. Docker Compose

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
      - MC_SERVER_HOST=${MC_SERVER_HOST:-ironanarchy.lol}
      - MC_SERVER_PORT=${MC_SERVER_PORT:-25565}
      - MC_BOT_USERNAME=${MC_BOT_USERNAME}
      - MC_BOT_AUTH=${MC_BOT_AUTH:-microsoft}
    ports:
      - "3001:3001"
    volumes:
      - ./logs:/app/logs
      - ./config:/app/config
      - ./recordings:/app/recordings
    restart: unless-stopped
    depends_on:
      - redis

  redis:
    image: redis:7-alpine
    container_name: iron-anarchy-redis
    volumes:
      - redis_data:/data
    restart: unless-stopped

volumes:
  redis_data:
```

### 3. Docker Commands

```bash
# Build and start
docker-compose up -d

# View logs
docker-compose logs -f minecraft-bot

# Test ESM compatibility
docker-compose exec minecraft-bot npm run test:esm

# Stop services
docker-compose down
```

## Verification and Testing

### 1. ESM Support Test

```bash
# Test Node.js ESM support
node --version  # Should be 14.0.0+

# Test dynamic import
node -e "import('fs').then(m => console.log('ESM works!')).catch(console.error)"

# Test bot ESM loading
npm run test:esm
```

### 2. Plugin Compatibility Test

```bash
# Test all plugins
npm run test:plugin

# Test specific ESM plugin
node -e "import('mineflayer-auto-eat').then(console.log).catch(console.error)"

# Test bot startup
npm run basic
```

### 3. Integration Test

```bash
# Full integration test
npm test

# Test server connection
npm run test:startup

# Test configuration
npm run validate
```

## Performance Optimization

### 1. Memory Settings

```bash
# Set Node.js memory limit
export NODE_OPTIONS="--max-old-space-size=2048"

# For persistent setting (add to .bashrc or .zshrc)
echo 'export NODE_OPTIONS="--max-old-space-size=2048"' >> ~/.bashrc
```

### 2. Plugin Loading Optimization

```javascript
// Optimize plugin loading order
const loadOrder = [
  // Critical plugins first (CommonJS)
  'mineflayer-pathfinder',
  'mineflayer-pvp',
  // ESM plugins last
  'mineflayer-auto-eat',
  'mineflayer-collectblock'
]
```

### 3. Connection Optimization

```json
{
  "server": {
    "host": "ironanarchy.lol",
    "port": 25565,
    "version": "1.21.4"
  },
  "performance": {
    "maxConcurrentConnections": 1,
    "reconnectDelay": 30000,
    "pluginLoadTimeout": 30000
  }
}
```

## Common Installation Issues

### Issue 1: Node.js Version Too Old

**Error:** `SyntaxError: Unexpected token '('`

**Solution:**
```bash
# Update Node.js to 14.0.0+
nvm install 18
nvm use 18

# Or update system Node.js
```

### Issue 2: ESM Plugin Not Found

**Error:** `Cannot resolve module 'mineflayer-auto-eat'`

**Solution:**
```bash
# Install ESM-compatible version
npm install mineflayer-auto-eat@latest

# Check installation
npm list mineflayer-auto-eat
```

### Issue 3: Permission Errors

**Error:** `EACCES: permission denied`

**Solution:**
```bash
# Fix permissions
sudo chown -R $USER:$GROUP ~/.npm
sudo chown -R $USER:$GROUP .

# Or use npx
npx --no-install iron-anarchy-minecraft-bot
```

### Issue 4: Memory Issues

**Error:** `JavaScript heap out of memory`

**Solution:**
```bash
# Increase memory limit
export NODE_OPTIONS="--max-old-space-size=4096"

# Or use alternative bot
npm run basic  # Uses less memory
```

## Health Checks

### 1. System Health

```bash
# Check system resources
free -h  # Memory
df -h    # Disk space
uptime   # System load

# Check Node.js health
node -e "console.log(process.memoryUsage())"
```

### 2. Bot Health

```bash
# Check bot process
ps aux | grep bot

# Check logs
tail -f logs/bot.log

# Check network connections
netstat -an | grep 25565
```

### 3. Plugin Health

```bash
# Test plugin loading
npm run test:plugin

# Check plugin status
curl http://localhost:3001/plugins
```

## Monitoring Setup

### 1. Log Monitoring

```bash
# Monitor bot logs
tail -f logs/bot.log | grep -i "error\|plugin\|esm"

# Monitor error logs
tail -f logs/error.log
```

### 2. Resource Monitoring

```bash
# Monitor memory usage
watch -n 5 'ps aux | grep bot'

# Monitor disk usage
watch -n 10 'df -h'
```

### 3. Network Monitoring

```bash
# Monitor connections
watch -n 5 'netstat -an | grep 25565'

# Monitor bandwidth
iftop -i eth0
```

## Getting Support

### 1. Self-Diagnosis

```bash
# Run diagnostics
npm run test:startup
npm run test:esm
npm run validate

# Check configuration
node scripts/validate-config.js
```

### 2. Community Support

- **GitHub Issues**: https://github.com/Localacct21/iron-anarchy-minecraft-bot/issues
- **Discord Community**: [Join Discord Server]
- **Email Support**: localacct@ironanarchy.lol

### 3. Documentation

- [ESM Compatibility Guide](./ESM-Compatibility-Guide.md)
- [Troubleshooting Guide](./ESM-Troubleshooting-Guide.md)
- [Migration Guide](./Migration-Guide.md)

## Next Steps

After successful installation:

1. **Configure Your Bot**: Edit `.env` and `config.json`
2. **Test Connectivity**: Run `npm run test:startup`
3. **Explore Features**: Check available scripts with `npm run`
4. **Join Community**: Connect with other users
5. **Customize Plugins**: Develop custom functionality

## Changelog

- **v2.0.4**: Full ESM compatibility
- **v2.0.3**: Enhanced plugin system
- **v2.0.2**: Improved Discord integration
- **v2.0.1**: Bug fixes and performance improvements

---

*This installation guide is for Iron-Anarchy Minecraft Bot v2.0.4+ with ESM support*

---

[🏠 Back to Home](../Home.md) | [📖 Table of Contents](../Table-of-Contents.md)
