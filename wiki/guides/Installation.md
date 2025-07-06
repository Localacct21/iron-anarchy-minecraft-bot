# Installation & Setup Guide

## Prerequisites

### System Requirements

- **Node.js**: Version 14.0.0 or higher
- **npm**: Version 6.0.0 or higher (comes with Node.js)
- **Git**: For cloning the repository
- **Operating System**: Windows 10+, macOS 10.14+, or Linux (Ubuntu 18.04+, CentOS 7+)

### Minecraft Account Requirements

- **Microsoft/Mojang Account**: Required for online authentication
- **Minecraft Java Edition**: Account must own Minecraft Java Edition
- **Server Access**: Ensure you can connect to the target Minecraft server

## OS-Specific Installation Steps

### Windows

#### Install Node.js

```powershell
# Download and install Node.js from https://nodejs.org/
# Or use Chocolatey package manager
choco install nodejs

# Verify installation
node --version
npm --version
```

#### Install Git

```powershell
# Download and install Git from https://git-scm.com/
# Or use Chocolatey
choco install git

# Verify installation
git --version
```

#### Clone and Setup

```powershell
# Clone the repository
git clone https://github.com/Localacct21/iron-anarchy-minecraft-bot.git
cd iron-anarchy-minecraft-bot

# Install dependencies
npm install

# Run initial setup
npm run setup
```

### macOS

#### Install Node.js

```bash
# Using Homebrew (recommended)
brew install node

# Or download from https://nodejs.org/
# Verify installation
node --version
npm --version
```

#### Install Git

```bash
# Git is usually pre-installed on macOS
# If not, install via Homebrew
brew install git

# Or install Xcode Command Line Tools
xcode-select --install

# Verify installation
git --version
```

#### Clone and Setup

```bash
# Clone the repository
git clone https://github.com/Localacct21/iron-anarchy-minecraft-bot.git
cd iron-anarchy-minecraft-bot

# Install dependencies
npm install

# Run initial setup
npm run setup
```

### Linux (Ubuntu/Debian)

#### Install Node.js

```bash
# Update package index
sudo apt update

# Install Node.js and npm
sudo apt install nodejs npm

# For latest LTS version, use NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

#### Install Git

```bash
# Install Git
sudo apt install git

# Verify installation
git --version
```

#### Clone and Setup

```bash
# Clone the repository
git clone https://github.com/Localacct21/iron-anarchy-minecraft-bot.git
cd iron-anarchy-minecraft-bot

# Install dependencies
npm install

# Run initial setup
npm run setup
```

### Linux (CentOS/RHEL/Fedora)

#### Install Node.js

```bash
# For CentOS/RHEL 8+
sudo dnf install nodejs npm

# For CentOS/RHEL 7
sudo yum install nodejs npm

# For Fedora
sudo dnf install nodejs npm

# Verify installation
node --version
npm --version
```

#### Install Git

```bash
# Install Git
sudo dnf install git  # For Fedora/RHEL 8+
# or
sudo yum install git  # For CentOS/RHEL 7

# Verify installation
git --version
```

## Docker Installation

### Prerequisites

- Docker Engine 20.10.0 or higher
- Docker Compose 1.29.0 or higher

### Create Dockerfile

```dockerfile
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application files
COPY . .

# Create logs directory
RUN mkdir -p logs

# Expose web inventory port
EXPOSE 3001

# Set user to non-root
USER node

# Start the bot
CMD ["npm", "start"]
```

### Create docker-compose.yml

```yaml
version: '3.8'

