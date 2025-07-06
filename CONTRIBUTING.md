# 🤝 Contributing to Iron-Anarchy Minecraft Bot

We **love** contributions! This bot is designed to grow with the community, and we want your help to make it even better! 🚀

## 🎯 How to Contribute

### 🍴 Fork & Pull Request Workflow

1. **Fork** this repository to your GitHub account
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/iron-anarchy-minecraft-bot.git
   cd iron-anarchy-minecraft-bot
   ```
3. **Create a branch** for your feature:
   ```bash
   git checkout -b feature/amazing-new-feature
   ```
4. **Make your changes** and test them
5. **Commit** with a clear message:
   ```bash
   git commit -m "feat: Add amazing new feature for better PVP"
   ```
6. **Push** to your fork:
   ```bash
   git push origin feature/amazing-new-feature
   ```
7. **Create a Pull Request** from your fork to our main repository

## 🌟 What We're Looking For

### 🎮 Feature Ideas
- **New bot commands** and automation features
- **Enhanced PVP strategies** and combat improvements
- **Better pathfinding** and navigation
- **Advanced Discord integrations** and notifications
- **Web dashboard improvements** and new UI features
- **Performance optimizations** and memory management
- **New recording features** and analytics

### 🐛 Bug Fixes
- **Connection stability** improvements
- **Error handling** enhancements
- **Memory leak** fixes
- **Compatibility** with newer Minecraft versions
- **Cross-platform** support improvements

### 📚 Documentation
- **Setup guides** for different operating systems
- **Tutorial videos** and examples
- **API documentation** for plugin developers
- **Troubleshooting guides** for common issues

## 🔧 Development Setup

### Prerequisites
- Node.js 14+ 
- Git
- A Minecraft account for testing
- Basic JavaScript knowledge

### Local Development
```bash
# Clone the repository
git clone https://github.com/Localacct21/iron-anarchy-minecraft-bot.git
cd iron-anarchy-minecraft-bot

# Install dependencies
npm install

# Copy configuration examples
cp config.json.example config.json
cp discord-config.json.example discord-config.json

# Edit with your test credentials
nano config.json
nano discord-config.json

# Run tests to ensure everything works
npm test

# Start development
npm start
```

## 📋 Pull Request Guidelines

### ✅ Before Submitting
- [ ] **Test your changes** thoroughly
- [ ] **Run the test suite** with `npm test`
- [ ] **Update documentation** if needed
- [ ] **Follow existing code style** and patterns
- [ ] **Write clear commit messages**

### 📝 PR Template
When creating a pull request, please include:

```markdown
## 🎯 What does this PR do?
Brief description of the changes

## 🧪 How was this tested?
- [ ] Tested on Windows/Mac/Linux
- [ ] All tests pass (`npm test`)
- [ ] Tested with real Minecraft server
- [ ] Discord integration tested

## 📸 Screenshots (if applicable)
Add screenshots for UI changes

## 🔗 Related Issues
Closes #123
```

## 🎨 Code Style Guidelines

### JavaScript Best Practices
- Use **async/await** instead of callbacks
- **Error handling** with try-catch blocks
- **Clear variable names** and function documentation
- **Modular code** - break features into separate files
- **ES6+** syntax where appropriate

### Example Code Style
```javascript
// ✅ Good
async function connectToServer(config) {
  try {
    const bot = mineflayer.createBot(config);
    await waitForSpawn(bot);
    console.log('Successfully connected to server');
    return bot;
  } catch (error) {
    console.error('Failed to connect:', error.message);
    throw error;
  }
}

// ❌ Avoid
function connectToServer(config, callback) {
  var bot = mineflayer.createBot(config);
  bot.once('spawn', function() {
    callback(null, bot);
  });
  bot.on('error', function(err) {
    callback(err);
  });
}
```

## 🧪 Testing

### Running Tests
```bash
# Run all tests
npm test

# Run specific test suites
npm run test:plugin
npm run test:discord

# Test with your changes
node your-test-file.js
```

### Writing Tests
- Add tests for new features in the `tests/` directory
- Follow existing test patterns
- Test both success and error scenarios
- Include integration tests for complex features

## 🎖️ Recognition

### Contributors Hall of Fame
All contributors will be:
- **Listed in our README** with links to their profiles
- **Mentioned in release notes** for their contributions
- **Given credit** in the npm package contributors section
- **Invited to our Discord** for direct collaboration

### Types of Contributions
- 🐛 **Bug Fixes** - Help make the bot more stable
- ✨ **New Features** - Add cool new functionality
- 📚 **Documentation** - Help others understand and use the bot
- 🎨 **UI/UX** - Improve the web dashboard and user experience
- 🔧 **Performance** - Make the bot faster and more efficient
- 🧪 **Testing** - Ensure quality and reliability

## 📞 Getting Help

### Questions or Ideas?
- **Open an issue** for feature requests
- **Join our Discord** for real-time discussion
- **Email us** at localacct@ironanarchy.lol
- **Check existing issues** - someone might have the same idea!

### Stuck on Something?
We're here to help! Don't hesitate to:
- Ask questions in your pull request
- Request code reviews early and often
- Reach out for guidance on implementation

## 🚀 Feature Request Process

1. **Check existing issues** to avoid duplicates
2. **Open a new issue** with the "feature request" label
3. **Describe the feature** and why it would be useful
4. **Discuss implementation** with maintainers
5. **Create a pull request** when ready

## 📜 Code of Conduct

### Our Pledge
We're committed to making participation in this project a harassment-free experience for everyone, regardless of:
- Experience level
- Gender identity and expression
- Sexual orientation
- Disability
- Personal appearance
- Body size
- Race
- Ethnicity
- Age
- Religion
- Nationality

### Our Standards
**Examples of behavior that contributes to a positive environment:**
- Using welcoming and inclusive language
- Being respectful of differing viewpoints
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

**Examples of unacceptable behavior:**
- Trolling, insulting/derogatory comments, and personal attacks
- Public or private harassment
- Publishing others' private information without permission
- Other conduct which could reasonably be considered inappropriate

## 🎉 Thank You!

Every contribution, no matter how small, makes this project better for everyone. Whether you're fixing a typo, adding a feature, or helping with documentation - **you're awesome!** 🌟

**Let's build the best Minecraft bot together!** 🎮🤖

---

**Happy coding!** 💻✨

**Contact**: localacct@ironanarchy.lol  
**Discord**: [Join our server](#)  
**Issues**: https://github.com/Localacct21/iron-anarchy-minecraft-bot/issues
