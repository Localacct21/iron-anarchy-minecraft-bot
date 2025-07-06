# 🎮 Iron-Anarchy Minecraft Bot v2.0

> The ultimate Minecraft automation bot with Discord integration, recording features, and web dashboard

[![npm version](https://badge.fury.io/js/iron-anarchy-minecraft-bot.svg)](https://www.npmjs.com/package/iron-anarchy-minecraft-bot)
[![GitHub release](https://img.shields.io/github/release/Localacct21/iron-anarchy-minecraft-bot.svg)](https://github.com/Localacct21/iron-anarchy-minecraft-bot/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🚀 Quick Start (For Absolute Beginners)

### What You Need First
1. **Node.js** (version 14 or higher) - [Download here](https://nodejs.org/)
2. **A Minecraft account** 
3. **Discord bot token** (optional but recommended)

### 1️⃣ Install the Bot
Open your terminal/command prompt and run:
```bash
npm install -g iron-anarchy-minecraft-bot
```

### 2️⃣ Create a Folder for Your Bot
```bash
mkdir my-minecraft-bot
cd my-minecraft-bot
```

### 3️⃣ Set Up Configuration
Create these files in your folder:

**config.json**
```json
{
  "host": "ironanarchy.net",
  "port": 25565,
  "username": "YourMinecraftUsername",
  "password": "YourMinecraftPassword",
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
  "token": "your-discord-bot-token-here",
  "channelId": "your-discord-channel-id-here",
  "enabled": true
}
```

### 4️⃣ Start Your Bot
```bash
iron-anarchy-bot
```

That's it! Your bot is now running! 🎉

## 🌟 What This Bot Can Do

### 🤖 Smart Automation
- **Auto-reconnect** when disconnected
- **PVP assistance** for combat
- **Pathfinding** to navigate safely
- **Resource finding** to locate items

### 💬 Discord Integration
- **Chat bridge** between Minecraft and Discord
- **Status updates** sent to Discord
- **Remote commands** via Discord
- **Event notifications** (deaths, spawns, etc.)

### 📹 Recording System
- **Session recording** with detailed logs
- **Video output** of bot activities
- **Performance monitoring**
- **Automatic file management**

### 🌐 Web Dashboard
- **Live monitoring** at `http://localhost:3001`
- **Bot status** and health
- **Inventory viewer**
- **Command interface**

## 🔧 Easy Configuration

### Minecraft Settings
Edit `config.json`:
- `host`: Server address (default: ironanarchy.net)
- `username`: Your Minecraft username
- `password`: Your Minecraft password
- `version`: Minecraft version (1.20.1 recommended)

### Discord Settings (Optional)
Edit `discord-config.json`:
- `token`: Your Discord bot token
- `channelId`: Discord channel ID for messages
- `enabled`: Set to `false` to disable Discord features

### Environment Variables (Alternative)
Create a `.env` file:
```bash
MINECRAFT_USERNAME=your_username
MINECRAFT_PASSWORD=your_password
DISCORD_BOT_TOKEN=your_discord_token
DISCORD_CHANNEL_ID=your_channel_id
```

## 📋 Available Commands

### Starting the Bot
```bash
# Main bot with all features
iron-anarchy-bot

# Enhanced version
npm run enhanced

# Basic version
npm run basic

# Run tests
npm test
```

### Discord Commands
- `!status` - Check bot status
- `!help` - Show available commands
- `!disconnect` - Safely disconnect bot

## 🛠️ Installation Options

### Option 1: Global Installation (Recommended)
```bash
npm install -g iron-anarchy-minecraft-bot
iron-anarchy-bot
```

### Option 2: Local Installation
```bash
npm install iron-anarchy-minecraft-bot
npx iron-anarchy-bot
```

### Option 3: Direct from GitHub
```bash
git clone https://github.com/Localacct21/iron-anarchy-minecraft-bot.git
cd iron-anarchy-minecraft-bot
npm install
npm start
```

## 📊 Web Dashboard Usage

1. Start the bot with dashboard enabled
2. Open your browser to `http://localhost:3001`
3. Monitor your bot in real-time
4. View inventory and status
5. Execute commands through the web interface

## 🐛 Common Issues & Solutions

### "Cannot connect to server"
- Check your username and password
- Verify the server address and port
- Ensure you're not banned from the server

### "Discord bot not responding"
- Verify your Discord bot token
- Check channel ID is correct
- Ensure bot has permissions in the channel

### "npm command not found"
- Install Node.js from https://nodejs.org/
- Restart your terminal after installation

### "Permission denied"
- Run with `sudo` on Linux/Mac: `sudo npm install -g iron-anarchy-minecraft-bot`
- Run as Administrator on Windows

## 📱 Discord Bot Setup

1. Go to https://discord.com/developers/applications
2. Create a new application
3. Go to "Bot" section
4. Create a bot and copy the token
5. Add bot to your server with permissions:
   - Send Messages
   - Read Message History
   - View Channels

## 🧪 Testing Your Setup

Run these commands to test everything:
```bash
# Test all features
npm test

# Test plugin loading
npm run test:plugin

# Test Discord integration
npm run test:discord
```

## 🎯 Pro Tips

1. **Use screen or tmux** to keep the bot running when you disconnect
2. **Check logs** regularly for any issues
3. **Update regularly** with `npm update -g iron-anarchy-minecraft-bot`
4. **Join our Discord** for support and updates
5. **Read the FINALIZATION_SUMMARY.md** for technical details

## 📚 Additional Resources

- **NPM Package**: https://www.npmjs.com/package/iron-anarchy-minecraft-bot
- **GitHub Repository**: https://github.com/Localacct21/iron-anarchy-minecraft-bot
- **Issues & Support**: https://github.com/Localacct21/iron-anarchy-minecraft-bot/issues
- **Latest Release**: https://github.com/Localacct21/iron-anarchy-minecraft-bot/releases

## 🤝 Contributing

We welcome contributions! Here's how:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Support

- **Star this repository** if you find it useful
- **Report bugs** via GitHub issues
- **Suggest features** through pull requests
- **Share with friends** who play Minecraft

---

## 🎉 You're All Set!

Your Iron-Anarchy Minecraft Bot is ready to dominate the server! 

**Need help?** Open an issue on GitHub or check our troubleshooting guide above.

**Happy mining!** 🎮⛏️
