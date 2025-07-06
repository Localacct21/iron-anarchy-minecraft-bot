# 🔧 ESM Troubleshooting Guide

## Common ESM-Related Issues

### Issue 1: "require() of ES modules is not supported"

**Error Message:**
```
Error [ERR_REQUIRE_ESM]: require() of ES modules is not supported.
require() of /path/to/node_modules/mineflayer-auto-eat/index.js from /path/to/bot.js is an ES module file as it is a .js file whose nearest parent package.json contains "type": "module".
```

**Cause**: Trying to use `require()` with an ESM-only package.

**Solution**: Use our ESM-compatible bot files or dynamic imports:

```bash
# Use the fixed bot files
npm run basic
# or
node src/bots/ironanarchy-bot-fixed.js
```

**Manual Fix**:
```javascript
// Instead of:
const autoEat = require('mineflayer-auto-eat')

// Use:
const autoEat = await import('mineflayer-auto-eat')
```

### Issue 2: "Cannot use import statement outside a module"

**Error Message:**
```
SyntaxError: Cannot use import statement outside a module
```

**Cause**: Using `import` syntax in a CommonJS file.

**Solution**: Use dynamic imports instead:

```javascript
// Instead of:
import autoEat from 'mineflayer-auto-eat'

// Use:
const autoEatModule = await import('mineflayer-auto-eat')
const autoEat = autoEatModule.default
```

### Issue 3: "Module not found" with ESM packages

**Error Message:**
```
Cannot resolve module 'mineflayer-auto-eat'
```

**Cause**: Package might not be installed or incompatible version.

**Solution**: Check installation and version:

```bash
# Check if package is installed
npm list mineflayer-auto-eat

# Install latest version
npm install mineflayer-auto-eat@latest

# Check package.json for "type": "module"
cat node_modules/mineflayer-auto-eat/package.json | grep type
```

### Issue 4: "Plugin is not a function"

**Error Message:**
```
TypeError: plugin is not a function
```

**Cause**: Incorrect export pattern handling.

**Solution**: Use proper export detection:

```javascript
// Robust export handling
const moduleExports = await import('mineflayer-auto-eat')
const plugin = moduleExports.plugin || moduleExports.default || moduleExports
```

### Issue 5: "Top-level await is not available"

**Error Message:**
```
SyntaxError: await is only valid in async function
```

**Cause**: Using `await` outside an async function.

**Solution**: Wrap in async function:

```javascript
// Instead of:
const module = await import('module')

// Use:
async function loadModule() {
  const module = await import('module')
  return module
}
```

### Issue 6: "Dynamic import not supported"

**Error Message:**
```
SyntaxError: Unexpected token '('
```

**Cause**: Node.js version too old.

**Solution**: Update Node.js:

```bash
# Check current version
node --version

# Update to Node.js 14+ (minimum for dynamic import)
# Update to Node.js 16+ (recommended)
```

## Performance Issues

### Issue 7: Slow Plugin Loading

**Symptoms**: Bot takes long time to start, timeouts during plugin loading.

**Cause**: Dynamic imports are asynchronous and can be slower.

**Solution**: Optimize loading order:

```javascript
// Load critical plugins first
const criticalPlugins = ['mineflayer-pathfinder', 'mineflayer-pvp']
const esmPlugins = ['mineflayer-auto-eat', 'mineflayer-collectblock']

// Load CommonJS plugins synchronously
for (const plugin of criticalPlugins) {
  bot.loadPlugin(require(plugin))
}

// Load ESM plugins asynchronously
const esmPromises = esmPlugins.map(async (pluginName) => {
  try {
    const module = await import(pluginName)
    bot.loadPlugin(module.default)
  } catch (error) {
    console.log(`Failed to load ${pluginName}:`, error.message)
  }
})

await Promise.all(esmPromises)
```

### Issue 8: Memory Leaks with Dynamic Imports

**Symptoms**: Memory usage increases over time, especially with reconnections.

**Cause**: Module caching issues with dynamic imports.

**Solution**: Implement proper cleanup:

```javascript
// Track loaded modules
const loadedModules = new Set()

async function loadESMPlugin(pluginName) {
  if (loadedModules.has(pluginName)) {
    return // Already loaded
  }
  
  try {
    const module = await import(pluginName)
    loadedModules.add(pluginName)
    return module
  } catch (error) {
    console.log(`Failed to load ${pluginName}:`, error.message)
    return null
  }
}

// Cleanup on bot disconnect
bot.on('end', () => {
  loadedModules.clear()
})
```

## Configuration Issues

### Issue 9: Config File Not Loading ESM Settings

**Symptoms**: ESM plugins not loading despite being in config.

**Cause**: Configuration not properly handling ESM flags.

**Solution**: Update config structure:

```json
{
  "plugins": {
    "autoEat": {
      "enabled": true,
      "esm": true,
      "package": "mineflayer-auto-eat"
    },
    "collectBlock": {
      "enabled": true,
      "esm": true,
      "package": "mineflayer-collectblock"
    }
  }
}
```

### Issue 10: Environment Variables Not Working

**Symptoms**: ESM-related environment variables ignored.

**Cause**: Environment variables not properly loaded in ESM context.

**Solution**: Ensure proper env loading:

```javascript
// Load environment variables early
require('dotenv').config()

// Or use dynamic import for ESM configs
const configModule = await import('./config/config.mjs')
const config = configModule.default
```

## Development Issues

### Issue 11: Testing ESM Plugins

**Symptoms**: Tests fail with ESM plugins.

**Cause**: Test framework not handling dynamic imports.

**Solution**: Update test files:

