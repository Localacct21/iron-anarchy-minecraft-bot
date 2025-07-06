# 🔧 ESM Module Compatibility Guide

## Overview

The Iron-Anarchy Minecraft Bot has been updated to support both CommonJS (CJS) and ES Module (ESM) dependencies. This guide explains how to work with ESM modules in your bot configurations and custom plugins.

## What Are ESM Modules?

ES Modules (ESM) are the official JavaScript module system introduced in ES6. Many modern npm packages are transitioning to ESM-only releases, which can cause compatibility issues with CommonJS-based projects.

### Key Differences

| Feature | CommonJS | ESM |
|---------|----------|-----|
| Import syntax | `require()` | `import` |
| Export syntax | `module.exports` | `export` |
| Loading | Synchronous | Asynchronous |
| File extension | `.js` | `.mjs` or `.js` with `"type": "module"` |

## ESM-Compatible Bot Files

The project includes several bot files that handle ESM modules correctly:

### 1. Basic Bot (`src/bots/bot-fixed.js`)
- **Usage**: `npm run basic`
- **Features**: Basic functionality with ESM support
- **Best for**: Simple setups, testing ESM compatibility

### 2. Enhanced Bot (`src/bots/ironanarchy-bot-fixed.js`)
- **Usage**: `node src/bots/ironanarchy-bot-fixed.js`
- **Features**: Full feature set with ESM support
- **Best for**: Production deployments requiring ESM modules

## Dynamic Import Pattern

Our bots use dynamic imports to load ESM modules at runtime:

```javascript
// Dynamic import for ESM modules
let autoEat = null

try {
  const autoEatModule = await import('mineflayer-auto-eat')
  autoEat = autoEatModule.plugin || autoEatModule.default
  console.log('✅ mineflayer-auto-eat loaded successfully')
} catch (error) {
  console.log('⚠️ mineflayer-auto-eat not available:', error.message)
}
```

### Benefits of This Approach

1. **Graceful Degradation**: Bot continues working if ESM modules fail to load
2. **Backward Compatibility**: Works with both CommonJS and ESM packages
3. **Future-Proof**: Ready for when more packages become ESM-only
4. **Error Handling**: Clear feedback when modules are unavailable

## Common ESM Modules

These popular mineflayer plugins are ESM-only:

| Module | Version | Status |
|--------|---------|---------|
| `mineflayer-auto-eat` | 5.0.0+ | ESM-only |
| `mineflayer-collectblock` | 2.0.0+ | ESM-only |
| `mineflayer-dashboard` | 2.0.0+ | ESM-only |

## How to Use ESM Modules

### 1. Using Fixed Bot Files

The easiest approach is to use our pre-configured bot files:

```bash
# Use the basic ESM-compatible bot
npm run basic

# Use the enhanced ESM-compatible bot  
node src/bots/ironanarchy-bot-fixed.js
```

### 2. In Custom Plugins

When creating custom plugins, use this pattern:

```javascript
// custom-plugin.js
const { pathfinder } = require('mineflayer-pathfinder')

async function loadPlugin(bot) {
  // Load ESM modules dynamically
  let autoEat = null
  try {
    const autoEatModule = await import('mineflayer-auto-eat')
    autoEat = autoEatModule.plugin || autoEatModule.default
    bot.loadPlugin(autoEat)
  } catch (error) {
    console.log('Auto-eat plugin not available:', error.message)
  }
  
  // Load CommonJS modules normally
  bot.loadPlugin(pathfinder)
}

module.exports = { loadPlugin }
```

### 3. In Configuration Files

Update your `config.json` to specify which bot type to use:

```json
{
  "bot": {
    "type": "fixed",
    "file": "src/bots/bot-fixed.js"
  },
  "plugins": {
    "autoEat": {
      "enabled": true,
      "esm": true
    }
  }
}
```

## Version Compatibility

### Node.js Requirements

