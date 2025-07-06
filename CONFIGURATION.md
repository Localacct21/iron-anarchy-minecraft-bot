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
