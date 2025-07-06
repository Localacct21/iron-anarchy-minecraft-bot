# 📦 GitHub Packages Distribution

## Overview

The Iron-Anarchy Minecraft Bot is available through **GitHub Packages**, providing enterprise-grade package distribution directly integrated with our GitHub repository.

**Benefits of GitHub Packages:**

- 🔒 **Enhanced Security** - Integrated with GitHub's security features
- 🏢 **Enterprise Integration** - Native GitHub organization support
- 📊 **Advanced Analytics** - Detailed download and usage metrics
- 🔐 **Access Control** - Fine-grained permission management

---

## 📥 Installation

### Public Installation

```bash
# Install from GitHub Packages
npm install @localacct21/iron-anarchy-minecraft-bot --registry=https://npm.pkg.github.com
```

### Authentication Setup

For private or organization packages, authenticate with GitHub:

```bash
# Login to GitHub Packages
npm login --registry=https://npm.pkg.github.com

# Or use Personal Access Token
echo "//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN" >> ~/.npmrc
```

### .npmrc Configuration

Create a `.npmrc` file in your project:

```ini
@localacct21:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

---

## 🚀 Usage

### Basic Usage

```javascript
// Import the bot
const IronAnarchyBot = require('@localacct21/iron-anarchy-minecraft-bot');

// Create and start bot
const bot = new IronAnarchyBot({
  host: 'ironanarchy.net',
  username: 'your-username',
  password: 'your-password'
});

bot.start();
```

### CLI Usage

```bash
# Global installation
npm install -g @localacct21/iron-anarchy-minecraft-bot --registry=https://npm.pkg.github.com

# Run the bot
iron-anarchy-bot
```

---

## 📊 Package Information

### Package Details

- **Name**: `@localacct21/iron-anarchy-minecraft-bot`
- **Registry**: GitHub Packages
- **Scope**: `@localacct21`
- **Visibility**: Public
- **License**: MIT

### Version Information

| Version | Features | Release Date |
|---------|----------|--------------|
| **2.0.0** | Full enterprise suite with Discord, recording, dashboard | Latest |
| 1.x.x | Legacy versions | Archived |

### Download Statistics

View detailed package analytics at:
**<https://github.com/Localacct21/iron-anarchy-minecraft-bot/packages>**

---

## 🔐 Security & Access

### Package Security

- **Vulnerability Scanning** - Automated security analysis
- **Dependency Auditing** - Regular dependency security checks
- **Access Logging** - Detailed download and access logs
- **Integrity Verification** - Package integrity validation

### Access Control

- **Public Access** - Available to all GitHub users
- **Enterprise Features** - Advanced features for GitHub Enterprise
- **Audit Trail** - Complete access and modification history
- **Role-Based Permissions** - Granular access control

---

## 🏢 Enterprise Features

### GitHub Enterprise Integration

- **Organization Management** - Centralized package management
- **Team Access Control** - Role-based team permissions
- **Compliance Reporting** - Enterprise compliance features
- **Single Sign-On** - Integrated authentication

### Advanced Analytics

- **Download Metrics** - Detailed usage statistics
- **Geographic Distribution** - Global usage patterns
- **Version Adoption** - Version usage analytics
- **Performance Monitoring** - Package performance metrics

---

## 🔧 Development & Publishing

### Local Development

```bash
# Clone repository
git clone https://github.com/Localacct21/iron-anarchy-minecraft-bot.git
cd iron-anarchy-minecraft-bot

# Install dependencies
npm install

# Test before publishing
npm test

# Publish to GitHub Packages
npm run publish:github
```

### Automated Publishing

GitHub Actions automatically publishes new versions:

```yaml
# Triggered on release creation
on:
  release:
    types: [published]

# Or manual trigger
workflow_dispatch:
  inputs:
    version:
      description: 'Version to publish'
      required: true
```

### Manual Publishing

```bash
# Use our publishing script
node scripts/publish-github-package.js

# Or manual npm publish
npm publish --registry=https://npm.pkg.github.com
```

---

## 📚 Integration Examples

### Docker Integration

```dockerfile
# Dockerfile example
FROM node:18-alpine

