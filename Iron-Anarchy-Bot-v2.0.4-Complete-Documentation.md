# 🤖 Iron-Anarchy Minecraft Bot v2.0.4 - Complete Documentation Package

**Release Date**: January 6, 2025  
**Version**: 2.0.4  
**Author**: Local Acct <localacct@ironanarchy.lol>  
**Repository**: https://github.com/Localacct21/iron-anarchy-minecraft-bot

---

## 📋 Table of Contents

1. [README - Project Overview](#readme---project-overview)
2. [CHANGELOG - Version History](#changelog---version-history)
3. [CONFIGURATION - Setup Guide](#configuration---setup-guide)
4. [CONTRIBUTING - Development Guide](#contributing---development-guide)
5. [TROUBLESHOOTING - Problem Resolution](#troubleshooting---problem-resolution)
6. [API REFERENCE - Developer Documentation](#api-reference---developer-documentation)
7. [FEATURES OVERVIEW - Capabilities](#features-overview---capabilities)
8. [USAGE EXAMPLES - Practical Applications](#usage-examples---practical-applications)
9. [USER GUIDE - Complete Manual](#user-guide---complete-manual)
10. [TROUBLESHOOTING GUIDE - Detailed Solutions](#troubleshooting-guide---detailed-solutions)

---

# README - Project Overview

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

---

# CHANGELOG - Version History

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.4] - 2025-01-06

### 🔧 Fixed
- **ESM Compatibility**: Resolved all ES Module compatibility issues with `mineflayer-auto-eat@5.0.2` and `mineflayer-collectblock`
  - Fixed `require() of ES Module` errors by implementing dynamic import statements
  - Ensured proper async/await handling for ES module initialization
  - Added fallback mechanisms for mixed CommonJS/ESM environments
- **Configuration Paths**: Fixed incorrect configuration file paths in all bot scripts (`./config.json` → `../../config/config.json`)
  - Updated `src/bots/ironanarchy-bot-fixed.js` with correct relative paths
  - Updated `src/bots/bot-fixed.js` with proper configuration resolution
  - Fixed path resolution across all bot initialization scripts
- **Plugin Loading**: Improved plugin loading with better error handling and fallbacks
  - Enhanced validation for plugin compatibility
  - Added graceful degradation for failed plugin loads
  - Implemented retry mechanisms for transient loading failures
- **Bloodhound Plugin**: Fixed plugin extraction and loading mechanism
- **Web Inventory**: Enhanced error handling for port conflicts and initialization

### 🆕 Added
- **New Fixed Bot Scripts**: 
  - `src/bots/ironanarchy-bot-fixed.js` - Full-featured bot with ESM compatibility and all plugins
  - `src/bots/bot-fixed.js` - Basic bot with essential plugins and streamlined initialization
- **Dynamic Import Support**: Smart loading of ES modules alongside CommonJS modules
  - Implemented `import()` statements for ES modules (mineflayer-auto-eat, mineflayer-collectblock)
  - Maintained backward compatibility with CommonJS modules
  - Added module type detection and appropriate loading strategies
- **Async Bot Initialization**: Updated `index.js` to handle async bot creation
  - Full async/await support for modern ES modules
  - Proper error handling in async initialization chains
  - Sequential plugin loading with dependency resolution
- **Enhanced Error Handling**: Comprehensive error messages and graceful plugin loading failures
- **Detailed Logging**: Improved startup progress logging with emoji indicators

### 🚀 Improved
- **Package.json Scripts**: Updated to use fixed bot scripts for reliability
- **Plugin Loading System**: Enhanced validation and error recovery
- **Configuration Management**: Better path resolution and error handling
- **Modern ES Module Support**: Full async/await compatibility for ES6+ development
  - Proper promise handling in plugin initialization
  - Streamlined async operations throughout the bot lifecycle
  - Enhanced error propagation in async contexts
- **Documentation**: Updated README with latest fixes and installation instructions

### 🧪 Testing - 100% Success Rate (16/16 Tests Passing)
- ✅ **ESM Module Loading**: All ES modules loading successfully (6/6 tests)
- ✅ **CommonJS Compatibility**: All CommonJS modules working correctly (4/4 tests)
- ✅ **Plugin Loader Tests**: Complete plugin system validation (6/6 tests)
- ✅ **Discord Integration Tests**: Full Discord bot functionality (10/10 tests)
- ✅ **Startup Tests**: Bot initialization and configuration loading (all passing)
- ✅ **Configuration Tests**: Path resolution and file loading validation (all passing)
- ✅ **Installation Validation**: Complete setup process verification (all passing)

### 🔄 Migration Guide
- No breaking changes for existing users
- Configuration files automatically created with `npm run setup`
- Existing configurations remain compatible
- New users benefit from improved stability
- Async/await patterns now fully supported for custom plugin development

### 📦 Dependencies
- All dependencies remain at current versions
- Enhanced compatibility with ES modules
- Improved error handling for version mismatches
- Full support for mixed CommonJS/ESM environments

## [2.0.3] - Previous Release
- Initial feature-complete release
- Basic plugin system implementation
- Docker deployment support
- Discord integration
- Recording capabilities

---

## Release Notes

### v2.0.4 - The Stability Release

This release focuses on resolving compatibility issues and improving the overall stability of the bot. The main achievement is solving the persistent ESM (ES Module) compatibility problems that were preventing the bot from starting in many environments.

**Key Achievements:**
- 🎯 **Zero ESM Errors**: Complete resolution of `require() of ES Module` errors
- 🔧 **All Plugins Working**: Every plugin now loads successfully with proper async/await support
- 📊 **100% Test Success**: All 16 tests passing for the first time (16/16 success rate)
- 🚀 **Improved Reliability**: Enhanced error handling and fallback mechanisms
- ⚡ **Modern ES Module Support**: Full async/await compatibility for contemporary JavaScript development

**Technical Improvements:**
- Dynamic `import()` statements for ES modules (mineflayer-auto-eat, mineflayer-collectblock)
- Proper async/await handling in bot initialization and plugin loading
- Corrected relative path resolution for configuration files (`../../config/config.json`)
- Enhanced plugin validation and loading logic with retry mechanisms
- Fixed bot scripts: `ironanarchy-bot-fixed.js` and `bot-fixed.js`

**ESM Compatibility Fixes:**
- **mineflayer-auto-eat**: Resolved ES Module import issues with dynamic imports
- **mineflayer-collectblock**: Fixed module loading with proper async handling
- **Configuration paths**: Corrected all bot scripts to use proper relative paths
- **Plugin loading**: Enhanced error handling with graceful fallbacks

This release represents a major milestone in the project's stability and usability. Users can now deploy the bot with confidence that all features will work as intended, with full support for modern JavaScript ES modules and async/await patterns.

---

# CONFIGURATION - Setup Guide

# 🔧 Configuration Guide

## Overview

The Iron Anarchy Minecraft Bot supports multiple configuration methods for maximum flexibility.

## Configuration Files

### Primary Config (`config/config.json`)

```json
{
  "bot": {
    "username": "IronAnarchyBot",
    "auth": "offline",
    "reconnect": true,
    "reconnectDelay": 5000
  },
  "server": {
    "host": "your-server.com",
    "port": 25565,
    "version": "1.19.2"
  },
  "features": {
    "autoEat": true,
    "pathfinding": true,
    "autoArmor": true,
    "pvp": true,
    "collectItems": true
  },
  "discord": {
    "enabled": true,
    "token": "YOUR_DISCORD_BOT_TOKEN",
    "guildId": "YOUR_GUILD_ID",
    "channelId": "YOUR_CHANNEL_ID"
  },
  "web": {
    "enabled": true,
    "port": 3000,
    "host": "0.0.0.0"
  }
}
```

## Environment Variables

```bash
# Bot Authentication
MINECRAFT_USERNAME=YourBotUsername
MINECRAFT_PASSWORD=YourPassword  # Only for Microsoft auth

# Discord Integration
DISCORD_TOKEN=your_discord_bot_token
DISCORD_GUILD_ID=your_guild_id
DISCORD_CHANNEL_ID=your_channel_id

# Server Connection
MINECRAFT_HOST=your-server.com
MINECRAFT_PORT=25565
MINECRAFT_VERSION=1.19.2

# Web Interface
WEB_PORT=3000
WEB_HOST=0.0.0.0
```

## Security Configuration

### Authentication Modes

- **Offline Mode**: No authentication required
- **Microsoft Account**: Full Microsoft authentication
- **Mojang Legacy**: Legacy Mojang authentication (deprecated)

### Security Best Practices

1. Use environment variables for sensitive data
2. Enable authentication when possible
3. Restrict web interface access
4. Use strong Discord bot permissions

## Advanced Options

See the example configurations in the `examples/` directory for more advanced setups.

---

# CONTRIBUTING - Development Guide

# 🤝 Contributing to Iron Anarchy Minecraft Bot

We welcome contributions from the community! This guide will help you get started.

## 🚀 Quick Start

1. **Fork the repository**
2. **Clone your fork**:
   ```bash
   git clone https://github.com/your-username/iron-anarchy-minecraft-bot.git
   cd iron-anarchy-minecraft-bot
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Create a feature branch**:
   ```bash
   git checkout -b feature/amazing-feature
   ```

## 🛠️ Development Workflow

### Setting Up Development Environment

```bash
# Install development dependencies
npm install

# Run tests
npm test

# Start in development mode
npm run enhanced

# Run linting
npm run lint

# Format code
npm run format
```

### Code Quality Standards

We maintain high code quality standards:

- **ESLint**: All code must pass linting
- **Prettier**: Code must be properly formatted
- **Tests**: New features require tests
- **Documentation**: Update docs for new features

### Running Tests

```bash
# Run all tests
npm test

# Run specific test files
npm run test:plugin
npm run test:discord

# Run with coverage
npm run test:coverage
```

## 📝 Pull Request Process

1. **Ensure all tests pass**
2. **Update documentation** if needed
3. **Follow commit message conventions**:
   ```
   feat: add new plugin system
   fix: resolve connection timeout issue
   docs: update configuration guide
   test: add unit tests for pathfinding
   ```
4. **Create a descriptive pull request**

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tests pass
- [ ] Manual testing completed
- [ ] No breaking changes

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] Tests added/updated
```

## 🎯 Contributing Areas

### 🔌 Plugin Development

Create new plugins to extend bot functionality:

```javascript
// plugins/example-plugin/index.js
module.exports = function(bot, options) {
  bot.on('spawn', () => {
    console.log('Plugin loaded!')
  })
  
  return {
    name: 'example-plugin',
    version: '1.0.0',
    stop: () => {
      // Cleanup logic
    }
  }
}
```

### 🧪 Testing

Help improve test coverage:

- Unit tests for core functionality
- Integration tests for plugins
- End-to-end deployment tests

### 📚 Documentation

Improve documentation:

- API documentation
- Configuration guides
- Troubleshooting tips
- Usage examples

### 🐛 Bug Reports

When reporting bugs, include:

- Bot version
- Node.js version
- Operating system
- Configuration (sanitized)
- Steps to reproduce
- Expected vs actual behavior

## 🔒 Security

If you discover security vulnerabilities:

1. **Do not** create a public issue
2. Email [localacct@ironanarchy.lol](mailto:localacct@ironanarchy.lol)
3. Include detailed description
4. Wait for response before disclosure

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🏆 Recognition

Contributors will be recognized in:

- README.md contributors section
- Release notes
- GitHub contributors page

Thank you for contributing to Iron Anarchy Minecraft Bot! 🤖

---

# TROUBLESHOOTING - Problem Resolution

# 🔧 Troubleshooting Guide

## Common Issues

### Connection Problems

**Issue**: Bot fails to connect to server
```
Error: connect ECONNREFUSED
```

**Solutions**:
1. Verify server host and port
2. Check firewall settings
3. Ensure server allows bot connections
4. Try different Minecraft version

### Authentication Issues

**Issue**: Authentication failed
```
Error: Invalid credentials
```

**Solutions**:
1. Use correct authentication mode
2. Verify Microsoft account credentials
3. Check if account has Minecraft license
4. Try offline mode for testing

### Discord Integration

**Issue**: Discord bot not responding
```
Error: Missing Access
```

**Solutions**:
1. Verify Discord bot token
2. Check bot permissions
3. Ensure bot is in correct guild
4. Verify channel permissions

### Plugin Loading Errors

**Issue**: Plugin fails to load
```
Error: Plugin not found
```

**Solutions**:
1. Check plugin file path
2. Verify plugin compatibility
3. Review plugin dependencies
4. Check file permissions

## Performance Issues

### High Memory Usage
- Reduce plugin count
- Optimize pathfinding settings
- Limit inventory operations

### Connection Lag
- Check network connection
- Reduce update frequencies
- Use closer server regions

## Getting Help

1. Check the logs in `logs/` directory
2. Review configuration files
3. Join our Discord community
4. Open an issue on GitHub

## Health Checks

Run diagnostic commands:
```bash
npm run test:startup
npm run validate
```

## Log Analysis

Check log files for detailed error information:
```bash
tail -f logs/bot.log
tail -f logs/error.log
```

## ESM-Related Issues

### ESM Module Loading Errors

**Issue**: Cannot load ESM-only plugins
```
Error [ERR_REQUIRE_ESM]: require() of ES modules is not supported
```

**Solutions**:
1. Use ESM-compatible bot files:
   ```bash
   npm run basic           # Basic ESM-compatible bot
   npm run enhanced        # Enhanced ESM-compatible bot
   ```
2. Verify Node.js version (14.0.0+ required):
   ```bash
   node --version
   ```
3. Test ESM plugin loading:
   ```bash
   node -e "import('mineflayer-auto-eat').then(console.log).catch(console.error)"
   ```

### Plugin Compatibility Issues

**Issue**: Mixed CommonJS and ESM plugins
```
TypeError: plugin is not a function
```

**Solutions**:
1. Use fixed bot files that handle both types
2. Check plugin export patterns:
   ```javascript
   const plugin = module.default || module.plugin || module
   ```
3. Verify plugin versions:
   ```bash
   npm list | grep mineflayer
   ```

### Dynamic Import Failures

**Issue**: Dynamic imports not working
```
SyntaxError: Unexpected token '('
```

**Solutions**:
1. Update Node.js to 14.0.0+
2. Use async/await properly:
   ```javascript
   async function loadPlugin() {
     const module = await import('plugin-name')
     return module.default
   }
   ```

## ESM Diagnostic Commands

```bash
# Test ESM support
node -e "console.log(typeof import)"

# Test specific ESM plugin
node -e "import('mineflayer-auto-eat').then(m => console.log('✅ ESM works')).catch(console.error)"

# Run ESM compatibility test
npm run test:esm

# Check bot with ESM support
npm run basic
```

## ESM Resources

- [ESM Compatibility Guide](wiki/guides/ESM-Compatibility-Guide.md)
- [ESM Troubleshooting Guide](wiki/guides/ESM-Troubleshooting-Guide.md)
- [Fixed Bot Files Guide](wiki/guides/Fixed-Bot-Files-Guide.md)
- [Migration Guide](wiki/guides/Migration-Guide.md)

---

# API REFERENCE - Developer Documentation

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
**Contact**: <localacct@ironanarchy.lol>

---

# FEATURES OVERVIEW - Capabilities

# 🚀 Bot Features Overview

## 🎯 Core Capabilities

### ⚔️ Advanced PvP System

- **Intelligent Combat AI** - Smart target selection and engagement
- **Defensive Mechanisms** - Auto-response to attacks
- **Guard Mode** - Automatic protection against hostile mobs
- **Combat Tracking** - Real-time battle statistics
- **Equipment Optimization** - Auto-armor management

### 🗺️ Sophisticated Pathfinding

- **A* Algorithm** - Optimal route calculation
- **Obstacle Navigation** - Smart barrier avoidance
- **Multi-Level Movement** - Vertical pathfinding support
- **Parkour Capabilities** - Advanced movement techniques
- **Dynamic Replanning** - Adaptive route adjustment
- **Terrain Analysis** - Safe vs dangerous area detection

### 🤖 Intelligent Automation

- **Auto-Eating** - Smart hunger management
- **Auto-Reconnection** - Resilient connection handling
- **Anti-AFK** - Subtle movement to prevent kicks
- **Resource Gathering** - Automated block collection
- **Inventory Management** - Smart item organization

## 🌐 Connectivity Features

### 💬 Discord Integration

- **Chat Bridging** - Seamless Minecraft ↔ Discord communication
- **Rich Embeds** - Beautiful formatted status updates
- **Remote Control** - Execute bot commands from Discord
- **Real-time Monitoring** - Live bot status in Discord
- **Event Notifications** - Important alerts and updates

### 🖥️ Web Interfaces

- **Inventory Viewer** - Browser-based inventory management
- **Dashboard** - Real-time monitoring interface
- **Statistics** - Performance metrics and analytics
- **Remote Access** - Control bot from anywhere

## 📊 Monitoring & Analytics

### 📝 Comprehensive Logging

- **Multi-Level Logging** - DEBUG, INFO, WARN, ERROR levels
- **Color-Coded Output** - Easy-to-read console messages
- **File-Based Storage** - Persistent log history
- **Event Categorization** - Chat, PvP, Movement, System logs
- **Performance Metrics** - Resource usage tracking

### 📹 Session Recording

- **Complete Event Capture** - Every action recorded
- **JSON Format** - Structured, analyzable data
- **Position Tracking** - Movement history
- **Health Monitoring** - Vital signs logging
- **Interaction Logs** - Player and environment interactions

## 🔧 Plugin Architecture

### 🔌 Validated Plugin System

| Plugin | Function | Status |
|--------|----------|---------|
| **mineflayer-pathfinder** | Advanced movement and navigation | ✅ Validated |
| **mineflayer-pvp** | Combat mechanics and targeting | ✅ Validated |
| **mineflayer-auto-eat** | Automatic food consumption | ✅ Validated |
| **mineflayer-armor-manager** | Equipment optimization | ✅ Validated |
| **mineflayer-collectblock** | Resource gathering automation | ✅ Validated |
| **mineflayer-bloodhound** | Entity tracking and detection | ✅ Validated |
| **mineflayer-web-inventory** | Web-based inventory interface | ✅ Validated |
| **mineflayer-dashboard** | Real-time monitoring dashboard | ✅ Optional |

### 🛡️ Error Handling & Validation

- **Plugin Validation** - Ensures compatibility before loading
- **Graceful Degradation** - Continues operation if optional plugins fail
- **Error Recovery** - Automatic plugin reload attempts
- **Compatibility Checks** - Version and dependency validation

## 🎮 Command System

### 📋 Command Categories

#### Movement Commands

- `!come` - Navigate to player
- `!follow [player]` - Follow target
- `!stop` - Halt all actions
- `!pos` - Report position

#### Combat Commands  

- `!attack <target>` - Engage enemy
- `!guard` - Toggle protection mode
- `!health` - Status report

#### Utility Commands

- `!inv` - Inventory display
- `!collect <item> [amount]` - Gather resources
- `!status` - Comprehensive overview
- `!players` - Online user list
- `!plugins` - System status
- `!help` - Command reference

### 🔄 Smart Command Processing

- **Context Awareness** - Commands adapt to current situation
- **Parameter Validation** - Input sanitization and verification
- **Error Messages** - Helpful feedback for invalid commands
- **Permission System** - Configurable access control
- **Command Queuing** - Handle multiple simultaneous requests

## 🔒 Security & Reliability

### 🛡️ Security Features

- **Input Sanitization** - Prevent command injection
- **Rate Limiting** - Prevent command spam
- **Authentication** - Configurable access control
- **Safe Execution** - Sandboxed command processing

### 🔄 Reliability Mechanisms

- **Auto-Reconnection** - Exponential backoff retry logic
- **State Persistence** - Remember settings across restarts
- **Error Recovery** - Graceful handling of failures
- **Health Monitoring** - Self-diagnostic capabilities
- **Failsafe Modes** - Degraded operation when needed

## ⚙️ Configuration System

### 📊 Flexible Settings

```javascript
// Server Configuration
{
  "server": {
    "host": "minecraft.server.com",
    "port": 25565,
    "version": "1.19.2"
  },
  "bot": {
    "username": "MyBot",
    "auth": "offline"
  }
}

// Feature Configuration
{
  "features": {
    "autoEat": {
      "enabled": true,
      "startAt": 14,
      "priority": "foodPoints"
    },
    "pathfinding": {
      "allowParkour": true,
      "canDig": true,
      "maxDistance": 64
    },
    "combat": {
      "autoDefend": true,
      "attackRange": 4,
      "followRange": 2
    }
  }
}
```

### 🎯 Environment-Specific Configs

- **Development Mode** - Enhanced logging and debugging
- **Production Mode** - Optimized performance settings
- **PvP Server Mode** - Aggressive combat settings
- **Peaceful Mode** - Exploration and building focus

## 📈 Performance Optimization

### ⚡ Efficiency Features

- **Event Throttling** - Prevents excessive processing
- **Memory Management** - Efficient resource usage
- **CPU Optimization** - Smart task scheduling
- **Network Efficiency** - Minimal bandwidth usage
- **Caching Systems** - Fast data retrieval

### 📊 Performance Metrics

- **Response Time** - Command execution speed
- **Memory Usage** - RAM consumption tracking
- **CPU Utilization** - Processing load monitoring
- **Network Stats** - Bandwidth and latency metrics
- **Plugin Performance** - Individual plugin efficiency

## 🌟 Advanced Features

### 🧠 AI Behaviors

- **Threat Assessment** - Intelligent danger evaluation
- **Opportunity Recognition** - Resource and advantage detection
- **Behavioral Adaptation** - Learning from interactions
- **Predictive Pathfinding** - Anticipate player movements
- **Strategic Positioning** - Optimal combat placement

### 🎯 Specialized Modes

- **Iron Anarchy Mode** - PvP server optimization
- **Creative Mode** - Building assistance
- **Survival Mode** - Resource management focus
- **Exploration Mode** - Discovery and mapping
- **Guard Mode** - Base protection specialization

### 🔮 Future-Ready Architecture

- **Plugin API** - Custom functionality extensions
- **Event System** - Reactive programming model
- **Modular Design** - Easy feature addition/removal
- **Update Mechanism** - Automatic enhancement deployment
- **Community Integration** - Shared configurations and scripts

## 🎪 Use Case Examples

### 🏰 Base Protection

```javascript
// Automated base defense
!guard  // Enable protection mode
// Bot patrols area, attacks hostiles, protects structures
```

### ⛏️ Resource Farming

```javascript
// Automated mining operation
!collect diamond_ore 10
!collect iron_ore 64
!collect coal 128
// Bot efficiently gathers specified resources
```

### 👥 Player Assistance

```javascript
// Personal assistant mode
!follow PlayerName    // Follow and protect
!come                // Come when called
!attack Griefer      // Defend against threats
```

### 📡 Server Monitoring

```javascript
// Real-time server insights
!players             // Population tracking
!status              // Resource monitoring
// Discord notifications for events
```

This feature overview demonstrates the bot's comprehensive capabilities and advanced automation features!

---

# USAGE EXAMPLES - Practical Applications

# 🎮 Bot Usage Examples

## 📝 Chat Command Examples

### Basic Movement

```
<Player> !come
<Bot> 🏃 Coming to Player

<Player> !follow Steve
<Bot> 🏃 Following Steve

<Player> !stop
<Bot> 🛑 Stopped all actions
```

### Combat Scenarios

```
<Player> !attack Griefer123
<Bot> ⚔️ Attacking Griefer123!

<Player> !guard
<Bot> 🛡️ Guard mode enabled - will attack hostile mobs nearby

<Player> !health
<Bot> ❤️ Health: 18/20 [█████████░]
<Bot> 🍖 Food: 14/20 [███████░░░]
```

### Resource Management

```
<Player> !collect cobblestone 64
<Bot> ⛏️ Collecting 32x cobblestone
<Bot> ✅ Finished collecting 32x cobblestone

<Player> !inv
<Bot> 🎒 Inventory: 32x cobblestone, 16x dirt, 8x bread, 1x iron_sword...
```

### Information Queries

```
<Player> !status
<Bot> 📊 Status: Following Player
<Bot> 📍 Position: X=123, Y=64, Z=-456
<Bot> 👥 Players online: 5

<Player> !players
<Bot> 👥 Players online: Player, Steve, Alex, Herobrine

<Player> !plugins
<Bot> 🔌 All plugins loaded and validated!
```

## 🤖 Discord Integration Examples

### Discord Status Command

```
User: !status
Bot: 🔥 Iron-Anarchy Bot Status
     Server: ironanarchy.lol
     Health: 20/20 ❤️
     Food: 18/20 🍖
     Recording: 📹 ON
     Players Online: 12
```

### Discord Chat Bridge

```
[Discord] <User> Hello from Discord!
→ Sent to Minecraft chat

[Minecraft] <Player> Hi Discord users!
→ Sent to Discord channel
```

### Discord Bot Control

```
User: !say Hello everyone!
Bot: ✅ Sent to Minecraft: "Hello everyone!"
```

## 🎯 Advanced Usage Scenarios

### Automated Base Defense

```javascript
// Enable guard mode for base protection
!guard
🛡️ Guard mode enabled - will attack hostile mobs nearby

// Bot automatically attacks:
// - Zombies, Skeletons, Creepers
// - Hostile players within range
// - Entities threatening the area
```

### Resource Gathering Session

```
<Player> !collect oak_log 20
<Bot> ⛏️ Collecting 15x oak_log
<Bot> ✅ Finished collecting 15x oak_log

<Player> !collect cobblestone 64
<Bot> ⛏️ Collecting 64x cobblestone
<Bot> ✅ Finished collecting 64x cobblestone

<Player> !inv
<Bot> 🎒 Inventory: 64x cobblestone, 15x oak_log, 12x bread...
```

### Combat Training

```
<Player> !attack TrainingDummy
<Bot> ⚔️ Attacking TrainingDummy!
[Bot automatically uses combat skills]

<Player> !health
<Bot> ❤️ Health: 16/20 [████████░░]
<Bot> 🍖 Food: 12/20 [██████░░░░]
[Bot auto-eats to restore food]

<Player> !stop
<Bot> 🛑 All actions stopped
```

## 🔄 Auto-Reconnect Examples

### Connection Lost Scenario

```
[ERROR] Bot disconnected from server
[INFO] Attempting to reconnect in 5 seconds... (1/10)
[INFO] Reconnection successful!
[SUCCESS] 🔥 Enhanced bot connected to Iron-Anarchy!
```

### Progressive Backoff

```
Attempt 1: 5 seconds delay
Attempt 2: 10 seconds delay  
Attempt 3: 20 seconds delay
Attempt 4: 40 seconds delay
Attempt 5+: 60 seconds delay (maximum)
```

## 🎮 Pathfinding Examples

### Complex Navigation

```
<Player> !come
<Bot> 🏃 Coming to Player
[Bot navigates around buildings, up stairs, through doorways]
[Pathfinding complete - Bot arrives at player location]
```

### Obstacle Avoidance

```javascript
// Bot automatically:
// - Finds optimal path around lava
// - Jumps over fences and walls
// - Digs through dirt if necessary  
// - Avoids dangerous blocks
// - Uses parkour movements when needed
```

## 📊 Monitoring Examples

### Health Monitoring

```
[INFO] Health: 20/20, Food: 20/20 - Optimal condition
[INFO] Health: 14/20, Food: 8/20 - Auto-eating activated
[SUCCESS] Health: 18/20, Food: 16/20 - Recovery complete
```

### Combat Logging

```
[PVP] Attacking hostile mob: zombie
[PVP] Bot took damage! Health: 16/20
[PVP] Combat complete - Enemy defeated
[SUCCESS] Auto-eat activated - Food restored
```

### Performance Metrics

```
[INFO] Players online: 12
[INFO] Position: X=245, Y=64, Z=-156
[INFO] Following: PlayerName
[INFO] Guard mode: ACTIVE
[INFO] Recording: ENABLED (247 events)
```

## 🎯 Error Handling Examples

### Plugin Issues

```
❌ Failed to load mineflayer-pvp: Plugin error
✅ Attempting plugin reload...
✅ Successfully loaded: mineflayer-pvp
🎉 All plugins loaded successfully!
```

### Command Errors

```
<Player> !attack
<Bot> ⚔️ Usage: !attack <player>

<Player> !collect
<Bot> ⛏️ Usage: !collect <block_name> [amount]

<Player> !invalidcommand
<Bot> ❌ Unknown command: invalidcommand. Use !help for commands.
```

### Network Issues

```
[ERROR] Connection timeout
[INFO] Attempting to reconnect in 10 seconds... (2/10)
[ERROR] Connection failed - retrying
[INFO] Attempting to reconnect in 20 seconds... (3/10)
[SUCCESS] Reconnection successful!
```

## 🔧 Configuration Examples

### Auto-Eat Settings

```javascript
// Conservative eating (eat early)
bot.autoEat.options = {
  priority: 'foodPoints',
  startAt: 16,  // Eat at 16/20 food
  bannedFood: ['rotten_flesh']
}

// Aggressive eating (eat late)  
bot.autoEat.options = {
  priority: 'saturation',
  startAt: 10,  // Eat at 10/20 food
  bannedFood: []
}
```

### Combat Configuration

```javascript
// Defensive combat
bot.pvp.followRange = 4     // Keep distance
bot.pvp.meleeAttackRate = 0.5  // Slower attacks

// Aggressive combat
bot.pvp.followRange = 1     // Stay close
bot.pvp.meleeAttackRate = 1.0  // Fast attacks
```

## 📱 Mobile-Friendly Commands

### Quick Status Check

```
!status
📊 Status: Idle | 📍 X=123,Y=64,Z=-456 | 👥 Players: 5
```

### Emergency Commands

```
!stop     # Emergency stop
!health   # Quick health check  
!come     # Emergency recall
!help     # Quick command list
```

This comprehensive usage guide should help users understand exactly how to interact with the bot and what to expect from each command!

---

# USER GUIDE - Complete Manual

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

---

# TROUBLESHOOTING GUIDE - Detailed Solutions

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

## 📞 Support Information

- **GitHub Repository**: https://github.com/Localacct21/iron-anarchy-minecraft-bot
- **Issues**: https://github.com/Localacct21/iron-anarchy-minecraft-bot/issues
- **Wiki**: https://github.com/Localacct21/iron-anarchy-minecraft-bot/wiki
- **Email**: localacct@ironanarchy.lol

## 📜 License

This project is licensed under the MIT License.

---

**Iron-Anarchy Minecraft Bot v2.0.4 - Complete Documentation Package**  
*Generated: $(date)*  
*Total Documentation Size: $(wc -c < Iron-Anarchy-Bot-v2.0.4-Complete-Documentation.md) bytes*

