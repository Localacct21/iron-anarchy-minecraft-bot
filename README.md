# 🎮 Iron-Anarchy Minecraft Bot v2.0

<div align="center">

![Bot Banner](https://capsule-render.vercel.app/api?type=waving&color=gradient&height=200&section=header&text=Iron-Anarchy%20Bot&fontSize=40&fontAlignY=35&desc=Enterprise-Grade%20Minecraft%20Automation&descAlignY=55&descAlign=center)

[![npm version](https://badge.fury.io/js/iron-anarchy-minecraft-bot.svg)](https://www.npmjs.com/package/iron-anarchy-minecraft-bot)
[![GitHub release](https://img.shields.io/github/release/Localacct21/iron-anarchy-minecraft-bot.svg)](https://github.com/Localacct21/iron-anarchy-minecraft-bot/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Downloads](https://img.shields.io/npm/dt/iron-anarchy-minecraft-bot.svg)](https://www.npmjs.com/package/iron-anarchy-minecraft-bot)
[![GitHub stars](https://img.shields.io/github/stars/Localacct21/iron-anarchy-minecraft-bot?style=social)](https://github.com/Localacct21/iron-anarchy-minecraft-bot)

**Professional Minecraft automation solution built by a 25-year IT veteran**

[📦 Install Now](#-installation) • [🚀 Quick Start](#-quick-start) • [📚 Documentation](#-documentation) • [🤝 Contribute](#-contributing)

</div>

---

## 🏢 Built by IT Professionals, For Professionals

> **Developed by Local Acct** - 25 years in enterprise IT, currently managing 3 Minecraft servers + 1 CS2 server with 99.9% uptime. This bot was born from real server management needs and proven in production environments.

### 🎯 Why Iron-Anarchy Bot?

- **🏗️ Enterprise-Grade Architecture** - Built with 25+ years of IT infrastructure experience
- **📊 Production Tested** - Running on live servers serving hundreds of players
- **🔧 Professional Support** - Backed by decades of server administration expertise
- **🌐 Scalable Design** - Optimized for both single-player and large communities

---

## ⚡ Quick Installation

<div align="center">

### 🚀 Get started in 30 seconds

**From NPM Registry:**

```bash
npm install -g iron-anarchy-minecraft-bot
npm run setup
npm start
```

**From GitHub Registry:**

```bash
npm config set @localacct21:registry https://npm.pkg.github.com
npm install -g @localacct21/iron-anarchy-minecraft-bot
npm run setup
npm start
```

**That's it!** Your professional Minecraft bot is now running! 🎉

</div>

---

## 🌟 Enterprise Features

<div align="center">

<table>
<tr>
<td align="center" width="25%">

### 🤖 Smart Automation

**Advanced AI Systems**

- PVP Combat Assistance
- Intelligent Pathfinding
- Resource Location & Mining
- Auto-Reconnection

</td>
<td align="center" width="25%">

### 💬 Discord Integration

**Real-Time Communication**

- Chat Bridge
- Status Monitoring
- Remote Commands
- Event Notifications

</td>
<td align="center" width="25%">

### 📹 Recording System

**Professional Logging**

- Session Recording
- Video Output (MP4)
- Performance Analytics
- Audit Trail

</td>
<td align="center" width="25%">

### 🌐 Web Dashboard

**Live Monitoring**

- Real-Time Stats
- Inventory Viewer
- Control Interface
- Health Monitoring

</td>
</tr>
</table>

</div>

---

## 📊 Project Statistics

<div align="center">

![GitHub Stats](https://github-readme-stats.vercel.app/api?username=Localacct21&repo=iron-anarchy-minecraft-bot&show_icons=true&theme=tokyonight)

**🧪 Quality Assurance:** 16 comprehensive test suites ensuring reliability  
**📦 Production Ready:** Used in live server environments  
**🔄 Active Development:** Regular updates and community features  
**🌍 Global Reach:** Downloaded by users worldwide  

</div>

---

## 🔧 Professional Setup

### System Requirements

<div align="center">

| Component | Minimum | Recommended |
|-----------|---------|-------------|
| **Node.js** | 14.0+ | 18.0+ LTS |
| **RAM** | 512MB | 2GB+ |
| **Storage** | 100MB | 1GB+ |
| **Network** | Stable Internet | Low Latency |

</div>

### Installation Methods

<details>
<summary><b>📦 Method 1: NPM Registry (Recommended)</b></summary>

```bash
# Install from npm registry
npm install -g iron-anarchy-minecraft-bot

# Verify installation
iron-anarchy-bot --version

# Set up configuration
npm run setup

# Start the bot
npm start
```

</details>

<details>
<summary><b>📦 Method 2: GitHub Package Registry</b></summary>

```bash
# Configure npm to use GitHub registry for @localacct21 packages
npm config set @localacct21:registry https://npm.pkg.github.com

# Install from GitHub registry
npm install -g @localacct21/iron-anarchy-minecraft-bot

# Verify installation
iron-anarchy-bot --version

# Set up configuration
npm run setup

# Start the bot
npm start
```

**Note:** For GitHub Package Registry, you'll need to authenticate with a personal access token that has `read:packages` permission.

</details>

<details>
<summary><b>🔧 Method 3: Local Development</b></summary>

```bash
# Clone repository
git clone https://github.com/Localacct21/iron-anarchy-minecraft-bot.git
cd iron-anarchy-minecraft-bot

# Install dependencies
npm install

# Set up configuration
npm run setup

# Start development
npm start
```

</details>

<details>
<summary><b>⚡ Method 4: NPX (No Installation)</b></summary>

```bash
# Run directly without installation from npm
npx iron-anarchy-minecraft-bot

# Or from GitHub registry
npx @localacct21/iron-anarchy-minecraft-bot

# Quick test run
npx iron-anarchy-minecraft-bot --help
```

</details>

<details>
<summary><b>🔧 Method 2: Local Development</b></summary>

```bash
# Clone repository
git clone https://github.com/Localacct21/iron-anarchy-minecraft-bot.git
cd iron-anarchy-minecraft-bot

# Install dependencies
npm install

# Set up configuration
npm run setup

# Start development
npm start
```

</details>

<details>
<summary><b>⚡ Method 3: NPX (No Installation)</b></summary>

```bash
# Run directly without installation
npx iron-anarchy-minecraft-bot

# Quick test run
npx iron-anarchy-minecraft-bot --help
```

</details>

---

## ⚙️ Configuration

### Automated Setup (Recommended)

```bash
npm run setup
```

This creates properly configured `config.json` and `discord-config.json` files.

### Manual Configuration

<details>
<summary><b>🎮 Minecraft Configuration (config.json)</b></summary>

```json
{
  "host": "ironanarchy.net",
  "port": 25565,
  "username": "your-minecraft-username",
  "password": "your-minecraft-password",
  "version": "1.20.1",
  "autoReconnect": true,
  "recording": {
    "enabled": true,
    "interval": 30000,
    "format": "mp4"
  },
  "dashboard": {
    "enabled": true,
    "port": 3001,
    "host": "localhost"
  },
  "plugins": {
    "pvp": true,
    "pathfinder": true,
    "autoEat": true,
    "stashFinder": true
  }
}
```

</details>

<details>
<summary><b>💬 Discord Configuration (discord-config.json)</b></summary>

```json
{
  "token": "your-discord-bot-token-here",
  "channelId": "your-discord-channel-id",
  "enabled": true,
  "features": {
    "chatBridge": true,
    "statusUpdates": true,
    "remoteCommands": true,
    "eventNotifications": true
  }
}
```

</details>

<details>
<summary><b>🔐 Environment Variables (.env)</b></summary>

```bash
# Minecraft Account
MINECRAFT_USERNAME=your_username
MINECRAFT_PASSWORD=your_password

# Discord Integration
DISCORD_BOT_TOKEN=your_discord_token
DISCORD_CHANNEL_ID=your_channel_id

# Server Configuration
MINECRAFT_HOST=ironanarchy.net
MINECRAFT_PORT=25565

# Feature Flags
BOT_AUTO_RECONNECT=true
RECORDING_ENABLED=true
DASHBOARD_ENABLED=true
```

</details>

---

## 🚀 Available Commands

<div align="center">

### 🎯 Primary Commands

| Command | Description | Use Case |
|---------|-------------|----------|
| `npm start` | **Main Bot** | Production use with all features |
| `npm run enhanced` | **Enhanced Mode** | Full feature set with optimizations |
| `npm run discord` | **Discord Focus** | Discord-heavy functionality |
| `npm run basic` | **Minimal Mode** | Lightweight for testing |

### 🔧 Development Commands

| Command | Description | Use Case |
|---------|-------------|----------|
| `npm run setup` | **Auto Configuration** | First-time setup |
| `npm test` | **Full Test Suite** | Quality assurance |
| `npm run validate` | **System Check** | Plugin validation |

</div>

---

## 🏗️ Architecture Overview

<div align="center">

```
📦 Iron-Anarchy Bot Architecture
├── 🤖 src/bots/          # Core bot implementations
├── 🔧 src/utils/         # Utility functions & plugin system
├── 🧩 src/plugins/       # Modular plugin architecture
├── ⚙️ config/            # Configuration management
├── 🧪 tests/             # Comprehensive test suites
├── 📚 docs/              # Documentation & guides
├── 💡 examples/          # Usage examples & demos
└── 🛠️ scripts/          # Automation & helper scripts
```

**Professional Development Standards:**

- ✅ Modular architecture for maintainability
- ✅ Comprehensive error handling
- ✅ Extensive test coverage (16 test suites)
- ✅ Clear documentation and examples
- ✅ Production-ready deployment patterns

</div>

---

## 🧪 Quality Assurance

### Test Coverage

<div align="center">

| Test Suite | Coverage | Status |
|------------|----------|---------|
| **Plugin Loading** | 6 tests | ✅ Passing |
| **Discord Integration** | 10 tests | ✅ Passing |
| **Bot Functionality** | Core systems | ✅ Validated |
| **Error Handling** | Edge cases | ✅ Covered |

**Total: 16 comprehensive tests ensuring enterprise reliability**

</div>

### Run Tests

```bash
# Run all tests
npm test

# Run specific test suites
npm run test:plugin    # Plugin system tests
npm run test:discord   # Discord integration tests
```

---

## 🌐 Web Dashboard

<div align="center">

![Dashboard Preview](https://via.placeholder.com/800x400/1a1a2e/eee?text=Live+Web+Dashboard)

### 📊 Real-Time Monitoring

Access your bot's web dashboard at `http://localhost:3001`

**Features:**

- 📈 Live performance metrics
- 🎒 Real-time inventory display
- 🎮 Bot status and health monitoring
- 🕹️ Interactive command interface
- 📊 Historical data and analytics

</div>

---

## 💼 Professional Use Cases

### 🏢 Enterprise Gaming

- **Corporate Gaming Events** - Automated tournament management
- **Team Building Activities** - Coordinated multiplayer experiences
- **Training Simulations** - Educational and skill development scenarios

### 🎮 Community Servers

- **Server Administration** - Automated moderation and management
- **Player Engagement** - Interactive events and challenges
- **Resource Management** - Efficient resource distribution and monitoring

### 🔬 Development & Testing

- **Server Load Testing** - Performance validation and optimization
- **Plugin Development** - Testing and validation environment
- **Automation Research** - AI and machine learning experimentation

---

## 🐛 Troubleshooting

<details>
<summary><b>🔌 Connection Issues</b></summary>

**Bot won't connect to server:**

1. Verify username/password in `config.json`
2. Check server address and port
3. Ensure Minecraft version compatibility
4. Verify network connectivity

```bash
# Test connection
npm run validate
```

</details>

<details>
<summary><b>💬 Discord Integration</b></summary>

**Discord features not working:**

1. Verify bot token in `discord-config.json`
2. Check channel ID is correct
3. Ensure bot has proper permissions
4. Confirm bot is added to server

```bash
# Test Discord connection
npm run test:discord
```

</details>

<details>
<summary><b>🧪 Test Failures</b></summary>

**Tests not passing:**

1. Ensure all dependencies are installed
2. Check Node.js version (14.0+ required)
3. Verify configuration files exist
4. Run tests in clean environment

```bash
# Clean install and test
npm ci
npm test
```

</details>

<details>
<summary><b>📊 Performance Issues</b></summary>

**Bot running slowly:**

1. Check system resources (RAM, CPU)
2. Optimize recording settings
3. Disable unnecessary features
4. Review network latency

```bash
# Performance monitoring
npm run enhanced  # Optimized mode
```

</details>

---

## 🤝 Contributing

<div align="center">

### 🌟 Join Our Professional Development Community

We welcome contributions from developers of all skill levels. Built on **25 years of IT experience**, we maintain high standards while fostering learning and growth.

[**Read Contributing Guidelines →**](CONTRIBUTING.md)

</div>

### 🎯 How to Contribute

<details>
<summary><b>🐛 Report Issues</b></summary>

1. Check existing issues for duplicates
2. Use our issue templates for consistency
3. Provide detailed reproduction steps
4. Include system information and logs

[**Report Bug →**](https://github.com/Localacct21/iron-anarchy-minecraft-bot/issues/new?template=bug_report.md)

</details>

<details>
<summary><b>✨ Suggest Features</b></summary>

1. Describe the feature and its benefits
2. Explain the use case and target audience
3. Consider implementation complexity
4. Discuss potential alternatives

[**Request Feature →**](https://github.com/Localacct21/iron-anarchy-minecraft-bot/issues/new?template=feature_request.md)

</details>

<details>
<summary><b>🔧 Submit Code</b></summary>

1. Fork the repository
2. Create a feature branch
3. Make your changes with tests
4. Follow our coding standards
5. Submit a pull request

```bash
# Development workflow
git clone https://github.com/YOUR_USERNAME/iron-anarchy-minecraft-bot.git
cd iron-anarchy-minecraft-bot
npm install
npm test
```

</details>

---

## 📚 Documentation

<div align="center">

| Document | Description | Audience |
|----------|-------------|----------|
| [**Setup Guide**](docs/INSTRUCTIONS.md) | Complete installation and configuration | New Users |
| [**Feature Overview**](docs/ENHANCED_FEATURES.md) | Detailed feature documentation | All Users |
| [**Discord Setup**](docs/DISCORD_INTEGRATION_GUIDE.md) | Discord bot configuration | Discord Users |
| [**API Reference**](docs/API_REFERENCE.md) | Developer API documentation | Developers |
| [**Contributing**](CONTRIBUTING.md) | Development guidelines | Contributors |

</div>

---

## 📞 Professional Support

<div align="center">

### 🏢 Backed by 25 Years of IT Experience

**Local Acct** - Enterprise IT Professional  
*Currently managing 3 Minecraft servers + 1 CS2 server*

[![Email](https://img.shields.io/badge/Email-localacct@ironanarchy.lol-red?style=for-the-badge&logo=gmail&logoColor=white)](mailto:localacct@ironanarchy.lol)
[![GitHub](https://img.shields.io/badge/GitHub-Professional%20Profile-black?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Localacct21)
[![NPM](https://img.shields.io/badge/NPM-iron--anarchy--minecraft--bot-CB3837?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/package/iron-anarchy-minecraft-bot)

### 💼 Professional Services Available

- **Custom Bot Development** - Tailored automation solutions
- **Server Infrastructure Consulting** - Enterprise gaming setup
- **Integration Services** - Custom Discord and web integrations
- **Training & Support** - Professional development coaching

</div>

---

## 🏆 Recognition & Trust

<div align="center">

### 🌟 Why Professionals Choose Iron-Anarchy Bot

- **🏢 Enterprise Heritage** - Built by IT professionals with decades of experience
- **📊 Production Proven** - Running on live servers with real users
- **🔒 Reliable & Secure** - Professional security practices and error handling
- **📈 Continuously Improved** - Regular updates based on real-world usage
- **🤝 Professional Support** - Backed by experienced IT professionals

### 📊 Community Stats

![Downloads](https://img.shields.io/npm/dt/iron-anarchy-minecraft-bot?style=for-the-badge&label=NPM%20Downloads)
![GitHub Stars](https://img.shields.io/github/stars/Localacct21/iron-anarchy-minecraft-bot?style=for-the-badge&label=GitHub%20Stars)
![Forks](https://img.shields.io/github/forks/Localacct21/iron-anarchy-minecraft-bot?style=for-the-badge&label=Community%20Forks)

</div>

---

## 📄 License & Legal

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

**Free for personal and commercial use** - just give credit where it's due! 🎉

---

<div align="center">

### 🎮 "Built by IT professionals, proven in production, trusted by the community"

![Footer](https://capsule-render.vercel.app/api?type=waving&color=gradient&height=100&section=footer)

**Professional Minecraft automation that just works.** ⚡

---

**Star this repository if you find it useful!** ⭐  
**Share with your gaming community!** 🎮  
**Contribute to make it even better!** 🚀

</div>

## 📚 Documentation

### User Guides

- **[Complete User Guide](./docs/USER_GUIDE.md)** - Comprehensive guide with all features and commands
- **[Command Reference](./docs/COMMAND_REFERENCE.md)** - Quick reference for all bot commands
- **[Usage Examples](./docs/USAGE_EXAMPLES.md)** - Real-world usage scenarios and examples
- **[Features Overview](./docs/FEATURES_OVERVIEW.md)** - Detailed feature breakdown
- **[Troubleshooting Guide](./docs/TROUBLESHOOTING_GUIDE.md)** - Solutions for common issues

### Technical Documentation

- **[API Reference](./docs/API_REFERENCE.md)** - Technical API documentation
- **[Discord Integration Guide](./docs/DISCORD_INTEGRATION_GUIDE.md)** - Discord setup and configuration
- **[Enhanced Features](./docs/ENHANCED_FEATURES.md)** - Advanced feature details
- **[Plugin Audit Summary](./docs/PLUGIN_AUDIT_SUMMARY.md)** - Plugin compatibility and testing

## 🎮 Quick Start

1. **Install dependencies**: `npm install`
2. **Choose your bot variant**:
   - Basic: `node src/bots/bot.js`
   - Advanced: `node src/bots/advanced-bot.js`
   - Enhanced: `node src/bots/enhanced-ironanarchy-bot.js`
3. **Configure settings** in the bot files
4. **Start playing** with chat commands like `!help`

## 🚀 Key Features

- ⚔️ **Advanced PvP** - Smart combat with target tracking
- 🗺️ **Intelligent Pathfinding** - Navigate any terrain automatically  
- 🤖 **Auto-Features** - Eating, reconnection, anti-AFK, equipment management
- 💬 **Discord Integration** - Chat bridging and remote control
- 📊 **Monitoring** - Web dashboard and comprehensive logging
- 🎯 **Commands** - 15+ chat commands for full control
- 🔄 **Reliability** - Auto-reconnect with exponential backoff
- 📱 **Web Interface** - Browser-based inventory and dashboard

## 📋 Essential Commands

- `!come` - Bot comes to you
- `!follow [player]` - Follow a player  
- `!attack <player>` - Attack target
- `!guard` - Toggle mob protection
- `!collect <block> [amount]` - Gather resources
- `!status` - Show bot status
- `!help` - List all commands

For the complete command list and usage examples, see the [User Guide](./docs/USER_GUIDE.md).