services:
  minecraft-bot:
    build: .
    container_name: iron-anarchy-bot
    environment:
      - MC_SERVER_HOST=${MC_SERVER_HOST:-ironanarchy.lol}
      - MC_SERVER_PORT=${MC_SERVER_PORT:-25565}
      - MC_SERVER_VERSION=${MC_SERVER_VERSION:-1.21.4}
      - MC_BOT_USERNAME=${MC_BOT_USERNAME}
      - MC_BOT_AUTH=${MC_BOT_AUTH:-microsoft}
      - DISCORD_TOKEN=${DISCORD_TOKEN}
      - DISCORD_CHANNEL_ID=${DISCORD_CHANNEL_ID}
      - LOG_LEVEL=${LOG_LEVEL:-info}
      - LOG_CHAT=${LOG_CHAT:-true}
      - LOG_COMMANDS=${LOG_COMMANDS:-true}
      - LOG_PVP=${LOG_PVP:-true}
    ports:
      - "3001:3001"
    volumes:
      - ./logs:/app/logs
      - ./config:/app/config
      - ./recordings:/app/recordings
      - ./screenshots:/app/screenshots
    restart: unless-stopped
    depends_on:
      - redis
    networks:
      - minecraft-bot-network

  redis:
    image: redis:7-alpine
    container_name: iron-anarchy-redis
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    restart: unless-stopped
    networks:
      - minecraft-bot-network

volumes:
  redis_data:

networks:
  minecraft-bot-network:
    driver: bridge
```

### Docker Commands

```bash
# Build and start the bot
docker-compose up -d

# View logs
docker-compose logs -f minecraft-bot

# Stop the bot
docker-compose down

# Rebuild and restart
docker-compose up -d --build
```

## Environment Variable Setup

### Create .env file

```bash
# Copy the example environment file
cp .env.example .env

# Edit the file with your configuration
nano .env  # or vim .env, code .env, etc.
```

### Required Environment Variables

```bash
# Minecraft Server Configuration
MC_SERVER_HOST=ironanarchy.lol
MC_SERVER_PORT=25565
MC_SERVER_VERSION=1.21.4

# Bot Authentication
MC_BOT_USERNAME=YourBotUsername
MC_BOT_AUTH=microsoft

# Discord Integration (Optional)
DISCORD_TOKEN=your_discord_bot_token_here
DISCORD_CHANNEL_ID=your_discord_channel_id_here

# Logging Configuration
LOG_LEVEL=info
LOG_CHAT=true
LOG_COMMANDS=true
LOG_PVP=true
```

### Optional Environment Variables

```bash
# Web Dashboard Configuration
WEB_DASHBOARD_PORT=3001
WEB_DASHBOARD_ENABLED=true

# Recording Configuration
RECORDING_ENABLED=true
RECORDING_DIRECTORY=./recordings

# Screenshot Configuration
SCREENSHOT_ENABLED=true
SCREENSHOT_DIRECTORY=./screenshots

# Advanced Bot Features
AUTO_EAT_ENABLED=true
AUTO_EAT_START_AT=14
PVP_ENABLED=true
PVP_AUTO_ATTACK_HOSTILE=true

# Performance Settings
MAX_MEMORY_USAGE=512
RECONNECT_ATTEMPTS=5
RECONNECT_DELAY=30000
```

## Configuration Files

### Main Configuration (config.json)

```json
{
  "server": {
    "host": "ironanarchy.lol",
    "port": 25565,
    "version": "1.21.4"
  },
  "bot": {
    "username": "YourBotUsername",
    "auth": "microsoft"
  },
  "features": {
    "autoEat": {
      "enabled": true,
      "priority": "foodPoints",
      "startAt": 14
    },
    "pvp": {
      "enabled": true,
      "autoAttackHostile": true
    },
    "logging": {
      "enabled": true,
      "logChat": true,
      "logCommands": true,
      "logPvP": true
    },
    "webInventory": {
      "enabled": true,
      "port": 3001
    }
  }
}
```

### Discord Configuration (discord-config.json)

```json
{
  "token": "your_discord_bot_token_here",
  "clientId": "your_discord_client_id_here",
  "guildId": "your_discord_guild_id_here",
  "channelId": "your_discord_channel_id_here",
  "features": {
    "chatRelay": true,
    "statusUpdates": true,
    "commandInterface": true
  }
}
```

## First-Run Checklist

### 1. Verify Node.js Installation

```bash
node --version  # Should show v14.0.0 or higher
npm --version   # Should show 6.0.0 or higher
```

### 2. Clone and Install Dependencies

```bash
git clone https://github.com/Localacct21/iron-anarchy-minecraft-bot.git
cd iron-anarchy-minecraft-bot
npm install
```

### 3. Run Initial Setup

```bash
npm run setup
```

### 4. Configure Environment Variables

```bash
# Edit .env file with your settings
cp .env.example .env
# Edit the file with your Minecraft account and server details
```

### 5. Configure Bot Settings

```bash
# Edit config.json with your preferences
nano config.json
```

### 6. Test Configuration

```bash
# Run validation script
npm run validate

