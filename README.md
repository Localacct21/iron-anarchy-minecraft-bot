# 🤖 Iron-Anarchy Minecraft Bot

[![Version](https://img.shields.io/npm/v/@localacct/iron-anarchy-minecraft-bot.svg)](https://www.npmjs.com/package/@localacct/iron-anarchy-minecraft-bot)
[![License](https://img.shields.io/github/license/Localacct21/iron-anarchy-minecraft-bot.svg)](LICENSE)
[![Node.js](https://img.shields.io/node/v/@localacct/iron-anarchy-minecraft-bot.svg)](package.json)
[![ESM Compatible](https://img.shields.io/badge/ESM-Compatible-brightgreen.svg)](wiki/guides/ESM-Compatibility-Guide.md)

**Enterprise-grade Minecraft automation bot with full ESM compatibility, Discord integration, recording features, and web dashboard. Built by a 25-year IT veteran currently managing live gaming servers.**

## 🆕 What's New in v2.0.4+

### ✨ ESM Compatibility
- **Full ESM Support**: Compatible with modern ES Module packages
- **Fixed Bot Files**: ESM-compatible bot implementations ready to use
- **Dynamic Loading**: Graceful handling of both CommonJS and ESM modules
- **Migration Tools**: Easy upgrade from previous versions

### 🚀 Quick Start with ESM

```bash
# Clone and install
git clone https://github.com/Localacct21/iron-anarchy-minecraft-bot.git
cd iron-anarchy-minecraft-bot
npm install

# Start with ESM support (recommended)
npm run basic
```

## 📋 Table of Contents

- [🎯 Features](#-features)
- [🛠️ Installation](#️-installation)
- [🚀 Quick Start](#-quick-start)
- [🤖 Bot Types](#-bot-types)
- [🔧 ESM Compatibility](#-esm-compatibility)
- [⚙️ Configuration](#️-configuration)
- [💻 Usage](#-usage)
- [📊 Monitoring](#-monitoring)
- [🐛 Troubleshooting](#-troubleshooting)
- [📚 Documentation](#-documentation)

## 🎯 Features

### Core Functionality
- ✅ **Automated Minecraft gameplay** with intelligent decision making
- ✅ **PvP combat system** with advanced targeting and combat strategies
- ✅ **Pathfinding and navigation** using mineflayer-pathfinder
- ✅ **Auto-eating system** for health maintenance (ESM compatible)
- ✅ **Block collection** and resource gathering (ESM compatible)
- ✅ **Armor management** with automatic equipment optimization

### ESM Compatibility (NEW)
- ✅ **ESM Module Support**: Full compatibility with ES Module packages
- ✅ **Fixed Bot Files**: Ready-to-use ESM-compatible implementations
- ✅ **Dynamic Import System**: Graceful loading of ESM and CommonJS modules
- ✅ **Fallback Handling**: Continues operation if ESM modules unavailable
- ✅ **Migration Support**: Easy upgrade from CommonJS-only versions

### Integration & Monitoring
- ✅ **Discord integration** with real-time status updates and commands
- ✅ **Web inventory interface** accessible via browser
- ✅ **Recording system** for gameplay analysis and debugging
- ✅ **Screenshot capture** for visual monitoring
- ✅ **Comprehensive logging** with configurable log levels
- ✅ **Health monitoring** and automatic recovery systems

### Enterprise Features
- ✅ **Docker support** with multi-architecture containers
- ✅ **Environment-based configuration** for different deployment scenarios
- ✅ **Plugin system** with hot-loading capabilities
- ✅ **Performance monitoring** with memory and CPU tracking
- ✅ **Error recovery** and automatic reconnection
- ✅ **Security features** with authentication and access controls

## 🛠️ Installation

### System Requirements

| Component | Minimum | Recommended |
|-----------|---------|-------------|
| Node.js | 14.0.0+ | 18.0.0+ |
| npm | 6.0.0+ | 8.0.0+ |
| Memory | 512MB | 2GB |
| Disk Space | 500MB | 2GB |

### Install Methods

#### Method 1: NPM (Recommended)
```bash
npm install -g @localacct/iron-anarchy-minecraft-bot
npx @localacct/iron-anarchy-minecraft-bot init
```

#### Method 2: Git Clone
```bash
git clone https://github.com/Localacct21/iron-anarchy-minecraft-bot.git
cd iron-anarchy-minecraft-bot
npm install
```

#### Method 3: Docker
```bash
docker run -d --name minecraft-bot \
  -e MC_SERVER_HOST=ironanarchy.lol \
  -e MC_BOT_USERNAME=YourBot \
  localacct/iron-anarchy-minecraft-bot
```

For detailed installation instructions, see: [📖 Installation Guide](wiki/guides/Installation-ESM.md)

## 🚀 Quick Start

### 1. Basic Setup
```bash
# Copy configuration template
cp .env.example .env

# Edit with your settings
nano .env
```

### 2. Start Bot (ESM Compatible)
```bash
# Basic bot with ESM support (recommended for beginners)
npm run basic

# Enhanced bot with full features
npm run enhanced

# Discord-integrated bot
npm run discord
```

### 3. Verify Connection
```bash
# Check logs
tail -f logs/bot.log

# Test web interface (if enabled)
curl http://localhost:3001
```

## 🤖 Bot Types

### Basic Bot (`npm run basic`)
**File**: `src/bots/bot-fixed.js`
- ✅ ESM-compatible plugin loading
- ✅ Auto-eat functionality
- ✅ Basic pathfinding and PvP
- ✅ Minimal resource usage (~150MB)
- ✅ Perfect for testing and development

### Enhanced Bot (`npm run enhanced`)
**File**: `src/bots/ironanarchy-bot-fixed.js`
- ✅ Full ESM support
- ✅ Web inventory interface
- ✅ Recording capabilities
- ✅ Advanced plugin management
- ✅ Production-ready (~400MB)

### Discord Bot (`npm run discord`)
**File**: `src/bots/enhanced-discord-bot.js`
- ✅ Discord integration
- ✅ Command interface
- ✅ Real-time status updates
- ✅ Cross-platform communication

## 🔧 ESM Compatibility

### What is ESM?
ES Modules (ESM) are the official JavaScript module system. Many modern npm packages are ESM-only, requiring special handling in CommonJS projects.

### ESM-Compatible Packages
| Package | Version | Status |
|---------|---------|--------|
| mineflayer-auto-eat | 5.0.0+ | ESM-only |
| mineflayer-collectblock | 2.0.0+ | ESM-only |
| mineflayer-dashboard | 2.0.0+ | ESM-only |

### How It Works
Our fixed bot files use dynamic imports to handle ESM modules:

```javascript
// Graceful ESM loading
try {
  const autoEatModule = await import('mineflayer-auto-eat')
  const autoEat = autoEatModule.plugin || autoEatModule.default
  bot.loadPlugin(autoEat)
  console.log('✅ Auto-eat loaded (ESM)')
} catch (error) {
  console.log('⚠️ Auto-eat not available:', error.message)
}
```

### Migration from v2.0.3
```bash
# Old way
npm start

# New way (ESM compatible)
npm run basic
```

For complete ESM documentation:
- [🔧 ESM Compatibility Guide](wiki/guides/ESM-Compatibility-Guide.md)
- [🤖 Fixed Bot Files Guide](wiki/guides/Fixed-Bot-Files-Guide.md)
- [🔄 Migration Guide](wiki/guides/Migration-Guide.md)

## ⚙️ Configuration

### Environment Variables (.env)
```bash
# Server Configuration
MC_SERVER_HOST=ironanarchy.lol
MC_SERVER_PORT=25565
MC_SERVER_VERSION=1.21.4

# Bot Authentication
MC_BOT_USERNAME=YourBotName
MC_BOT_AUTH=microsoft

# ESM Configuration
USE_ESM_PLUGINS=true
ESM_PLUGIN_TIMEOUT=30000
FALLBACK_TO_CJS=true

# Discord (Optional)
DISCORD_TOKEN=your_token_here
DISCORD_CHANNEL_ID=your_channel_id

# Features
WEB_DASHBOARD_PORT=3001
RECORDING_ENABLED=true
LOG_LEVEL=info
```

### Configuration File (config.json)
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
      "startAt": 14
    },
    "collectBlock": {
      "enabled": true,
      "esm": true
    }
  }
}
```

## 💻 Usage

### Starting Different Bot Types
```bash
# ESM-compatible basic bot
npm run basic

# Enhanced bot with full features
npm run enhanced

# Discord-integrated bot
npm run discord

# Advanced AI bot
npm run advanced

# Custom configuration
CONFIG_FILE=custom.json npm run basic
```

### Available Scripts
```bash
npm run start       # Default bot
npm run basic       # ESM-compatible basic bot
npm run enhanced    # ESM-compatible enhanced bot
npm run discord     # Discord-integrated bot
npm run test        # Run all tests
npm run test:esm    # Test ESM compatibility
npm run setup       # Initial setup
npm run validate    # Validate configuration
```

### Web Interface
Access the web inventory at: http://localhost:3001
- View bot inventory
- Monitor bot status
- Execute commands
- View performance metrics

### Discord Commands
```
!status         - Bot status
!inventory      - Show inventory
!health         - Health information
!location       - Current location
!help           - Available commands
```

## 📊 Monitoring

### Log Files
```bash
# Bot logs
tail -f logs/bot.log

# Error logs
tail -f logs/error.log

# Discord logs (if enabled)
tail -f logs/discord.log

# Performance logs
tail -f logs/performance.log
```

### Health Checks
```bash
# Check bot status
npm run validate

# Test ESM compatibility
npm run test:esm

# Run diagnostics
node scripts/health-check.js

# Monitor resources
top -p $(pgrep -f "node.*bot")
```

### Performance Monitoring
- Memory usage tracking
- CPU utilization monitoring
- Network connection status
- Plugin load times
- Error rate tracking

## 🐛 Troubleshooting

### Common ESM Issues

#### Issue: "require() of ES modules is not supported"
```bash
# Solution: Use ESM-compatible bot
npm run basic
```

#### Issue: Plugin not loading
```bash
# Check Node.js version (14.0.0+ required)
node --version

# Test ESM support
node -e "import('mineflayer-auto-eat').then(console.log)"

# Use fixed bot files
npm run basic
```

#### Issue: Memory problems
```bash
# Increase memory limit
export NODE_OPTIONS="--max-old-space-size=2048"
npm run basic
```

### Debug Commands
```bash
# Enable debug mode
DEBUG=* npm run basic

# Test plugin compatibility
npm run test:plugin

# Validate configuration
node scripts/validate-config.js

# ESM compatibility test
npm run test:esm
```

### Getting Help
1. **Check Logs**: Review `logs/bot.log` and `logs/error.log`
2. **Run Diagnostics**: Use `npm run test:esm`
3. **GitHub Issues**: https://github.com/Localacct21/iron-anarchy-minecraft-bot/issues
4. **Discord Community**: [Join our Discord]
5. **Email Support**: localacct@ironanarchy.lol

For comprehensive troubleshooting:
- [🔧 ESM Troubleshooting Guide](wiki/guides/ESM-Troubleshooting-Guide.md)
- [🐛 General Troubleshooting](TROUBLESHOOTING.md)

## 📚 Documentation

### Core Documentation
- [📖 Installation Guide](wiki/guides/Installation-ESM.md) - Complete installation instructions
- [⚙️ Configuration Guide](CONFIGURATION.md) - Detailed configuration options
- [🚀 Quick Start](wiki/guides/Quick-Start.md) - Get started in 5 minutes
- [🏗️ Architecture](STRUCTURE.md) - Project structure and architecture

### ESM Compatibility (NEW)
- [🔧 ESM Compatibility Guide](wiki/guides/ESM-Compatibility-Guide.md) - Complete ESM implementation
- [🤖 Fixed Bot Files Guide](wiki/guides/Fixed-Bot-Files-Guide.md) - ESM-compatible bot files
- [🔄 Migration Guide](wiki/guides/Migration-Guide.md) - Upgrade from previous versions
- [🐛 ESM Troubleshooting](wiki/guides/ESM-Troubleshooting-Guide.md) - ESM-specific issues

### Development
- [🛠️ Contributing](CONTRIBUTING.md) - How to contribute
- [🔒 Security](SECURITY.md) - Security policies
- [📝 Code of Conduct](CODE_OF_CONDUCT.md) - Community guidelines
- [📊 API Reference](wiki/developer/API-Reference.md) - Complete API documentation

### Additional Resources
- [📖 Complete Wiki](wiki/Table-of-Contents.md) - All documentation
- [🎯 Examples](examples/) - Usage examples
- [🧪 Tests](tests/) - Test files and examples
- [📦 Docker](deployment/docker/) - Docker configurations

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** (ensure ESM compatibility)
4. **Test thoroughly**: `npm run test && npm run test:esm`
5. **Submit a pull request**

### Development Setup
```bash
# Clone and install
git clone https://github.com/Localacct21/iron-anarchy-minecraft-bot.git
cd iron-anarchy-minecraft-bot
npm install

# Run tests
npm test
npm run test:esm

# Start in development mode
npm run basic
```

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🏆 Acknowledgments

- **Mineflayer Community** - For the excellent Minecraft bot framework
- **ESM Plugin Developers** - For creating modern, modular plugins
- **Discord.js Team** - For the powerful Discord integration library
- **Iron-Anarchy Server** - For providing the testing environment
- **Contributors** - Everyone who has contributed to this project

## 📞 Support & Contact

- **GitHub Issues**: https://github.com/Localacct21/iron-anarchy-minecraft-bot/issues
- **Discord Community**: [Join our Discord server]
- **Email**: localacct@ironanarchy.lol
- **Documentation**: [Complete Wiki](wiki/Table-of-Contents.md)

## 🗺️ Roadmap

### Upcoming Features
- [ ] **Enhanced AI** - GPT integration for smarter decision making
- [ ] **Multi-Server Support** - Connect to multiple servers simultaneously
- [ ] **Advanced Recording** - Video recording and replay system
- [ ] **Plugin Marketplace** - Community plugin sharing platform
- [ ] **Mobile Dashboard** - Mobile-friendly web interface

### ESM Improvements
- [ ] **Full ESM Migration** - Convert entire codebase to ESM
- [ ] **Plugin Hot-Reload** - Live plugin updates without restart
- [ ] **ESM Plugin SDK** - Development kit for ESM plugins
- [ ] **Auto-Migration Tool** - Automated CommonJS to ESM migration

---

**Built with ❤️ by the Iron-Anarchy community**

*Professional Minecraft automation for the modern age*

[![GitHub stars](https://img.shields.io/github/stars/Localacct21/iron-anarchy-minecraft-bot.svg?style=social&label=Star)](https://github.com/Localacct21/iron-anarchy-minecraft-bot)
[![Follow on GitHub](https://img.shields.io/github/followers/Localacct21.svg?style=social&label=Follow)](https://github.com/Localacct21)
