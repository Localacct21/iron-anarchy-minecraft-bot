# 📦 Iron-Anarchy Bot - NPM Installation Guide

## 🎉 Successfully Published to NPM!

Your Iron-Anarchy Minecraft Bot v2.0 is now available on npm!

### 📋 Package Information
- **Package Name**: `iron-anarchy-minecraft-bot`
- **Version**: 2.0.0
- **Registry**: https://www.npmjs.com/package/iron-anarchy-minecraft-bot
- **License**: MIT
- **Dependencies**: 15 packages

## 🚀 Installation Methods

### Global Installation (Recommended)
```bash
npm install -g iron-anarchy-minecraft-bot
```

### Local Installation
```bash
npm install iron-anarchy-minecraft-bot
```

### Using npx (No Installation Required)
```bash
npx iron-anarchy-minecraft-bot
```

## 🔧 Usage After Installation

### Global Installation Usage
```bash
# Run the bot directly
iron-anarchy-bot

# Or use npm scripts
cd your-project-directory
npm start
```

### Local Installation Usage
```bash
# In your project directory
node node_modules/.bin/iron-anarchy-bot

# Or add to your package.json scripts
{
  "scripts": {
    "bot": "iron-anarchy-bot"
  }
}
```

## 📚 Configuration Setup

### 1. Create Configuration Files
```bash
# Copy example configurations
cp node_modules/iron-anarchy-minecraft-bot/config.json.example config.json
cp node_modules/iron-anarchy-minecraft-bot/discord-config.json.example discord-config.json
```

### 2. Configure Environment Variables
```bash
# Create .env file
MINECRAFT_USERNAME=your_username
MINECRAFT_PASSWORD=your_password
DISCORD_BOT_TOKEN=your_discord_token
DISCORD_CHANNEL_ID=your_channel_id
```

### 3. Update Configuration Files
Edit `config.json` and `discord-config.json` with your specific settings.

## 🧪 Testing Installation

### Run Tests
```bash
npm test
```

### Available Scripts
- `npm start` - Start the main bot
- `npm run enhanced` - Run enhanced bot with all features
- `npm test` - Run all tests
- `npm run test:plugin` - Test plugin loading
- `npm run test:discord` - Test Discord integration

## 🌟 Features Included

✅ **Core Bot Features**
- Auto-reconnection system
- Advanced PVP assistance
- Intelligent pathfinding
- Stash finding capabilities

✅ **Discord Integration**
- Real-time chat bridge
- Bot status monitoring
- Remote command execution
- Event notifications

✅ **Recording System**
- Session recording with structured logging
- Video output generation
- Performance monitoring
- Configurable recording intervals

✅ **Web Dashboard**
- Live bot monitoring
- Interactive control panel
- Inventory viewer
- Command execution interface

## 🔗 Links

- **NPM Package**: https://www.npmjs.com/package/iron-anarchy-minecraft-bot
- **GitHub Repository**: https://github.com/Localacct21/iron-anarchy-minecraft-bot
- **GitHub Release**: https://github.com/Localacct21/iron-anarchy-minecraft-bot/releases/tag/v2.0.0
- **Documentation**: See README.md in the package

## 📞 Support

- **Issues**: https://github.com/Localacct21/iron-anarchy-minecraft-bot/issues
- **License**: MIT
- **Author**: localacct

## 🎯 Quick Start Example

```bash
# Install globally
npm install -g iron-anarchy-minecraft-bot

# Create project directory
mkdir my-minecraft-bot
cd my-minecraft-bot

# Initialize and configure
iron-anarchy-bot --init  # (if implemented)
# Or manually copy config files

# Configure your settings
nano config.json
nano discord-config.json

# Start the bot
iron-anarchy-bot
```

---

🎉 **Congratulations!** Your Iron-Anarchy Bot is now available for the entire Node.js community to use!