```javascript
// test-esm-plugin.js
const { describe, it } = require('mocha')
const assert = require('assert')

describe('ESM Plugin Tests', () => {
  it('should load ESM plugin', async () => {
    try {
      const module = await import('mineflayer-auto-eat')
      assert(module.default || module.plugin, 'Plugin should be available')
    } catch (error) {
      assert.fail(`Plugin failed to load: ${error.message}`)
    }
  })
})
```

### Issue 12: Debugging ESM Loading

**Symptoms**: Hard to debug why ESM modules aren't loading.

**Cause**: Lack of visibility into dynamic import process.

**Solution**: Add detailed logging:

```javascript
async function debugLoadESM(moduleName) {
  console.log(`🔄 Attempting to load ${moduleName}`)
  
  try {
    const startTime = Date.now()
    const module = await import(moduleName)
    const loadTime = Date.now() - startTime
    
    console.log(`✅ ${moduleName} loaded in ${loadTime}ms`)
    console.log(`📦 Export keys:`, Object.keys(module))
    
    return module
  } catch (error) {
    console.log(`❌ ${moduleName} failed:`, error.message)
    console.log(`📍 Error stack:`, error.stack)
    return null
  }
}
```

## Version Compatibility Issues

### Issue 13: Plugin Version Conflicts

**Symptoms**: Some plugins work, others don't, version mismatch errors.

**Cause**: Mixed ESM and CommonJS versions of the same plugin.

**Solution**: Use version pinning:

```json
{
  "dependencies": {
    "mineflayer-auto-eat": "^5.0.0",
    "mineflayer-collectblock": "^2.0.0"
  }
}
```

Check compatibility:

```bash
# Check plugin versions
npm list | grep mineflayer

# Update to compatible versions
npm update mineflayer-auto-eat
```

### Issue 14: Node.js Version Compatibility

**Symptoms**: Dynamic imports not working on older Node.js.

**Cause**: Node.js version too old for ESM features.

**Solution**: Update Node.js:

```bash
# Check current version
node --version

# Required versions:
# Node.js 12.20.0+ (basic dynamic import)
# Node.js 14.0.0+ (stable dynamic import)
# Node.js 16.0.0+ (full ESM support)
```

## Diagnostic Commands

### Quick Diagnostics

```bash
# Check Node.js version
node --version

# Check npm version
npm --version

# Test ESM plugin loading
node -e "import('mineflayer-auto-eat').then(console.log).catch(console.error)"

# List installed mineflayer plugins
npm list | grep mineflayer

# Test bot with ESM support
npm run basic
```

### Advanced Diagnostics

```bash
# Check package.json type settings
find node_modules -name "package.json" -exec grep -l '"type": "module"' {} \;

# Check for ESM-only packages
npm ls --depth=0 | grep -E "(mineflayer|minecraft)"

# Test dynamic import support
node -e "console.log(typeof import)" # Should print 'function'
```

### Log Analysis

```bash
# Check for ESM-related errors
grep -i "esm\|import\|require" logs/bot.log

# Monitor plugin loading
tail -f logs/bot.log | grep -i plugin

# Check for module loading errors
grep -i "module\|loading\|plugin" logs/error.log
```

## Resolution Flowchart

```
ESM Issue Detected
        ↓
Check Node.js version (≥14.0.0)
        ↓
Update if needed → Test again
        ↓
Check if using fixed bot files
        ↓
Switch to fixed versions → Test again
        ↓
Check plugin installation
        ↓
Reinstall plugins → Test again
        ↓
Check export patterns
        ↓
Update import code → Test again
        ↓
Still issues? → Open GitHub issue
```

## Prevention Strategies

### 1. Use Fixed Bot Files

Always use the ESM-compatible bot files:

```bash
# Recommended usage
npm run basic  # Uses bot-fixed.js
node src/bots/ironanarchy-bot-fixed.js  # Enhanced version
```

### 2. Version Pinning

Pin ESM plugin versions in package.json:

```json
{
  "dependencies": {
    "mineflayer-auto-eat": "5.0.2",
    "mineflayer-collectblock": "2.0.1"
  }
}
```

### 3. Regular Testing

Test ESM compatibility regularly:

```bash
# Add to CI/CD pipeline
npm run test:plugin
npm run test:esm
```

### 4. Monitoring

Monitor plugin loading in production:

```javascript
// Add to bot initialization
const pluginLoadTimes = new Map()

async function monitoredLoadPlugin(bot, pluginName) {
  const startTime = Date.now()
  try {
    const module = await import(pluginName)
    const loadTime = Date.now() - startTime
    pluginLoadTimes.set(pluginName, loadTime)
    console.log(`✅ ${pluginName}: ${loadTime}ms`)
  } catch (error) {
    console.log(`❌ ${pluginName}: ${error.message}`)
  }
}
```

## Getting Help

If you're still experiencing issues:

1. **Check Logs**: Review `logs/bot.log` and `logs/error.log`
2. **Run Diagnostics**: Use the commands above
3. **Check GitHub Issues**: Search existing issues
4. **Open New Issue**: Include diagnostic output
5. **Discord Community**: Join for real-time help

## Related Documentation

- [ESM Compatibility Guide](./ESM-Compatibility-Guide.md)
- [Installation Guide](./Installation.md)
- [Migration Guide](./Migration-Guide.md)
- [Plugin Development](../developer/Plugin-Development.md)

---

*This troubleshooting guide is for Iron-Anarchy Minecraft Bot v2.0.4+*

---

[🏠 Back to Home](../Home.md) | [📖 Table of Contents](../Table-of-Contents.md)
