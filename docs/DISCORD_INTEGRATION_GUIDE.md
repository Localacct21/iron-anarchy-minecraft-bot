# Discord Bot Integration - End-to-End Testing Guide

## Prerequisites

1. **Discord Bot Token**: Get your bot token from Discord Developer Portal
2. **Discord Channel IDs**: Get the channel IDs where you want the bot to operate
3. **Bot Log Channel ID**: Optional separate channel for bot logs and errors

## Step 1: Set Environment Variables

```bash
# Required
export DISCORD_TOKEN="your_discord_bot_token_here"
export DISCORD_CHANNEL_ID="your_main_channel_id_here"

# Optional (uses main channel if not set)
export DISCORD_BOT_LOG_CHANNEL_ID="your_bot_log_channel_id_here"
```

## Step 2: Test Discord Connection Only

```bash
./test-discord-integration.sh
```

This will:
- ✅ Verify environment variables are set
- ✅ Test Discord bot login
- ✅ Test channel connections
- ✅ Send test messages to verify bot can post
- ✅ Test command handling

## Step 3: Full Integration Test

```bash
./full-integration-test.sh
```

This will start the full bot with:
- ✅ Discord integration
- ✅ Minecraft server connection
- ✅ Chat bridging (Minecraft ⇄ Discord)
- ✅ Admin commands
- ✅ Error handling with bot log channel
- ✅ Graceful shutdown and reconnection

## Discord Commands

| Command | Description |
|---------|-------------|
| `!help` | Show available commands |
| `!status` | Show bot health, food, position |
| `!pos` | Show bot position |
| `!say <message>` | Make bot say something in Minecraft |

## Features Tested

### ✅ Bot Joins Guild
- Bot connects to Discord server
- Confirms channel access
- Sends startup message

### ✅ Chat Relay (Minecraft ⇄ Discord)
- Minecraft chat messages appear in Discord
- Discord messages are sent to Minecraft
- Proper formatting and user attribution

### ✅ Admin Commands
- Commands work from Discord
- Proper error handling for invalid commands
- Real-time status reporting

### ✅ Error Handling
- Bot errors are logged to designated bot log channel
- Meaningful error messages with context
- Automatic reconnection on disconnection
- Graceful shutdown handling

## Troubleshooting

### Bot Not Connecting to Discord
- Check if `DISCORD_TOKEN` is correct
- Verify bot has proper permissions in the Discord server
- Ensure bot is added to the guild

### Bot Can't Send Messages
- Check if bot has "Send Messages" permission
- Verify channel IDs are correct
- Ensure bot can see the channels

### Chat Not Bridging
- Check if `chatBridge` is enabled in configuration
- Verify bot has joined the Minecraft server
- Check bot logs for connection errors

### Commands Not Working
- Verify command prefix is correct (default: `!`)
- Check if bot has "Read Message History" permission
- Ensure bot is listening to the correct channel

## Configuration Files

### discord-config.json
```json
{
  "discord": {
    "enabled": true,
    "token": "your_token_here",
    "channelId": "your_channel_id_here",
    "botLogChannelId": "your_bot_log_channel_id_here",
    "prefix": "!",
    "features": {
      "chatBridge": true,
      "statusUpdates": true,
      "commandRelay": true,
      "screenshots": true,
      "errorReporting": true
    }
  }
}
```

## Success Indicators

### ✅ Discord Connection
- Bot appears online in Discord
- Startup message appears in channel
- Bot responds to `!help` command

### ✅ Minecraft Connection
- Bot joins the Minecraft server
- "Bot has joined the Minecraft server!" message in Discord
- Bot log channel shows successful spawn

### ✅ Chat Bridge
- Minecraft chat appears in Discord
- Discord messages appear in Minecraft
- Proper formatting maintained

### ✅ Error Handling
- Errors appear in bot log channel
- Meaningful error descriptions
- Automatic recovery attempts

## Security Notes

- Never commit discord-config.json with real tokens
- Use environment variables for sensitive data
- Bot token grants access to your Discord server
- Monitor bot log channel for security events