# Configure npm for GitHub Packages
ARG GITHUB_TOKEN
RUN echo "//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}" >> ~/.npmrc
RUN echo "@localacct21:registry=https://npm.pkg.github.com" >> ~/.npmrc

# Install package
RUN npm install -g @localacct21/iron-anarchy-minecraft-bot

CMD ["iron-anarchy-bot"]
```

### CI/CD Integration

```yaml
# GitHub Actions example
- name: Install Iron-Anarchy Bot
  run: |
    echo "//npm.pkg.github.com/:_authToken=${{ secrets.GITHUB_TOKEN }}" >> ~/.npmrc
    npm install @localacct21/iron-anarchy-minecraft-bot --registry=https://npm.pkg.github.com
```

### Node.js Project Integration

```json
{
  "dependencies": {
    "@localacct21/iron-anarchy-minecraft-bot": "^2.0.0"
  },
  "publishConfig": {
    "@localacct21:registry": "https://npm.pkg.github.com"
  }
}
```

---

## 🆚 Package Registry Comparison

### GitHub Packages vs NPM

| Feature | GitHub Packages | NPM Registry |
|---------|----------------|--------------|
| **Integration** | Native GitHub | Separate service |
| **Security** | GitHub Security | NPM security |
| **Analytics** | Advanced | Basic |
| **Enterprise** | GitHub Enterprise | NPM Enterprise |
| **Cost** | Included with GitHub | Separate pricing |

### When to Use GitHub Packages

- ✅ **Enterprise environments** with GitHub Enterprise
- ✅ **Security-focused** organizations
- ✅ **Integrated workflows** with GitHub Actions
- ✅ **Advanced analytics** requirements
- ✅ **Organization package management**

### When to Use NPM

- ✅ **Public distribution** for maximum reach
- ✅ **Community adoption** focus
- ✅ **Simple installation** requirements
- ✅ **Broad compatibility** needs

---

## 🛠️ Troubleshooting

### Authentication Issues

**Problem**: Cannot authenticate with GitHub Packages

```bash
# Solution: Generate Personal Access Token
# 1. Go to GitHub Settings > Developer settings > Personal access tokens
# 2. Generate token with 'packages:read' and 'packages:write' permissions
# 3. Add to .npmrc or environment variable
```

**Problem**: Permission denied during installation

```bash
# Solution: Check package visibility and permissions
# 1. Verify package is public or you have access
# 2. Check organization permissions
# 3. Validate authentication token
```

### Installation Issues

**Problem**: Package not found

```bash
# Solution: Verify registry configuration
npm config get registry
npm config set @localacct21:registry https://npm.pkg.github.com
```

**Problem**: Version conflicts

```bash
# Solution: Clear npm cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Publishing Issues

**Problem**: Publishing fails with authentication error

```bash
# Solution: Verify GitHub token permissions
# 1. Token needs 'packages:write' permission
# 2. Must be authenticated with GitHub CLI or npm
# 3. Check repository permissions
```

---

## 📞 Support

### GitHub Packages Support

- **Documentation**: [GitHub Packages Docs](https://docs.github.com/en/packages)
- **Community**: [GitHub Community](https://github.community)
- **Enterprise Support**: Contact GitHub Enterprise support

### Project Support

- **Email**: <localacct@ironanarchy.lol>
- **Issues**: [GitHub Issues](https://github.com/Localacct21/iron-anarchy-minecraft-bot/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Localacct21/iron-anarchy-minecraft-bot/discussions)

---

## 🔗 Quick Links

- **📦 Package Page**: <https://github.com/Localacct21/iron-anarchy-minecraft-bot/packages>
- **📊 Analytics**: <https://github.com/Localacct21/iron-anarchy-minecraft-bot/packages> (requires access)
- **🔒 Security**: <https://github.com/Localacct21/iron-anarchy-minecraft-bot/security>
- **📚 Documentation**: <https://github.com/Localacct21/iron-anarchy-minecraft-bot/wiki>

---

<div align="center">

### 🏢 "Enterprise-grade package distribution for professional gaming automation"

**Built by 25-year IT veteran** | **Proven in production** | **Trusted by professionals**

</div>

---

[🏠 Back to Home](Home.md)
