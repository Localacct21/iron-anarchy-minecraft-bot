#!/bin/bash
# Iron-Anarchy Minecraft Bot Installation and Setup Script

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_header() {
    echo -e "${BLUE}================================================${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}================================================${NC}"
}

# Check if running as root
if [[ $EUID -eq 0 ]]; then
    print_warning "This script should not be run as root for security reasons"
    read -p "Do you want to continue anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

print_header "Iron-Anarchy Minecraft Bot Setup"

# Check system requirements
print_status "Checking system requirements..."

# Check Node.js
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 14.0.0 or higher."
    exit 1
fi

NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 14 ]; then
    print_error "Node.js version is too old. Please install Node.js 14.0.0 or higher."
    exit 1
fi

print_status "Node.js version: $(node --version) ✓"

# Check npm
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm."
    exit 1
fi

print_status "npm version: $(npm --version) ✓"

# Check Git
if ! command -v git &> /dev/null; then
    print_error "Git is not installed. Please install Git."
    exit 1
fi

print_status "Git version: $(git --version) ✓"

# Install dependencies
print_status "Installing dependencies..."
npm install

# Create necessary directories
print_status "Creating directory structure..."
mkdir -p logs recordings screenshots config

# Setup configuration files
print_status "Setting up configuration files..."

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    if [ -f .env.example ]; then
        cp .env.example .env
        print_status "Created .env file from template"
    else
        print_warning ".env.example not found, creating basic .env file"
        cat > .env << 'EOL'
# Iron-Anarchy Server Configuration
MC_SERVER_HOST=ironanarchy.lol
MC_SERVER_PORT=25565
MC_SERVER_VERSION=1.21.4

# Bot Authentication - REQUIRED
MC_BOT_USERNAME=YourBotUsername
MC_BOT_AUTH=microsoft

# Logging Configuration
LOG_LEVEL=info
LOG_CHAT=true
LOG_COMMANDS=true
LOG_PVP=true
EOL
    fi
else
    print_warning ".env file already exists, skipping creation"
fi

# Run the Node.js setup script
if [ -f scripts/setup.js ]; then
    print_status "Running configuration setup..."
    npm run setup
else
    print_warning "setup.js not found, creating basic config files"
    
    # Create basic config.json if it doesn't exist
    if [ ! -f config.json ]; then
        cat > config.json << 'EOL'
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
EOL
        print_status "Created basic config.json"
    fi
fi

# Set proper permissions
print_status "Setting file permissions..."
chmod +x index.js
chmod +x scripts/*.sh 2>/dev/null || true
chmod +x scripts/*.js 2>/dev/null || true

# Validate installation
print_status "Validating installation..."
if npm run validate 2>/dev/null; then
    print_status "Installation validation passed ✓"
else
    print_warning "Installation validation failed, but continuing..."
fi

# Final instructions
print_header "Setup Complete!"
echo
print_status "Next steps:"
echo "1. Edit the .env file with your Minecraft account credentials:"
echo "   MC_BOT_USERNAME=YourMinecraftUsername"
echo
echo "2. Edit config.json with your preferred settings"
echo
echo "3. (Optional) Set up Discord integration by editing discord-config.json"
echo
echo "4. Start the bot with one of these commands:"
echo "   npm start          # Start with default configuration"
echo "   npm run basic      # Basic bot"
echo "   npm run enhanced   # Enhanced bot with more features"
echo "   npm run advanced   # Advanced bot with AI capabilities"
echo "   npm run discord    # Discord-integrated bot"
echo
echo "5. Access the web interface at: http://localhost:3001"
echo
print_status "For help, check the README.md or visit:"
echo "https://github.com/Localacct21/iron-anarchy-minecraft-bot"
echo
print_warning "Remember to configure your Minecraft account credentials before starting!"
