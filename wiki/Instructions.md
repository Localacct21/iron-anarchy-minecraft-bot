# 🔥 Iron-Anarchy PvP Bot - Complete Instructions

## 📁 Quick Start

### 1. Start the Bot

```bash
./start-ironanarchy.sh
```

### 2. Basic Commands

Once connected to Iron-Anarchy, use these commands in chat:

- `!help` - Show all available commands
- `!status` - Check bot status and position
- `!health` - Show health and food levels

---

## 🎯 Bot Configuration

### Server Settings (config.json)

```json
{
  "server": {
    "host": "ironanarchy.lol",
    "port": 25565,
    "version": "1.21.4"
  },
  "bot": {
    "username": "PvPBot",     ← Change this to your preferred name
    "auth": "offline"
  }
}
```

**Important**: Change the `username` to something unique!

### To Edit Configuration

```bash
nano config.json
```

---

## ⚔️ Combat Commands

### Basic PvP

| Command | Description | Example |
|---------|-------------|---------|
| `!attack <player>` | Attack a specific player | `!attack Steve` |
| `!killaura` | Toggle auto-attack nearby players | `!killaura` |
| `!guard` | Auto-attack hostile mobs | `!guard` |
| `!revenge` | Attack whoever last hurt you | `!revenge` |
| `!escape` | Toggle flee-from-combat mode | `!escape` |

### Advanced Combat

- **Kill-Aura Mode**: Automatically attacks any player within 6 blocks
- **Escape Mode**: Bot will flee when taking damage instead of fighting
- **Guard Mode**: Protects against mobs while doing other tasks

---

## 🏃 Movement Commands

| Command | Description | Example |
|---------|-------------|---------|
| `!follow <player>` | Follow a specific player | `!follow Alice` |
| `!follow` | Follow the command sender | `!follow` |
| `!come` | Come to the command sender | `!come` |
| `!stop` | Stop all actions | `!stop` |

---

## 🛠️ Utility Commands

### Information

| Command | Description |
|---------|-------------|
| `!health` | Show health and food bars |
| `!inv` | Show inventory contents |
| `!coords` | Share current coordinates |
| `!players` | List all online players |
| `!status` | Show bot status and modes |

### Actions

| Command | Description | Example |
|---------|-------------|---------|
| `!collect <block> [amount]` | Collect specific blocks | `!collect diamond_ore 5` |
| `!suicide` | Kill the bot (respawn) | `!suicide` |

---

## 🔧 Bot Features

### Automatic Features

- **Auto-Eat**: Eats food when hungry (starts at 14/20 food)
- **Auto-Armor**: Automatically equips better armor
- **Auto-Reconnect**: Reconnects if disconnected
- **Smart Pathfinding**: Navigates terrain intelligently

### Logging

- All chat messages logged to `logs/ironanarchy_YYYY-MM-DD.log`
- PvP events and commands tracked
- Console output with color coding

### Web Interface

- View bot inventory at: `http://localhost:3000`
- Real-time inventory management
- Accessible from any web browser

---

## 📋 Usage Scenarios

### 1. Bodyguard Mode

```
!follow Steve
!guard
```

Bot will follow Steve and protect against mobs.

### 2. Aggressive PvP Mode

```
!killaura
```

Bot will attack any nearby players automatically.

### 3. Peaceful Exploration

```
!escape
!follow
```

Bot will follow you and flee if attacked.

### 4. Resource Gathering

```
!collect diamond_ore 10
!guard
```

Bot will collect diamonds while defending against mobs.

### 5. Base Defense

```
!guard
!killaura
```

Bot will attack both mobs and players near your base.

---

## 🚨 Important Notes

### Iron-Anarchy Specific

- This is an **anarchy server** - expect chaos!
- Players may attack without warning
- Use `!escape` mode in dangerous areas
- The bot can handle grief and PvP situations

### Safety Tips

1. **Never leave bot unattended** in important areas
2. **Use escape mode** when carrying valuable items
3. **Change username** to avoid targeting
4. **Monitor logs** for suspicious activity

