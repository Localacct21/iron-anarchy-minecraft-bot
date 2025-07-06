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
