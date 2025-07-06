#!/bin/bash

echo "🔥 Full Discord Bot Integration Test"
echo "===================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${2}[TEST] $1${NC}"
}

# Check environment
print_status "Checking environment..." $BLUE

if [ -z "$DISCORD_TOKEN" ] || [ -z "$DISCORD_CHANNEL_ID" ]; then
    print_status "❌ Required environment variables not set" $RED
    echo "Please set:"
    echo "  export DISCORD_TOKEN=your_bot_token_here"
    echo "  export DISCORD_CHANNEL_ID=your_channel_id_here"
    echo "  export DISCORD_BOT_LOG_CHANNEL_ID=your_bot_log_channel_id_here (optional)"
    exit 1
fi

print_status "✅ Environment variables are set" $GREEN

# Setup Discord config
print_status "Setting up configuration..." $BLUE
./setup-discord-env.sh

# Start the enhanced bot
print_status "Starting enhanced Discord bot..." $BLUE
print_status "The bot will:" $YELLOW
echo "  ✅ Connect to Discord and join the guild"
echo "  ✅ Relay Minecraft chat ⇄ Discord"
echo "  ✅ Respond to admin commands (!help, !status, !say, !pos)"
echo "  ✅ Handle errors and post meaningful messages to bot log channel"
echo "  ✅ Support graceful shutdown and reconnection"

print_status "Starting bot in 3 seconds..." $BLUE
sleep 3

# Start the bot
node enhanced-discord-bot.js

print_status "Bot has been started!" $GREEN
print_status "Test the following in Discord:" $BLUE
echo "  💬 Type messages in chat to see them relayed to Minecraft"
echo "  🤖 Use !help to see available commands"
echo "  📊 Use !status to check bot status"
echo "  📍 Use !pos to get bot position"
echo "  💬 Use !say <message> to make bot speak in Minecraft"
echo "  🔄 Check the bot log channel for error messages and status updates"
