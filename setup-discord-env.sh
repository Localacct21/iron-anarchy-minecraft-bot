#!/bin/bash

echo "🔧 Setting up Discord Bot Environment Variables"
echo "================================================"

# Check if Discord token is provided
if [ -z "$DISCORD_TOKEN" ]; then
    echo "❌ Error: DISCORD_TOKEN environment variable is not set"
    echo "Please set it with: export DISCORD_TOKEN=your_bot_token_here"
    exit 1
fi

# Check if Discord channel ID is provided
if [ -z "$DISCORD_CHANNEL_ID" ]; then
    echo "❌ Error: DISCORD_CHANNEL_ID environment variable is not set"
    echo "Please set it with: export DISCORD_CHANNEL_ID=your_channel_id_here"
    exit 1
fi

# Optional: Bot log channel ID
if [ -z "$DISCORD_BOT_LOG_CHANNEL_ID" ]; then
    echo "⚠️  Warning: DISCORD_BOT_LOG_CHANNEL_ID not set, using main channel for logs"
    DISCORD_BOT_LOG_CHANNEL_ID="$DISCORD_CHANNEL_ID"
fi

# Update discord-config.json with environment variables
echo "📝 Updating discord-config.json with provided values..."

cat > discord-config.json << EOL
{
  "discord": {
    "enabled": true,
    "token": "$DISCORD_TOKEN",
    "channelId": "$DISCORD_CHANNEL_ID",
    "botLogChannelId": "$DISCORD_BOT_LOG_CHANNEL_ID",
    "prefix": "!",
    "features": {
      "chatBridge": true,
      "statusUpdates": true,
      "commandRelay": true,
      "screenshots": true,
      "errorReporting": true
    }
  },
  "recording": {
    "enabled": true,
    "recordChat": true,
    "recordMovement": true,
    "recordPvP": true,
    "maxFileSize": "50MB",
    "outputDir": "./recordings"
  }
}
EOL

echo "✅ Discord configuration updated successfully"
echo "🔥 Ready to start bot with Discord integration!"
echo ""
echo "Environment Variables Set:"
echo "  - DISCORD_TOKEN: [HIDDEN]"
echo "  - DISCORD_CHANNEL_ID: $DISCORD_CHANNEL_ID"
echo "  - DISCORD_BOT_LOG_CHANNEL_ID: $DISCORD_BOT_LOG_CHANNEL_ID"
