# 🔧 Troubleshooting Guide

Common issues and solutions for the Iron Anarchy Minecraft Bot.

## 🚨 Common Issues

### Bot Won't Connect to Server

**Symptoms**: Connection timeouts, authentication errors

**Solutions**:
1. Verify server address and port
2. Check authentication credentials
3. Ensure server allows offline/online mode as configured
4. Test network connectivity: `ping your-server.com`

### Docker Container Issues

**Container won't start**:
```bash
# Check logs
docker logs minecraft-bot

# Verify configuration
docker run --rm -v $(pwd)/config:/app/config ghcr.io/localacct21/iron-anarchy-minecraft-bot:latest npm run validate
```

**Permission errors**:
```bash
# Fix file permissions
sudo chown -R 1001:1001 config/ logs/ data/
```

### Plugin Loading Errors

**Module not found errors**:
```bash
# Reinstall dependencies
npm install

# Validate plugins
npm run validate
```

### Discord Integration Issues

**Bot not responding to Discord**:
1. Verify Discord bot token
2. Check channel permissions
3. Ensure bot has correct roles

## 📊 Health Checks

```bash
# Check bot health
curl http://localhost:3000/health

# Monitor container
docker stats minecraft-bot

# View detailed logs
docker logs minecraft-bot --tail=100 --follow
```

## 🆘 Getting Help

If you encounter issues not covered here:

1. Check [GitHub Issues](https://github.com/Localacct21/iron-anarchy-minecraft-bot/issues)
2. Review [Documentation](https://localacct21.github.io/iron-anarchy-minecraft-bot/)
3. Contact support: [localacct@ironanarchy.lol](mailto:localacct@ironanarchy.lol)
