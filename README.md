# Iron-Anarchy Minecraft Bot v2.0

🎮 **Enhanced Iron-Anarchy Minecraft Bot with Discord Integration and Recording Features**

A powerful Minecraft bot designed for the Iron-Anarchy server with advanced PvP capabilities, Discord integration, web dashboard monitoring, and comprehensive recording features.

## ✨ Features

### Core Functionality
- **Advanced PvP Combat**: Auto-attack, armor management, and combat strategies
- **Pathfinding**: Smart navigation and movement optimization
- **Auto-Eat**: Automatic food consumption for health maintenance
- **Block Collection**: Automated resource gathering and inventory management
- **Player Tracking**: Bloodhound integration for player detection

### Discord Integration
- **Real-time Bot Status**: Live updates on bot health, position, and activities
- **Chat Relay**: Two-way communication between Minecraft and Discord
- **Event Notifications**: Spawn, death, combat, and system alerts
- **Rich Embeds**: Beautiful formatted messages with status information
- **Error Handling**: Robust error management with retry mechanisms

### Recording & Monitoring
- **Gameplay Recording**: Capture bot activities for analysis
- **Web Dashboard**: Real-time monitoring through browser interface
- **Performance Metrics**: Detailed statistics and health monitoring
- **Stress Testing**: Built-in tools for performance validation

### Enhanced Plugin System
- **Safe Plugin Loading**: Comprehensive validation and error handling
- **Plugin Manager**: Load, unload, and monitor plugin status
- **Extensive Plugin Support**: Supports all major Mineflayer plugins
- **Failure Recovery**: Graceful handling of plugin failures

## 🚀 Quick Start

### Prerequisites
- **Node.js**: Version 16.0 or higher
- **npm**: Version 7.0 or higher
- **Discord Bot Token**: (Optional, for Discord integration)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd minecraft-bot
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure the bot**
   ```bash
   cp config.json.example config.json
   # Edit config.json with your settings
   ```

4. **Set up environment variables** (Optional)
   ```bash
   cp .env.example .env
   # Edit .env with your credentials
   ```

5. **Run the bot**
   ```bash
   npm run enhanced    # Full-featured bot
   npm start          # Basic bot
   npm run advanced   # Advanced features
   ```

## ⚙️ Configuration

### config.json

The main configuration file for the bot:

```json
{
  "host": "play.iron-anarchy.org",
  "port": 25565,
  "username": "YourBotName",
  "password": "YourPassword",
  "version": "1.20.1",
  "auth": "microsoft",
  "plugins": {
    "pathfinder": true,
    "pvp": true,
    "autoEat": true,
    "armorManager": true,
    "collectBlock": true,
    "bloodhound": true,
    "webInventory": true,
    "dashboard": true
  },
  "pvp": {
    "enabled": true,
    "attackRange": 3.5,
    "autoAttack": true,
    "defendSelf": true
  },
  "movement": {
    "autoWalk": false,
    "followTarget": "",
    "randomWalk": false
  }
}
```

### discord-config.json

Discord integration configuration:

```json
{
  "discord": {
    "enabled": true,
    "token": "YOUR_DISCORD_BOT_TOKEN",
    "channelId": "CHANNEL_ID_FOR_GENERAL_MESSAGES",
    "botLogChannelId": "CHANNEL_ID_FOR_BOT_LOGS",
    "embedColors": {
      "success": "#00ff00",
      "error": "#ff0000",
      "warning": "#ffff00",
      "info": "#0099ff"
    },
    "messageTypes": {
      "chat": true,
      "death": true,
      "spawn": true,
      "combat": true,
      "health": true,
      "errors": true
    }
  },
  "recording": {
    "enabled": true,
    "interval": 5000,
    "maxFiles": 10,
    "compression": true,
    "directory": "./recordings"
  }
}
```

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```bash
# Minecraft Account
MINECRAFT_USERNAME=your_minecraft_username
MINECRAFT_PASSWORD=your_minecraft_password

# Discord Integration
DISCORD_BOT_TOKEN=your_discord_bot_token
DISCORD_CHANNEL_ID=your_discord_channel_id
DISCORD_BOT_LOG_CHANNEL_ID=your_bot_log_channel_id

# Server Configuration
MINECRAFT_HOST=play.iron-anarchy.org
MINECRAFT_PORT=25565
MINECRAFT_VERSION=1.20.1

# Bot Settings
BOT_AUTO_RECONNECT=true
BOT_LOG_LEVEL=info
BOT_MAX_RECONNECT_ATTEMPTS=5

# Recording Settings
RECORDING_ENABLED=true
RECORDING_INTERVAL=5000
RECORDING_MAX_FILES=10

# Dashboard Settings
DASHBOARD_ENABLED=true
DASHBOARD_PORT=3000
DASHBOARD_HOST=localhost
```

## 🧪 Testing