### Performance

- Bot works best with good internet connection
- May lag slightly with many players nearby
- Kill-aura works within 6 block radius
- Pathfinding optimized for anarchy terrain

---

## 🐛 Troubleshooting

### Connection Issues

```bash
# Test connection
node test-bot.js

# Check server status
ping ironanarchy.lol
```

### Bot Stuck

1. Use `!stop` to reset all actions
2. Use `!suicide` to respawn if completely stuck
3. Restart bot if commands don't respond

### Commands Not Working

- Make sure you're typing `!` before commands
- Commands work in both public chat and whispers
- Check if bot is online and connected

### Common Errors

| Error | Solution |
|-------|----------|
| "Cannot find player" | Player might be offline or too far away |
| "Connection refused" | Server might be down or wrong IP |
| "Plugin error" | Restart bot with `./start-ironanarchy.sh` |

---

## 📁 File Structure

```
minecraft-bot/
├── ironanarchy-bot.js          # Main Iron-Anarchy bot
├── advanced-bot.js             # General purpose bot
├── config.json                 # Server configuration
├── start-ironanarchy.sh        # Iron-Anarchy startup script
├── start.sh                    # General startup script
├── test-bot.js                 # Connection testing
├── logs/                       # Log files directory
│   └── ironanarchy_YYYY-MM-DD.log
├── node_modules/               # Dependencies
├── package.json                # Node.js project file
├── [[README]]                   # General documentation
└── INSTRUCTIONS.md             # This file
```

---

## 🎮 Example Session

```bash
# 1. Start the bot
./start-ironanarchy.sh

# 2. Bot connects and says:
# "🔥 Iron-Anarchy PvP Bot Online! Type !help for commands"

# 3. In Minecraft chat, type:
!follow
!guard

# 4. Bot will follow you and protect against mobs
# 5. If you get attacked:
!killaura

# 6. Bot will fight back automatically
# 7. To stop all actions:
!stop
```

---

## 🔄 Updates and Maintenance

### Updating Dependencies

```bash
npm update
```

### Backup Important Files

```bash
cp config.json config.json.backup
cp -r logs/ logs_backup/
```

### Performance Monitoring

- Check `logs/` directory for errors
- Monitor console output for warnings
- Use web interface to check inventory

---

## 🆘 Support

### Getting Help

1. Check this INSTRUCTIONS.md file
2. Review console logs for errors
3. Test connection with `node test-bot.js`
4. Check Iron-Anarchy server status

### Useful Commands for Debugging

```bash
# Test basic connection
node test-bot.js

# Check if server is reachable
ping ironanarchy.lol

# View recent logs
tail -f logs/ironanarchy_$(date +%Y-%m-%d).log

# Check dependencies
npm list
```

---

## 🎯 Pro Tips

1. **Username Strategy**: Use common names to blend in
2. **Combat Timing**: Enable kill-aura only when needed
3. **Escape Routes**: Always know where to run
4. **Inventory Management**: Keep valuable items in ender chest
5. **Base Location**: Don't bring bot to secret bases
6. **Team Play**: Coordinate with friends using whispers
7. **Resource Priority**: Set bot to collect while you PvP
8. **Defense Setup**: Use guard mode at base entrances

---

## ⚡ Quick Reference Card

### Essential Commands

```
!help          - Show commands
!follow        - Follow me
!stop          - Stop everything
!killaura      - Toggle PvP mode
!escape        - Toggle flee mode
!health        - Show status
!coords        - Share location
```

### Emergency Commands

```
!stop          - Emergency stop
!suicide       - Respawn bot
!escape        - Flee mode
```

### File Locations

```
./start-ironanarchy.sh    - Start bot
./config.json             - Settings
./logs/                   - Log files
http://localhost:3000     - Web inventory
```

---

**Ready to dominate Iron-Anarchy! 🔥⚔️**

*Remember: This bot is designed for Iron-Anarchy's anarchy gameplay. Use responsibly and respect other players when possible.*

---

[🏠 Back to Home](Home.md)
