#!/bin/bash

echo "🧪 Testing Discord Bot Integration End-to-End"
echo "============================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${2}[TEST] $1${NC}"
}

# Check if environment variables are set
print_status "Checking environment variables..." $BLUE

if [ -z "$DISCORD_TOKEN" ]; then
    print_status "❌ DISCORD_TOKEN not set" $RED
    echo "Please set it with: export DISCORD_TOKEN=your_bot_token_here"
    exit 1
fi

if [ -z "$DISCORD_CHANNEL_ID" ]; then
    print_status "❌ DISCORD_CHANNEL_ID not set" $RED
    echo "Please set it with: export DISCORD_CHANNEL_ID=your_channel_id_here"
    exit 1
fi

print_status "✅ Environment variables are set" $GREEN

# Set up Discord configuration
print_status "Setting up Discord configuration..." $BLUE
./setup-discord-env.sh

if [ $? -eq 0 ]; then
    print_status "✅ Discord configuration updated" $GREEN
else
    print_status "❌ Failed to update Discord configuration" $RED
    exit 1
fi

# Test Discord connection only
print_status "Testing Discord connection..." $BLUE

cat > test-discord-only.js << 'EOL'
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');

const discordConfig = require('./discord-config.json');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.once('ready', () => {
    console.log('✅ Discord bot logged in as', client.user.tag);
    
    // Test main channel
    const mainChannel = client.channels.cache.get(discordConfig.discord.channelId);
    if (mainChannel) {
        console.log('✅ Main channel found:', mainChannel.name);
        
        const embed = new EmbedBuilder()
            .setColor('#00ff00')
            .setTitle('🧪 Discord Integration Test')
            .setDescription('This is a test of the Discord bot integration')
            .setTimestamp();
        
        mainChannel.send({ embeds: [embed] })
            .then(() => {
                console.log('✅ Test message sent to main channel');
            })
            .catch(err => {
                console.error('❌ Failed to send test message:', err.message);
            });
    } else {
        console.error('❌ Main channel not found');
    }
    
    // Test bot log channel
    const botLogChannel = client.channels.cache.get(discordConfig.discord.botLogChannelId);
    if (botLogChannel) {
        console.log('✅ Bot log channel found:', botLogChannel.name);
        
        const logEmbed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('🤖 Bot Log Test')
            .setDescription('This is a test of the bot log channel')
            .setTimestamp();
        
        botLogChannel.send({ embeds: [logEmbed] })
            .then(() => {
                console.log('✅ Test message sent to bot log channel');
            })
            .catch(err => {
                console.error('❌ Failed to send test message to bot log channel:', err.message);
            });
    } else {
        console.log('⚠️ Bot log channel not found, using main channel as fallback');
    }
    
    // Test commands
    setTimeout(() => {
        console.log('🔄 Testing bot commands...');
        console.log('Send the following commands in Discord to test:');
        console.log('  !help - Show help message');
        console.log('  !status - Show bot status');
        console.log('  !pos - Show bot position');
        console.log('  !say Hello from Discord - Make bot say something');
        
        setTimeout(() => {
            console.log('✅ Discord integration test completed');
            process.exit(0);
        }, 5000);
    }, 2000);
});

client.on('messageCreate', (message) => {
    if (message.author.bot) return;
    
    const channel = client.channels.cache.get(discordConfig.discord.channelId);
    if (!channel || message.channel.id !== channel.id) return;
    
    const content = message.content.trim();
    if (content.startsWith(discordConfig.discord.prefix)) {
        const command = content.slice(discordConfig.discord.prefix.length);
        console.log('📝 Command received:', command);
        
        switch(command.toLowerCase()) {
            case 'help':
                const helpEmbed = new EmbedBuilder()
                    .setColor('#0099ff')
                    .setTitle('🤖 Bot Commands')
                    .setDescription('Available commands:')
                    .addFields(
                        { name: '!help', value: 'Show this help message' },
                        { name: '!test', value: 'Test bot response' }
                    );
                message.reply({ embeds: [helpEmbed] });
                break;
            case 'test':
                message.reply('✅ Bot is responding to commands!');
                break;
            default:
                message.reply(`Unknown command: ${command}. Use !help for available commands.`);
        }
    }
});

client.on('error', (error) => {
    console.error('❌ Discord client error:', error);
});

client.login(discordConfig.discord.token)
    .catch(err => {
        console.error('❌ Discord login failed:', err.message);
        process.exit(1);
    });
EOL

node test-discord-only.js

if [ $? -eq 0 ]; then
    print_status "✅ Discord connection test passed" $GREEN
else
    print_status "❌ Discord connection test failed" $RED
    exit 1
fi

print_status "🎉 Discord integration test completed!" $GREEN
print_status "Ready to start full bot with Minecraft integration" $BLUE