The bot includes comprehensive unit and integration tests:

```bash
# Run all tests
npm test

# Run plugin loading tests
npm run test:plugin

# Run Discord integration tests
npm run test:discord
```

### Test Coverage
- **Plugin Loading**: Validates safe plugin loading and error handling
- **Discord Integration**: Tests Discord connectivity and message handling
- **Error Scenarios**: Comprehensive error handling validation
- **Configuration**: Validates configuration parsing and validation

## 📜 Available Scripts

```bash
npm start              # Start basic bot
npm run enhanced       # Start enhanced bot with full features
npm run advanced       # Start advanced bot features
npm run basic          # Start minimal bot
npm test              # Run all tests
npm run test:plugin   # Test plugin loading
npm run test:discord  # Test Discord integration
```

## 🔧 Troubleshooting

### Common Issues

#### 1. **Bot Won't Connect**
```bash
# Check your credentials
Error: Failed to authenticate
Solution: Verify MINECRAFT_USERNAME and MINECRAFT_PASSWORD in .env
```

#### 2. **Discord Integration Not Working**
```bash
# Invalid Discord token
Error: Discord login failed
Solution: 
1. Verify DISCORD_BOT_TOKEN in .env
2. Ensure bot has proper permissions in Discord server
3. Check channel IDs are correct
```

#### 3. **Plugin Loading Failures**
```bash
# Plugin compatibility issues
Error: Plugin failed to load
Solution:
1. Check Node.js version (requires 16+)
2. Run: npm install to update dependencies
3. Check plugin compatibility with Minecraft version
```

#### 4. **Memory Issues**
```bash
# High memory usage
Error: JavaScript heap out of memory
Solution:
1. Restart the bot regularly
2. Reduce recording frequency
3. Limit concurrent plugin loading
4. Use: node --max-old-space-size=4096 enhanced-ironanarchy-bot.js
```

#### 5. **Network Connection Issues**
```bash
# Connection timeouts
Error: ECONNRESET or ETIMEDOUT
Solution:
1. Check internet connection
2. Verify server is online
3. Try different network/VPN
4. Increase timeout values in config
```

### Debug Mode

Enable debug logging for troubleshooting:

```bash
# Set environment variable
export NODE_ENV=development
export BOT_LOG_LEVEL=debug

# Or run with debug output
DEBUG=* npm run enhanced
```

### Log Files

The bot creates detailed log files:

- `bot.log` - General bot activities
- `dashboard.log` - Web dashboard logs
- `recordings/` - Gameplay recordings
- `logs/` - Additional debug logs

### Performance Optimization

For better performance:

1. **Disable unused plugins** in config.json
2. **Reduce recording frequency** if not needed
3. **Limit Discord message frequency** to avoid rate limits
4. **Use dedicated server** for production deployments

### Discord Bot Setup

1. **Create Discord Application**
   - Go to https://discord.com/developers/applications
   - Create new application
   - Go to "Bot" section
   - Create bot and copy token

2. **Set Bot Permissions**
   - Send Messages
   - Read Message History
   - Use External Emojis
   - Embed Links

3. **Invite Bot to Server**
   - Use OAuth2 URL generator
   - Select required permissions
   - Add bot to your Discord server

### Plugin Troubleshooting

If specific plugins fail to load:

1. **Check compatibility**
   ```bash
   npm ls mineflayer-plugin-name
   ```

2. **Update plugin**
   ```bash
   npm update mineflayer-plugin-name
   ```

3. **Remove problematic plugins**
   ```bash
   # Edit config.json and set plugin to false
   "pluginName": false
   ```

### Server-Specific Issues

For Iron-Anarchy server:

1. **Version compatibility**: Ensure bot uses server's Minecraft version
2. **Rate limiting**: Respect server's anti-bot measures
3. **Account security**: Use strong passwords and 2FA when possible
4. **Server rules**: Follow server guidelines for bot usage

## 📁 Project Structure

```
minecraft-bot/
├── config.json              # Main bot configuration
├── discord-config.json      # Discord integration settings
├── .env                     # Environment variables
├── package.json             # Node.js dependencies
├── enhanced-ironanarchy-bot.js  # Main enhanced bot file
├── plugin-loader.js         # Safe plugin loading system
├── tests/                   # Test suites
│   ├── unit/               # Unit tests
│   ├── integration/        # Integration tests
│   └── test-runner.js      # Custom test framework
├── logs/                   # Log files
├── recordings/             # Gameplay recordings
└── screenshots/            # Dashboard screenshots
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Run tests: `npm test`
6. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## ⚠️ Disclaimer

This bot is for educational purposes. Please respect server rules and terms of service when using automated clients.

---

**Version**: 2.0.0  
**Last Updated**: 2025-01-06  
**Node.js**: 16.0+ required  
**Minecraft**: 1.20.1 compatible
