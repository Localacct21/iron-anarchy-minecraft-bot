#!/usr/bin/env node

/**
 * Manual GitHub Package Publishing Script
 * Publishes Iron-Anarchy Bot to GitHub Packages
 * 
 * Usage: node scripts/publish-github-package.js
 */

const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

console.log('🚀 Publishing Iron-Anarchy Bot to GitHub Packages...\n');

try {
  // Step 1: Backup original package.json
  console.log('📦 Backing up package.json...');
  fs.copyFileSync('package.json', 'package.json.backup');
  
  // Step 2: Use GitHub package configuration
  console.log('🔧 Configuring for GitHub Packages...');
  fs.copyFileSync('package-github.json', 'package.json');
  
  // Step 3: Run tests
  console.log('🧪 Running tests...');
  execSync('npm test', { stdio: 'inherit' });
  
  // Step 4: Check authentication
  console.log('🔐 Checking GitHub authentication...');
  try {
    execSync('npm whoami --registry=https://npm.pkg.github.com', { stdio: 'pipe' });
    console.log('✅ GitHub authentication verified');
  } catch (error) {
    console.log('❌ GitHub authentication failed');
    console.log('Please authenticate with: gh auth login');
    process.exit(1);
  }
  
  // Step 5: Publish to GitHub Packages
  console.log('📤 Publishing to GitHub Packages...');
  execSync('npm publish --registry=https://npm.pkg.github.com', { stdio: 'inherit' });
  
  console.log('\n🎉 Successfully published to GitHub Packages!');
  console.log('📦 Package: @localacct21/iron-anarchy-minecraft-bot');
  console.log('🔗 URL: https://github.com/Localacct21/iron-anarchy-minecraft-bot/packages');
  
} catch (error) {
  console.error('\n❌ Publishing failed:', error.message);
  process.exit(1);
} finally {
  // Restore original package.json
  if (fs.existsSync('package.json.backup')) {
    console.log('\n🔄 Restoring original package.json...');
    fs.copyFileSync('package.json.backup', 'package.json');
    fs.unlinkSync('package.json.backup');
  }
}

console.log('\n📚 Installation instructions:');
console.log('npm install @localacct21/iron-anarchy-minecraft-bot --registry=https://npm.pkg.github.com');
