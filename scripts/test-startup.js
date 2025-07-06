#!/usr/bin/env node

console.log('🧪 Testing bot startup...');

try {
    // Test that all required modules can be loaded
    const modules = [
        'discord.js',
        'mineflayer',
        'fs-extra',
        'moment'
    ];
    
    modules.forEach(module => {
        try {
            require(module);
            console.log(`✅ ${module} loaded successfully`);
        } catch (error) {
            console.error(`❌ Failed to load ${module}:`, error.message);
            process.exit(1);
        }
    });
    
    // Test configuration loading
    const fs = require('fs-extra');
    const path = require('path');
    
    const configPath = path.join(__dirname, '..', 'config', 'config.json');
    if (fs.existsSync(configPath)) {
        try {
            const config = require(configPath);
            console.log('✅ Configuration loaded successfully');
            console.log(`Bot username: ${config.bot?.username || 'Not set'}`);
        } catch (error) {
            console.error('❌ Configuration error:', error.message);
        }
    } else {
        console.log('ℹ️  No config file found (using defaults)');
    }
    
    console.log('✅ Startup test completed successfully');
    process.exit(0);
    
} catch (error) {
    console.error('❌ Startup test failed:', error.message);
    process.exit(1);
}
