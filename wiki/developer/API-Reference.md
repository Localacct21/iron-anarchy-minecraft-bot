# 📖 API Reference

## Core Bot API

### Bot Class

Main bot controller class with connection management and event handling.

#### Constructor

```javascript
new Bot(options)
```

#### Methods

- `connect()` - Connect to Minecraft server
- `disconnect()` - Disconnect from server
- `chat(message)` - Send chat message
- `move(direction)` - Move bot in specified direction

## Plugin API

### Plugin Interface

```javascript
class Plugin {
  constructor(bot) {
    this.bot = bot;
  }
  
  onLoad() {
    // Plugin initialization
  }
  
  onUnload() {
    // Plugin cleanup
  }
}
```

## Event System

See [[Events]] for complete event documentation.

## Examples

Check the [examples directory](../../examples/) for usage examples.

---

[🏠 Back to Home](Home.md)