# Run basic tests
npm test
```

### 7. Start the Bot

```bash
# Start with default configuration
npm start

# Or start with specific bot type
npm run basic      # Basic bot
npm run enhanced   # Enhanced bot with more features
npm run advanced   # Advanced bot with AI capabilities
npm run discord    # Discord-integrated bot
```

## Verification Steps

### 1. Check Bot Connection

```bash
# Monitor bot logs
tail -f logs/bot.log

# Check for successful connection messages
grep "Successfully connected" logs/bot.log
```

### 2. Test Web Interface

```bash
# Open web inventory (if enabled)
curl http://localhost:3001

# Or open in browser
open http://localhost:3001  # macOS
xdg-open http://localhost:3001  # Linux
start http://localhost:3001  # Windows
```

### 3. Verify Discord Integration

```bash
# Test Discord connection (if configured)
npm run test:discord

# Check Discord bot status in your server
```

### 4. Test Bot Commands

```bash
# Run plugin tests
npm run test:plugin

# Run full integration tests
npm run test
```

### 5. Monitor System Resources

```bash
# Check memory usage
ps aux | grep node

# Check network connections
netstat -an | grep :25565

# Monitor log files
ls -la logs/
```

## Common Issues and Solutions

### Authentication Issues

```bash
# Error: "Invalid credentials"
# Solution: Verify your Microsoft/Mojang account credentials
# Make sure MC_BOT_AUTH is set to "microsoft" for Microsoft accounts

# Error: "multiplayer.disconnect.unverified_username"
# Solution: The server requires online authentication
# Ensure you have a valid Minecraft account and MC_BOT_AUTH=microsoft
```

### Connection Issues

```bash
# Error: "ECONNREFUSED"
# Solution: Check server host and port
# Verify the server is online and accessible

# Error: "Protocol version mismatch"
# Solution: Update MC_SERVER_VERSION to match the server version
```

### Permission Issues

```bash
# Error: "EACCES" or permission denied
# Solution: Check file permissions
chmod +x index.js
chmod +x scripts/*.sh

# Or run with appropriate permissions
sudo npm install  # Only if necessary
```

### Memory Issues

```bash
# Error: "JavaScript heap out of memory"
# Solution: Increase Node.js memory limit
export NODE_OPTIONS="--max-old-space-size=4096"
npm start
```

## Getting Help

- **Documentation**: Check the `/docs` directory for detailed guides
- **Issues**: Report bugs at <https://github.com/Localacct21/iron-anarchy-minecraft-bot/issues>
- **Community**: Join discussions in the repository
- **Email**: Contact <localacct@ironanarchy.lol> for support

## Next Steps

After successful installation:

1. Review the [[README]] for usage instructions
2. Check [[Contributing]] for development guidelines
3. Explore [examples/](./examples/) for usage examples
4. Read [[Security]] for security considerations
5. Check [[Changelog]] for version history

---

*This installation guide is for version 2.0.2 of the Iron-Anarchy Minecraft Bot.*

---

[🏠 Back to Home](Home.md)
