#!/usr/bin/env node

/**
 * Setup Script for Iron-Anarchy Minecraft Bot
 * Creates configuration files from examples
 */

const fs = require('fs');
const path = require('path');

console.log('🔧 Setting up Iron-Anarchy Minecraft Bot...\n');

// Configuration files to create
const configs = [
    {
        source: path.join(__dirname, '..', 'config', 'config.json.example'),
        target: path.join(process.cwd(), 'config.json'),
        name: 'Main configuration'
    },
    {
        source: path.join(__dirname, '..', 'config', 'discord-config.json.example'),
        target: path.join(process.cwd(), 'discord-config.json'),
        name: 'Discord configuration'
    }
];

configs.forEach(config => {
    try {
        if (fs.existsSync(config.target)) {
            console.log(`⚠️  ${config.name} already exists: ${config.target}`);
        } else {
            fs.copyFileSync(config.source, config.target);
            console.log(`✅ Created ${config.name}: ${config.target}`);
        }
    } catch (error) {
        console.error(`❌ Failed to create ${config.name}:`, error.message);
    }
});

console.log('\n🎯 Next steps:');
console.log('1. Edit config.json with your Minecraft credentials');
console.log('2. Edit discord-config.json with your Discord bot token');
console.log('3. Run: npm start');
console.log('\n📚 For help, see: README.md');
