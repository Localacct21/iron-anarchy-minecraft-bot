# 🎮 Iron-Anarchy Minecraft Bot v2.0

> The ultimate Minecraft automation bot with Discord integration, recording features, and web dashboard

[![npm version](https://badge.fury.io/js/iron-anarchy-minecraft-bot.svg)](https://www.npmjs.com/package/iron-anarchy-minecraft-bot)
[![GitHub release](https://img.shields.io/github/release/Localacct21/iron-anarchy-minecraft-bot.svg)](https://github.com/Localacct21/iron-anarchy-minecraft-bot/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🚀 Quick Start (3 Simple Steps!)

### 1️⃣ Install
```bash
npm install -g iron-anarchy-minecraft-bot
```

### 2️⃣ Setup Configuration
```bash
npm run setup  # Creates config files automatically
```

### 3️⃣ Start Bot
```bash
npm start
```

That's it! Your bot is running! 🎉

## 📁 Project Structure

```
iron-anarchy-minecraft-bot/
├── 📂 src/
│   ├── 🤖 bots/           # All bot implementations
│   ├── 🔧 utils/          # Utility functions
│   └── 🧩 plugins/        # Plugin system
├── 📂 config/             # Configuration examples
├── 📂 tests/              # Test suites
├── 📂 examples/           # Usage examples
├── 📂 scripts/            # Helper scripts
├── 📂 docs/               # Documentation
└── 📄 index.js            # Main entry point
```

## 🛠️ Available Commands

### Basic Usage
```bash
npm start           # Start main bot
npm run enhanced    # Enhanced bot with all features
npm run advanced    # Advanced bot features
npm run discord     # Discord-focused bot
```

### Setup & Testing
```bash
npm run setup       # Create configuration files
npm test           # Run all tests
npm run validate   # Validate plugin system
```

### Development
```bash
npm run test:plugin    # Test plugin loading
npm run test:discord   # Test Discord integration
```

## ⚙️ Configuration

### Automatic Setup
```bash
npm run setup
```
This creates `config.json` and `discord-config.json` with examples.

### Manual Configuration

**config.json**
```json
{
  "host": "ironanarchy.net",
  "port": 25565,
  "username": "your-username",
  "password": "your-password",
  "version": "1.20.1",
  "autoReconnect": true,
  "recording": {
    "enabled": true,
    "interval": 30000
  },
  "dashboard": {
    "enabled": true,
    "port": 3001
  }
}
```

**discord-config.json**
```json
{
  "token": "your-discord-bot-token",
  "channelId": "your-channel-id",
  "enabled": true
}
```

## 🌟 Features

### 🤖 Smart Automation
- **Auto-reconnect** when disconnected
- **PVP assistance** for combat
- **Pathfinding** navigation
- **Resource finding** automation

### 💬 Discord Integration
- **Chat bridge** between Minecraft and Discord
- **Status updates** and monitoring
- **Remote commands** via Discord
- **Event notifications**

### 📹 Recording System
- **Session recording** with detailed logs
- **Video output** generation
- **Performance monitoring**
- **Automatic file management**

### 🌐 Web Dashboard
- **Live monitoring** at `http://localhost:3001`
- **Bot status** and health
- **Inventory viewer**
- **Command interface**

## 📦 Installation Options

### Option 1: NPM (Recommended)
```bash
npm install -g iron-anarchy-minecraft-bot
iron-anarchy-bot
```

### Option 2: Local Installation
```bash
npm install iron-anarchy-minecraft-bot
npx iron-anarchy-bot
```

### Option 3: From Source
```bash
git clone https://github.com/Localacct21/iron-anarchy-minecraft-bot.git
cd iron-anarchy-minecraft-bot
npm install
npm start
```

## 🔧 Advanced Usage

### Custom Bot Scripts
```bash
# Use specific bot implementations
node src/bots/enhanced-ironanarchy-bot.js
node src/bots/enhanced-discord-bot.js
node src/bots/advanced-bot.js
```

### Environment Variables
```bash
# Alternative to config files
MINECRAFT_USERNAME=your_username
MINECRAFT_PASSWORD=your_password
DISCORD_BOT_TOKEN=your_token
DISCORD_CHANNEL_ID=your_channel_id
```

### Plugin Development
```bash
# Test plugin system
npm run validate

# Check examples
ls examples/
```

## 🐛 Troubleshooting

### Common Issues

**Bot won't connect**
- Check username/password in `config.json`
- Verify server address and port
- Ensure Node.js 14+ is installed

**Discord not working**
- Verify bot token in `discord-config.json`
- Check channel ID is correct
- Ensure bot has proper permissions

**Tests failing**
```bash
npm test
# Check output for specific errors
```

### Getting Help
- 📧 Email: localacct@ironanarchy.lol
- 🐛 Issues: [GitHub Issues](https://github.com/Localacct21/iron-anarchy-minecraft-bot/issues)
- 📚 Docs: Check the `docs/` folder

## 🤝 Contributing

We love contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Quick Contribution Steps
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests: `npm test`
5. Submit a pull request

## 📚 Documentation

- **Setup Guide**: [docs/INSTRUCTIONS.md](docs/INSTRUCTIONS.md)
- **Feature Overview**: [docs/ENHANCED_FEATURES.md](docs/ENHANCED_FEATURES.md)
- **Discord Setup**: [docs/DISCORD_INTEGRATION_GUIDE.md](docs/DISCORD_INTEGRATION_GUIDE.md)
- **Test Results**: [docs/FEATURE_TEST_REPORT.md](docs/FEATURE_TEST_REPORT.md)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

**Free to use, just give credit!** 🎉

## 🙏 Support

- ⭐ **Star this repository** if you find it useful
- 🐛 **Report bugs** via GitHub issues
- 💡 **Suggest features** through pull requests
- 📢 **Share with friends** who play Minecraft

---

## 🎯 Quick Examples

### Start Basic Bot
```bash
npm start
```

### Start with Discord
```bash
npm run discord
```

### Run Tests
```bash
npm test
```

### Create Config Files
```bash
npm run setup
```

**Happy mining!** 🎮⛏️

**Contact**: localacct@ironanarchy.lol  
**NPM**: https://www.npmjs.com/package/iron-anarchy-minecraft-bot  
**GitHub**: https://github.com/Localacct21/iron-anarchy-minecraft-bot
