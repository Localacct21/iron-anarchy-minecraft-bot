#!/bin/bash
# Iron-Anarchy Minecraft Bot Installation Verification Script

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[✓]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[!]${NC} $1"
}

print_error() {
    echo -e "${RED}[✗]${NC} $1"
}

print_header() {
    echo -e "${BLUE}================================================${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}================================================${NC}"
}

print_header "Iron-Anarchy Minecraft Bot Installation Verification"

# Check Node.js
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    print_status "Node.js installed: $NODE_VERSION"
    
    # Check version
    NODE_MAJOR=$(echo $NODE_VERSION | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_MAJOR" -ge 14 ]; then
        print_status "Node.js version is compatible (>=14.0.0)"
    else
        print_error "Node.js version is too old (need >=14.0.0)"
        exit 1
    fi
else
    print_error "Node.js is not installed"
    exit 1
fi

# Check npm
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    print_status "npm installed: $NPM_VERSION"
else
    print_error "npm is not installed"
    exit 1
fi

# Check Git
if command -v git &> /dev/null; then
    GIT_VERSION=$(git --version)
    print_status "Git installed: $GIT_VERSION"
else
    print_error "Git is not installed"
    exit 1
fi

# Check project files
echo
print_header "Checking Project Files"

# Check main files
if [ -f package.json ]; then
    print_status "package.json exists"
else
    print_error "package.json missing"
    exit 1
fi

if [ -f index.js ]; then
    print_status "index.js exists"
else
    print_error "index.js missing"
    exit 1
fi

# Check directories
for dir in src config scripts examples tests; do
    if [ -d "$dir" ]; then
        print_status "Directory $dir/ exists"
    else
        print_warning "Directory $dir/ missing"
    fi
done

# Check node_modules
if [ -d node_modules ]; then
    print_status "Dependencies installed (node_modules/ exists)"
else
    print_error "Dependencies not installed. Run: npm install"
    exit 1
fi

# Check configuration files
echo
print_header "Checking Configuration Files"

if [ -f .env ]; then
    print_status ".env file exists"
    
    # Check for required variables
    if grep -q "MC_BOT_USERNAME" .env; then
        if grep -q "MC_BOT_USERNAME=YourBotUsername" .env; then
            print_warning ".env file needs to be configured (MC_BOT_USERNAME)"
        else
            print_status "MC_BOT_USERNAME is configured"
        fi
    else
        print_warning "MC_BOT_USERNAME not found in .env"
    fi
    
    if grep -q "MC_BOT_AUTH" .env; then
        print_status "MC_BOT_AUTH is configured"
    else
        print_warning "MC_BOT_AUTH not found in .env"
    fi
else
    print_warning ".env file missing - copy from .env.example"
fi

if [ -f config.json ]; then
    print_status "config.json exists"
else
    print_warning "config.json missing - run: npm run setup"
fi

# Check log directory
if [ -d logs ]; then
    print_status "Logs directory exists"
else
    print_warning "Logs directory missing"
    mkdir -p logs
    print_status "Created logs directory"
fi

# Test basic functionality
echo
print_header "Testing Basic Functionality"

# Test Node.js syntax
if node -c index.js; then
    print_status "Main script syntax is valid"
else
    print_error "Main script has syntax errors"
    exit 1
fi

# Test npm scripts
if npm run --silent validate 2>/dev/null; then
    print_status "Validation script passed"
else
    print_warning "Validation script failed or not available"
fi

# Test package dependencies
echo
print_header "Checking Dependencies"

# Check critical dependencies
CRITICAL_DEPS=("mineflayer" "discord.js" "fs-extra")
for dep in "${CRITICAL_DEPS[@]}"; do
    if npm list "$dep" &> /dev/null; then
        print_status "Dependency $dep is installed"
    else
        print_warning "Dependency $dep is missing"
    fi
done

# Check system resources
echo
print_header "System Resources"

# Check memory
MEMORY_MB=$(free -m | grep '^Mem:' | awk '{print $2}' 2>/dev/null || echo "Unknown")
if [ "$MEMORY_MB" != "Unknown" ]; then
    if [ "$MEMORY_MB" -gt 1024 ]; then
        print_status "Available memory: ${MEMORY_MB}MB"
    else
        print_warning "Low memory: ${MEMORY_MB}MB (recommend 2GB+)"
    fi
fi

# Check disk space
DISK_SPACE=$(df -h . | tail -1 | awk '{print $4}' 2>/dev/null || echo "Unknown")
if [ "$DISK_SPACE" != "Unknown" ]; then
    print_status "Available disk space: $DISK_SPACE"
fi

# Check network connectivity
if ping -c 1 ironanarchy.lol &> /dev/null; then
    print_status "Network connectivity to ironanarchy.lol"
else
    print_warning "Cannot reach ironanarchy.lol (check internet connection)"
fi

# Final summary
echo
print_header "Verification Summary"

if [ -f .env ] && [ -f config.json ] && [ -d node_modules ]; then
    print_status "Installation appears to be complete!"
    echo
    echo "Next steps:"
    echo "1. Configure your Minecraft credentials in .env file"
    echo "2. Adjust settings in config.json as needed"
    echo "3. Run the bot with: npm start"
    echo "4. Access web interface at: http://localhost:3001"
    echo
    print_status "Ready to run!"
else
    print_error "Installation is incomplete. Please check the errors above."
    exit 1
fi
