# Minecraft PvP Bot

A comprehensive Minecraft bot with PvP capabilities, chat logging, and quality-of-life features.

## Features

### Core Features
- **PvP Combat**: Attack players and hostile mobs
- **Chat Logging**: Logs all chat messages, commands, and events
- **Auto-Eat**: Automatically eats food when hungry
- **Armor Management**: Automatically equips better armor
- **Pathfinding**: Intelligent movement and navigation
- **Block Collection**: Collect specific blocks automatically
- **Web Inventory**: View bot inventory via web interface

### Commands
- `!follow [player]` - Follow a player (defaults to command sender)
- `!stop` - Stop all current actions
- `!attack <player>` - Attack a specific player
- `!guard` - Toggle guard mode (auto-attack hostile mobs)
- `!collect <block> [amount]` - Collect specific blocks
- `!come` - Come to the command sender
- `!health` - Show health and food status
- `!inv` - Show inventory contents
- `!status` - Show bot status and position
- `!players` - List online players
- `!pos` - Show current position
- `!help` - Show all available commands

### Quality of Life Features
- **Auto-Reconnect**: Automatically reconnects with exponential backoff
- **Colored Console Logs**: Easy-to-read console output
- **File Logging**: All events logged to files in `/logs` directory
- **Web Interface**: Inventory management via web browser
- **Smart Combat**: Moves closer to targets before attacking
- **Guard Mode**: Automatically defends against hostile mobs

## Setup

1. **Configure the bot** by editing `config.json`:
   ```json
   {
     "server": {
       "host": "your-server-ip",
       "port": 25565,
       "version": "1.19.2"
     },
     "bot": {
       "username": "YourBotName",
       "auth": "offline"
     }
   }
   ```

2. **Start the bot**:
   ```bash
   ./start.sh
   ```
   or
   ```bash
   node advanced-bot.js
   ```

## Configuration

### Server Settings
- `host`: Minecraft server IP address
- `port`: Server port (default: 25565)
- `version`: Minecraft version (e.g., "1.19.2")

### Bot Settings
- `username`: Bot's username
- `auth`: Authentication type ("offline" or "microsoft")

### Feature Settings
- `autoEat`: Configure automatic eating behavior
- `pvp`: PvP-related settings
- `logging`: Control what gets logged
- `webInventory`: Web interface settings

## File Structure

```
minecraft-bot/
├── advanced-bot.js      # Main bot script
├── bot.js              # Simple bot script
├── config.json         # Configuration file
├── start.sh           # Startup script
├── logs/              # Log files directory
│   ├── bot_YYYY-MM-DD.log
│   └── chat_YYYY-MM-DD.log
├── package.json       # Node.js dependencies
└── README.md         # This file
```

## Dependencies

- `mineflayer` - Core Minecraft bot library
- `mineflayer-pvp` - PvP functionality
- `mineflayer-pathfinder` - Pathfinding and movement
- `mineflayer-auto-eat` - Automatic eating
- `mineflayer-armor-manager` - Armor management
- `mineflayer-collectblock` - Block collection
- `mineflayer-bloodhound` - Entity tracking
- `mineflayer-web-inventory` - Web inventory interface
- `fs-extra` - File system utilities
- `moment` - Date/time formatting

## Usage Examples

1. **Make the bot follow you**:
   ```
   !follow
   ```

2. **Attack a player**:
   ```
   !attack PlayerName
   ```

3. **Enable guard mode**:
   ```
   !guard
   ```

4. **Collect diamonds**:
   ```
   !collect diamond_ore 5
   ```

5. **Check bot status**:
   ```
   !status
   ```

## Web Interface

The bot includes a web inventory interface accessible at:
`http://localhost:3000`

This allows you to view and manage the bot's inventory through your web browser.

## Logging

All bot activities are logged to files in the `logs/` directory:
- General bot logs: `bot_YYYY-MM-DD.log`
- Chat logs: `chat_YYYY-MM-DD.log`

## Troubleshooting

1. **Connection Issues**: Check server IP and port in `config.json`
2. **Authentication Errors**: Verify auth type (offline vs microsoft)
3. **Plugin Errors**: Ensure all npm dependencies are installed
4. **Permission Issues**: Make sure the bot has necessary permissions on the server

## License

This project is for educational purposes. Please respect server rules and terms of service.
