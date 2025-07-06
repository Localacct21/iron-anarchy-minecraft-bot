# 🔧 Troubleshooting Guide

## Common Issues

### Connection Problems

**Issue**: Bot fails to connect to server
```
Error: connect ECONNREFUSED
```

**Solutions**:
1. Verify server host and port
2. Check firewall settings
3. Ensure server allows bot connections
4. Try different Minecraft version

### Authentication Issues

**Issue**: Authentication failed
```
Error: Invalid credentials
```

**Solutions**:
1. Use correct authentication mode
2. Verify Microsoft account credentials
3. Check if account has Minecraft license
4. Try offline mode for testing

### Discord Integration

**Issue**: Discord bot not responding
```
Error: Missing Access
```

**Solutions**:
1. Verify Discord bot token
2. Check bot permissions
3. Ensure bot is in correct guild
4. Verify channel permissions

### Plugin Loading Errors

**Issue**: Plugin fails to load
```
Error: Plugin not found
```

**Solutions**:
1. Check plugin file path
2. Verify plugin compatibility
3. Review plugin dependencies
4. Check file permissions

## Performance Issues

### High Memory Usage
- Reduce plugin count
- Optimize pathfinding settings
- Limit inventory operations

### Connection Lag
- Check network connection
- Reduce update frequencies
- Use closer server regions

## Getting Help

1. Check the logs in `logs/` directory
2. Review configuration files
3. Join our Discord community
4. Open an issue on GitHub

## Health Checks

Run diagnostic commands:
```bash
npm run test:startup
npm run validate
```

## Log Analysis

Check log files for detailed error information:
```bash
tail -f logs/bot.log
tail -f logs/error.log
```

## ESM-Related Issues

### ESM Module Loading Errors

**Issue**: Cannot load ESM-only plugins
```
Error [ERR_REQUIRE_ESM]: require() of ES modules is not supported
```

**Solutions**:
1. Use ESM-compatible bot files:
   ```bash
   npm run basic           # Basic ESM-compatible bot
   npm run enhanced        # Enhanced ESM-compatible bot
   ```
2. Verify Node.js version (14.0.0+ required):
   ```bash
   node --version
   ```
3. Test ESM plugin loading:
   ```bash
   node -e "import('mineflayer-auto-eat').then(console.log).catch(console.error)"
   ```

### Plugin Compatibility Issues

**Issue**: Mixed CommonJS and ESM plugins
```
TypeError: plugin is not a function
```

**Solutions**:
1. Use fixed bot files that handle both types
2. Check plugin export patterns:
   ```javascript
   const plugin = module.default || module.plugin || module
   ```
3. Verify plugin versions:
   ```bash
   npm list | grep mineflayer
   ```

### Dynamic Import Failures

**Issue**: Dynamic imports not working
```
SyntaxError: Unexpected token '('
```

**Solutions**:
1. Update Node.js to 14.0.0+
2. Use async/await properly:
   ```javascript
   async function loadPlugin() {
     const module = await import('plugin-name')
     return module.default
   }
   ```

## ESM Diagnostic Commands

```bash
# Test ESM support
node -e "console.log(typeof import)"

# Test specific ESM plugin
node -e "import('mineflayer-auto-eat').then(m => console.log('✅ ESM works')).catch(console.error)"

# Run ESM compatibility test
npm run test:esm

# Check bot with ESM support
npm run basic
```

## ESM Resources

- [ESM Compatibility Guide](wiki/guides/ESM-Compatibility-Guide.md)
- [ESM Troubleshooting Guide](wiki/guides/ESM-Troubleshooting-Guide.md)
- [Fixed Bot Files Guide](wiki/guides/Fixed-Bot-Files-Guide.md)
- [Migration Guide](wiki/guides/Migration-Guide.md)
