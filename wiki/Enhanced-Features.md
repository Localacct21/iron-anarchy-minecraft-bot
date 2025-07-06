# 🔥 Enhanced Iron-Anarchy Bot Features

## 🆕 New Features Added

### 📱 Discord Integration

- **Real-time chat bridge** between Minecraft and Discord
- **Command execution** from Discord channel
- **Status monitoring** with rich embeds
- **Event notifications** sent to Discord
- **Screenshot sharing** capabilities

### 📹 Recording System

- **Event recording** - All bot actions, chat, PvP events
- **JSON format** recordings for analysis
- **Automatic saving** when recording gets large
- **Replay capabilities** for debugging
- **Performance tracking**

### 🎮 Enhanced Dashboard

- **Web dashboard** on port 8080
- **Real-time bot monitoring**
- **Visual bot status**
- **Interactive controls**

## 🔧 Setup Instructions

### Discord Bot Setup

1. Create a Discord application at <https://discord.com/developers/applications>
2. Create a bot and get the token
3. Invite bot to your server with message permissions
4. Edit `discord-config.json`:

   ```json
   {
     "discord": {
       "enabled": true,
       "token": "YOUR_ACTUAL_BOT_TOKEN",
       "channelId": "YOUR_CHANNEL_ID",
       "prefix": "!",
       "features": {
         "chatBridge": true,
         "statusUpdates": true,
         "commandRelay": true,
         "screenshots": true
       }
     }
   }
   ```

### Recording Setup

The recording feature is enabled by default and will:

- Create `./recordings/` directory
- Save events in JSON format
- Auto-save every 1000 events
- Track bot position, health, and all interactions

## 📋 New Commands

### In-Game Commands

- `!record start` - Start recording bot events
- `!record stop` - Stop and save recording
- `!screenshot` - Take a screenshot (if available)
- `!discord <message>` - Send message to Discord channel
- `!status` - Enhanced status with Discord/Recording info

### Discord Commands

Use these in your Discord channel:

- `!status` - Show detailed bot status embed
- `!say <message>` - Send message to Minecraft chat
- `!record start/stop` - Control recording from Discord
- `!screenshot` - Take and share screenshot
- `!help` - Show Discord command help

## 🌐 Web Interfaces

### Dashboard (Port 8080)

- Real-time bot visualization
- Interactive map view
- Bot status monitoring
- Player tracking

### Inventory (Port 3000)

- View bot inventory
- Item management
- Real-time updates

## 📁 File Structure

```
minecraft-bot/
├── enhanced-ironanarchy-bot.js    # Enhanced bot with Discord/Recording
├── discord-config.json            # Discord and recording configuration
├── recordings/                    # Event recordings (JSON files)
├── screenshots/                   # Screenshot storage
├── logs/                         # Enhanced logging
│   └── enhanced_YYYY-MM-DD.log
└── start-enhanced.sh             # Enhanced bot startup script
```

## 🎯 Usage Examples

### Discord Integration

1. Set up Discord bot token in `discord-config.json`
2. Start enhanced bot: `./start-enhanced.sh`
3. In Discord: `!status` to see bot status
4. In Discord: `!say Hello Iron-Anarchy!` to send message to Minecraft
5. Chat bridge automatically syncs messages

### Recording Features

1. Recording starts automatically when bot spawns
2. Use `!record stop` to save current session
3. Recordings saved in `./recordings/` directory
4. Each recording contains all events with timestamps

### Enhanced Monitoring

1. Web dashboard: <http://localhost:8080>
2. Web inventory: <http://localhost:3000>
3. Discord status updates
4. Enhanced console logging with colors

## 📊 Recording Data Format

Each recording contains:

```json
{
  "startTime": "2025-07-05T22:30:00.000Z",
  "endTime": "2025-07-05T23:30:00.000Z",
  "server": "ironanarchy.lol",
  "botUsername": "PvPBot",
  "events": [
    {
      "timestamp": "2025-07-05T22:30:15.123Z",
      "type": "CHAT",
      "message": "<Player1> Hello!",
      "data": null,
      "botPosition": {"x": 100, "y": 64, "z": 200},
      "botHealth": 20,
      "botFood": 18
    }
  ]
}
```

## 🔐 Security Notes

- Keep Discord bot token secure
- Don't share `discord-config.json` with tokens
- Recordings may contain sensitive chat data
- Web interfaces are local-only by default

## 🐛 Troubleshooting

### Discord Issues

- Check token is valid
- Verify bot has message permissions
- Ensure channel ID is correct
- Check Discord bot is online

### Recording Issues

- Check disk space for recordings
- Verify write permissions to `./recordings/`
- Large recordings auto-save every 1000 events

### Dashboard Issues

- Port 8080 must be available
- Check firewall settings for web access
- Dashboard loads after bot spawns

## 🚀 Performance

The enhanced bot includes:

- **Efficient event logging** - Minimal performance impact
- **Auto-cleanup** - Recordings auto-save to prevent memory issues
- **Async Discord** - Non-blocking Discord integration
- **Web optimization** - Lightweight dashboard interface

## 🆙 Upgrade Path

To use enhanced features:

1. Update dependencies: `npm install`
2. Configure Discord: Edit `discord-config.json`
3. Start enhanced bot: `./start-enhanced.sh`
4. Access web interfaces
5. Enjoy Discord integration and recording!

---

**Ready to experience the ultimate Iron-Anarchy bot! 🔥📱📹**

---

[🏠 Back to Home](Home.md)
