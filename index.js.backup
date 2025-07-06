#!/usr/bin/env node

/**
 * Iron-Anarchy Minecraft Bot - Main Entry Point
 * Author: localacct@ironanarchy.lol
 * Version: 2.0.0
 */

const path = require('path');
const fs = require('fs');

// Main bot file
const botPath = path.join(__dirname, 'src', 'bots', 'ironanarchy-bot.js');

// Check if bot file exists
if (!fs.existsSync(botPath)) {
    console.error('❌ Bot file not found at:', botPath);
    console.error('Please ensure the installation is complete.');
    process.exit(1);
}

// Load and start the bot
try {
    console.log('🚀 Starting Iron-Anarchy Minecraft Bot...');
    require(botPath);
} catch (error) {
    console.error('❌ Failed to start bot:', error.message);
    console.error('Check your configuration and try again.');
    process.exit(1);
}
