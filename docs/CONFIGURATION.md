# 🔧 Configuration Guide

This guide covers all configuration options for the Iron Anarchy Minecraft Bot.

## 📋 Configuration Files

### Primary Configuration (`config/config.json`)

```json
{
  "bot": {
    "username": "IronAnarchyBot",
    "password": "your_password_if_premium",
    "auth": "offline"
  },
  "server": {
    "host": "iron-anarchy.com",
    "port": 25565,
    "version": "1.19.2"
  },
  "features": {
    "autoEat": true,
    "autoArmor": true,
    "pathfinding": true,
    "pvp": true,
    "antiAfk": true,
    "blockCollection": false
  },
  "discord": {
    "enabled": true,
    "token": "your_discord_bot_token",
    "channelId": "your_channel_id"
  }
}
```

### Environment-Specific Configurations

- `config/config.development.json` - Development settings
- `config/config.staging.json` - Staging environment
- `config/config.production.json` - Production settings

## 🌍 Environment Variables

```bash
# Core Configuration
NODE_ENV=production
LOG_LEVEL=info

# Bot Settings
BOT_USERNAME=YourBotName
BOT_PASSWORD=YourPassword
BOT_AUTH=offline

# Server Connection
MC_SERVER_HOST=your-server.com
MC_SERVER_PORT=25565
MC_SERVER_VERSION=1.19.2

# Discord Integration
DISCORD_TOKEN=your_discord_bot_token
DISCORD_CHANNEL_ID=your_channel_id
DISCORD_ENABLED=true

# Features
FEATURE_AUTO_EAT=true
FEATURE_AUTO_ARMOR=true
FEATURE_PATHFINDING=true
FEATURE_PVP=true
FEATURE_ANTI_AFK=true

# Web Dashboard
WEB_ENABLED=true
WEB_PORT=3000
WEB_HOST=0.0.0.0

# Logging
LOG_FILE=logs/bot.log
LOG_MAX_SIZE=10MB
LOG_MAX_FILES=5
```

## 🔒 Security Configuration

### Authentication Methods

**Offline Mode**
```json
{
  "bot": {
    "auth": "offline",
    "username": "YourBot"
  }
}
```

**Premium Account**
```json
{
  "bot": {
    "auth": "mojang",
    "username": "your_email@example.com",
    "password": "your_password"
  }
}
```

**Microsoft Account**
```json
{
  "bot": {
    "auth": "microsoft",
    "username": "your_email@example.com",
    "password": "your_password"
  }
}
```

### Docker Security

```yaml
# docker-compose.yml
version: '3.8'
services:
  minecraft-bot:
    image: ghcr.io/localacct21/iron-anarchy-minecraft-bot:latest
    security_opt:
      - no-new-privileges:true
    read_only: true
    tmpfs:
      - /tmp
    user: "1001:1001"
    cap_drop:
      - ALL
```

## 📊 Advanced Configuration Options

For complete configuration reference, see the [Configuration Schema](CONFIGURATION_SCHEMA.md).
