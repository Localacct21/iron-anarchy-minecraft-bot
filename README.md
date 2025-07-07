# 🏠 Iron-Anarchy Minecraft Bot

[![Version](https://img.shields.io/npm/v/@localacct/iron-anarchy-minecraft-bot.svg)](https://www.npmjs.com/package/@localacct/iron-anarchy-minecraft-bot)
[![License](https://img.shields.io/github/license/Localacct21/iron-anarchy-minecraft-bot.svg)](LICENSE)
[![Node.js](https://img.shields.io/node/v/@localacct/iron-anarchy-minecraft-bot.svg)](package.json)
[![ESM Compatible](https://img.shields.io/badge/ESM-Compatible-brightgreen.svg)](https://github.com/Localacct21/iron-anarchy-minecraft-bot/wiki/ESM-Compatibility-Guide)

**Enterprise-grade Minecraft automation solution with full ESM compatibility, Discord integration, and comprehensive documentation.**

## 🆕 Latest Updates (v2.0.4+)

### ✨ ESM Compatibility Now Available!
The bot now fully supports ES Module (ESM) packages, ensuring compatibility with modern npm packages while maintaining backward compatibility with CommonJS modules.

**🚀 Quick Start with ESM:**
```bash
git clone https://github.com/Localacct21/iron-anarchy-minecraft-bot.git
cd iron-anarchy-minecraft-bot
npm install
npm run basic  # ESM-compatible bot
```

## 📚 Documentation

### 🎯 New Users Start Here

#### Essential Guides
- **[📖 Installation Guide](https://github.com/Localacct21/iron-anarchy-minecraft-bot/wiki/Installation-ESM)** - Complete setup with ESM support
- **[🚀 Quick Start](https://github.com/Localacct21/iron-anarchy-minecraft-bot/wiki/Quick-Start)** - Get running in 5 minutes
- **[⚙️ Configuration](CONFIGURATION.md)** - Configure your bot

#### ESM Compatibility (NEW)
- **[🔧 ESM Compatibility Guide](https://github.com/Localacct21/iron-anarchy-minecraft-bot/wiki/ESM-Compatibility-Guide)** - Understanding ESM support
- **[🤖 Fixed Bot Files Guide](https://github.com/Localacct21/iron-anarchy-minecraft-bot/wiki/Fixed-Bot-Files-Guide)** - When to use ESM-compatible bots
- **[🔄 Migration Guide](https://github.com/Localacct21/iron-anarchy-minecraft-bot/wiki/Migration-Guide)** - Upgrade from older versions

### 🛠️ For Developers

#### Development Resources
- **[💻 API Reference](https://github.com/Localacct21/iron-anarchy-minecraft-bot/wiki/API-Reference)** - Complete API documentation
- **[🏗️ Architecture](https://github.com/Localacct21/iron-anarchy-minecraft-bot/wiki/Architecture)** - System architecture overview
- **[🤝 Contributing](CONTRIBUTING.md)** - How to contribute

#### Plugin Development
- **[🔌 Plugin Types](https://github.com/Localacct21/iron-anarchy-minecraft-bot/wiki/Plugin-Types)** - Available plugin types
- **[📦 Plugin API](https://github.com/Localacct21/iron-anarchy-minecraft-bot/wiki/Plugin-Api)** - Plugin development API
- **[🧪 Testing](tests/)** - Testing your plugins

### 🔧 Troubleshooting & Support

#### Problem Resolution
- **[🐛 ESM Troubleshooting](https://github.com/Localacct21/iron-anarchy-minecraft-bot/wiki/ESM-Troubleshooting-Guide)** - ESM-specific issues
- **[🔧 General Troubleshooting](TROUBLESHOOTING.md)** - Common issues and solutions
- **[📊 Performance](https://github.com/Localacct21/iron-anarchy-minecraft-bot/wiki/Performance)** - Optimization tips

#### System Administration
- **[📝 Logs](https://github.com/Localacct21/iron-anarchy-minecraft-bot/wiki/Logs)** - Understanding bot logs
- **[❤️ Health Checks](https://github.com/Localacct21/iron-anarchy-minecraft-bot/wiki/Health-Checks)** - Monitoring bot health

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

For detailed installation instructions, see: **[📖 Installation Guide](https://github.com/Localacct21/iron-anarchy-minecraft-bot/wiki/Installation-ESM)**

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
**File**: `src/bots/enhanced-ironanarchy-bot.js`
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

## 🆘 Need Help?

### Quick Solutions
- **ESM Module Issues?** → [ESM Troubleshooting Guide](https://github.com/Localacct21/iron-anarchy-minecraft-bot/wiki/ESM-Troubleshooting-Guide)
- **Installation Problems?** → [Installation Guide](https://github.com/Localacct21/iron-anarchy-minecraft-bot/wiki/Installation-ESM)
- **Plugin Not Loading?** → [Fixed Bot Files Guide](https://github.com/Localacct21/iron-anarchy-minecraft-bot/wiki/Fixed-Bot-Files-Guide)
- **General Issues?** → [Troubleshooting](TROUBLESHOOTING.md)

### Test Commands
```bash
# Test plugin loading
npm run test:plugin

# Start ESM-compatible bot
npm run basic

# Validate configuration
npm run validate

# Run startup diagnostics
npm run test:startup
```

### Community Support
- **GitHub Issues**: [Report bugs](https://github.com/Localacct21/iron-anarchy-minecraft-bot/issues)
- **Discord Community**: Join our Discord server
- **Email Support**: localacct@ironanarchy.lol

## 📊 Quick Stats

| Metric | Value |
|--------|-------|
| **Documentation Pages** | 46+ |
| **ESM Guides** | 4 |
| **Code Examples** | 100+ |
| **Supported Plugins** | 15+ |
| **Node.js Versions** | 14.0.0+ |

## 🗺️ Complete Documentation

### Core Documentation
- **[📖 Complete Wiki](https://github.com/Localacct21/iron-anarchy-minecraft-bot/wiki)** - All documentation
- **[📋 Table of Contents](https://github.com/Localacct21/iron-anarchy-minecraft-bot/wiki/Table-of-Contents)** - Complete documentation index
- **[🏗️ Project Structure](STRUCTURE.md)** - Code organization
- **[📊 Features Overview](https://github.com/Localacct21/iron-anarchy-minecraft-bot/wiki/Features-Overview)** - What the bot can do

### Technical References
- **[🔌 Plugin Types](https://github.com/Localacct21/iron-anarchy-minecraft-bot/wiki/Plugin-Types)** - Available plugins
- **[⚙️ Configuration Options](CONFIGURATION.md)** - All settings
- **[📝 API Documentation](https://github.com/Localacct21/iron-anarchy-minecraft-bot/wiki/API-Reference)** - Developer API

### Community Resources
- **[🤝 Contributing Guidelines](CONTRIBUTING.md)** - How to help
- **[🔒 Security Policy](SECURITY.md)** - Security reporting
- **[📜 Code of Conduct](CODE_OF_CONDUCT.md)** - Community rules

### Version History
- **[📝 Changelog](CHANGELOG.md)** - Version history and release notes
- **[🔄 Migration Guide](https://github.com/Localacct21/iron-anarchy-minecraft-bot/wiki/Migration-Guide)** - Upgrading between versions

## 🎯 Getting Started Checklist

### For New Users
- [ ] Read [Installation Guide](https://github.com/Localacct21/iron-anarchy-minecraft-bot/wiki/Installation-ESM)
- [ ] Configure bot with [Configuration Guide](CONFIGURATION.md)
- [ ] Start with `npm run basic`
- [ ] Test plugin compatibility with `npm run test:plugin`
- [ ] Join Discord community for support

### For Upgrading Users
- [ ] Review [Migration Guide](https://github.com/Localacct21/iron-anarchy-minecraft-bot/wiki/Migration-Guide)
- [ ] Backup current configuration
- [ ] Test with [Fixed Bot Files](https://github.com/Localacct21/iron-anarchy-minecraft-bot/wiki/Fixed-Bot-Files-Guide)
- [ ] Update to latest version
- [ ] Verify ESM compatibility

### For Developers
- [ ] Check [ESM Compatibility Guide](https://github.com/Localacct21/iron-anarchy-minecraft-bot/wiki/ESM-Compatibility-Guide)
- [ ] Review [Plugin Development](https://github.com/Localacct21/iron-anarchy-minecraft-bot/wiki/Plugin-Development)
- [ ] Test with ESM modules
- [ ] Update to dynamic imports
- [ ] Submit pull requests

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** (ensure ESM compatibility)
4. **Test thoroughly**: `npm test && npm run test:plugin`
5. **Submit a pull request**

### Development Setup
```bash
# Clone and install
git clone https://github.com/Localacct21/iron-anarchy-minecraft-bot.git
cd iron-anarchy-minecraft-bot
npm install

# Run tests
npm test
npm run test:plugin

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

**Welcome to the Iron-Anarchy community! 🎮**

*Professional Minecraft automation for the modern age*

**📖 [Browse Complete Documentation](https://github.com/Localacct21/iron-anarchy-minecraft-bot/wiki)** | **🚀 [Quick Start](https://github.com/Localacct21/iron-anarchy-minecraft-bot/wiki/Quick-Start)** | **🔧 [ESM Guide](https://github.com/Localacct21/iron-anarchy-minecraft-bot/wiki/ESM-Compatibility-Guide)**

[![GitHub stars](https://img.shields.io/github/stars/Localacct21/iron-anarchy-minecraft-bot.svg?style=social&label=Star)](https://github.com/Localacct21/iron-anarchy-minecraft-bot)
[![Follow on GitHub](https://img.shields.io/github/followers/Localacct21.svg?style=social&label=Follow)](https://github.com/Localacct21)
