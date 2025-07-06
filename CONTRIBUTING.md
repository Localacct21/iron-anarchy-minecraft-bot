# 🤝 Contributing to Iron Anarchy Minecraft Bot

We welcome contributions from the community! This guide will help you get started.

## 🚀 Quick Start

1. **Fork the repository**
2. **Clone your fork**:
   ```bash
   git clone https://github.com/your-username/iron-anarchy-minecraft-bot.git
   cd iron-anarchy-minecraft-bot
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Create a feature branch**:
   ```bash
   git checkout -b feature/amazing-feature
   ```

## 🛠️ Development Workflow

### Setting Up Development Environment

```bash
# Install development dependencies
npm install

# Run tests
npm test

# Start in development mode
npm run enhanced

# Run linting
npm run lint

# Format code
npm run format
```

### Code Quality Standards

We maintain high code quality standards:

- **ESLint**: All code must pass linting
- **Prettier**: Code must be properly formatted
- **Tests**: New features require tests
- **Documentation**: Update docs for new features

### Running Tests

```bash
# Run all tests
npm test

# Run specific test files
npm run test:plugin
npm run test:discord

# Run with coverage
npm run test:coverage
```

## 📝 Pull Request Process

1. **Ensure all tests pass**
2. **Update documentation** if needed
3. **Follow commit message conventions**:
   ```
   feat: add new plugin system
   fix: resolve connection timeout issue
   docs: update configuration guide
   test: add unit tests for pathfinding
   ```
4. **Create a descriptive pull request**

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tests pass
- [ ] Manual testing completed
- [ ] No breaking changes

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] Tests added/updated
```

## 🎯 Contributing Areas

### 🔌 Plugin Development

Create new plugins to extend bot functionality:

```javascript
// plugins/example-plugin/index.js
module.exports = function(bot, options) {
  bot.on('spawn', () => {
    console.log('Plugin loaded!')
  })
  
  return {
    name: 'example-plugin',
    version: '1.0.0',
    stop: () => {
      // Cleanup logic
    }
  }
}
```

### 🧪 Testing

Help improve test coverage:

- Unit tests for core functionality
- Integration tests for plugins
- End-to-end deployment tests

### 📚 Documentation

Improve documentation:

- API documentation
- Configuration guides
- Troubleshooting tips
- Usage examples

### 🐛 Bug Reports

When reporting bugs, include:

- Bot version
- Node.js version
- Operating system
- Configuration (sanitized)
- Steps to reproduce
- Expected vs actual behavior

## 🔒 Security

If you discover security vulnerabilities:

1. **Do not** create a public issue
2. Email [localacct@ironanarchy.lol](mailto:localacct@ironanarchy.lol)
3. Include detailed description
4. Wait for response before disclosure

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🏆 Recognition

Contributors will be recognized in:

- README.md contributors section
- Release notes
- GitHub contributors page

Thank you for contributing to Iron Anarchy Minecraft Bot! 🤖