- **Minimum**: Node.js 14.0.0 (basic dynamic import support)
- **Recommended**: Node.js 16.0.0+ (full ESM support)
- **Optimal**: Node.js 18.0.0+ (latest ESM features)

### Package.json Configuration

Keep your `package.json` as CommonJS for compatibility:

```json
{
  "type": "commonjs",
  "engines": {
    "node": ">=14.0.0"
  }
}
```

## Advanced ESM Integration

### 1. Conditional Loading

Load different modules based on availability:

```javascript
async function loadBestAvailablePlugin(bot) {
  // Try ESM version first
  try {
    const esmModule = await import('mineflayer-plugin-esm')
    bot.loadPlugin(esmModule.default)
    console.log('✅ Loaded ESM version')
    return
  } catch (error) {
    console.log('ESM version not available')
  }
  
  // Fall back to CommonJS
  try {
    const cjsModule = require('mineflayer-plugin-cjs')
    bot.loadPlugin(cjsModule)
    console.log('✅ Loaded CommonJS version')
  } catch (error) {
    console.log('❌ No compatible version found')
  }
}
```

### 2. Plugin Validator

Use our ESM plugin validator:

```javascript
const { validatePlugin } = require('./src/utils/fixed-plugin-validator')

async function safeLoadPlugin(bot, pluginName) {
  const plugin = await validatePlugin(pluginName)
  if (plugin) {
    bot.loadPlugin(plugin)
    console.log(`✅ Loaded ${pluginName}`)
  } else {
    console.log(`❌ Failed to load ${pluginName}`)
  }
}
```

## Testing ESM Compatibility

### 1. Plugin Test

```bash
# Test specific plugins
npm run test:plugin

# Test ESM compatibility
node scripts/test-esm.js
```

### 2. Manual Testing

```javascript
// test-esm.js
async function testESMModules() {
  const modules = [
    'mineflayer-auto-eat',
    'mineflayer-collectblock',
    'mineflayer-dashboard'
  ]
  
  for (const moduleName of modules) {
    try {
      const module = await import(moduleName)
      console.log(`✅ ${moduleName}: Available`)
    } catch (error) {
      console.log(`❌ ${moduleName}: ${error.message}`)
    }
  }
}

testESMModules()
```

## Best Practices

### 1. Error Handling

Always wrap dynamic imports in try-catch:

```javascript
try {
  const module = await import('esm-module')
  // Use module
} catch (error) {
  console.log('Module not available:', error.message)
  // Provide fallback or continue without module
}
```

### 2. Module Detection

Check for correct export patterns:

```javascript
const module = await import('some-module')
const plugin = module.plugin || module.default || module
```

### 3. Logging

Provide clear feedback about module loading:

```javascript
console.log('🔄 Loading ESM modules...')
// ... loading code ...
console.log('✅ All modules loaded successfully')
```

## Migration Strategy

### From Legacy to ESM-Compatible

1. **Update Bot Files**: Use `*-fixed.js` versions
2. **Test Compatibility**: Run `npm run test:plugin`
3. **Update Configuration**: Modify config files if needed
4. **Monitor Logs**: Check for loading errors
5. **Gradual Migration**: Move one plugin at a time

### Rollback Plan

If issues occur:

1. **Revert to Standard Bots**: Use non-fixed versions
2. **Disable ESM Plugins**: Comment out in configuration
3. **Check Logs**: Review error messages
4. **Report Issues**: Open GitHub issue with details

## Troubleshooting

See the [ESM Troubleshooting Guide](./ESM-Troubleshooting-Guide.md) for common issues and solutions.

## Related Documentation

- [Installation Guide](./Installation.md)
- [Plugin Development](../developer/Plugin-Development.md)
- [Migration Guide](./Migration-Guide.md)
- [Troubleshooting](./ESM-Troubleshooting-Guide.md)

---

*This guide is for Iron-Anarchy Minecraft Bot v2.0.4+*

---

[🏠 Back to Home](../Home.md) | [📖 Table of Contents](../Table-of-Contents.md)
