# Plugin System Type Definitions

This document outlines the type definitions for the Minecraft Bot Plugin System, including JSDoc `@typedef` blocks for all internal data structures.

## Core Data Structures

### PluginConfig

The main configuration object for individual plugins.

```javascript
/**
 * Configuration object for an individual plugin
 * @typedef {Object} PluginConfig
 * @property {string} name - The unique name identifier for the plugin
 * @property {Object|Function} module - The plugin module or function to load
 * @property {PluginOptions} [options={}] - Optional configuration options for the plugin
 * @property {boolean} [enabled=true] - Whether the plugin is enabled
 * @property {string} [version] - Plugin version string
 * @property {string[]} [dependencies=[]] - Array of plugin names this plugin depends on
 * @property {number} [priority=0] - Loading priority (higher numbers load first)
 * @property {string} [description] - Human-readable description of the plugin
 * @property {string} [author] - Plugin author information
 * @property {Object} [config] - Plugin-specific configuration object
 */
```

**Example Usage:**

```javascript
// Basic plugin configuration
const basicConfig = {
  name: "pathfinder",
  module: require('mineflayer-pathfinder'),
  options: { required: true }
};

// Advanced plugin configuration
const advancedConfig = {
  name: "auto-eat",
  module: require('mineflayer-auto-eat'),
  enabled: true,
  version: "2.1.0",
  dependencies: ["pathfinder"],
  priority: 10,
  description: "Automatically eats food when hungry",
  author: "Plugin Developer",
  config: {
    startAt: 14,
    bannedFood: ["rotten_flesh", "spider_eye"]
  },
  options: {
    required: false,
    timeout: 5000
  }
};
```

### PluginOptions

Configuration options for plugin loading behavior.

```javascript
/**
 * Plugin loading options
 * @typedef {Object} PluginOptions
 * @property {boolean} [required=false] - Whether the plugin is required for bot operation
 * @property {number} [timeout=10000] - Maximum time to wait for plugin loading (ms)
 * @property {boolean} [silent=false] - Whether to suppress loading messages
 * @property {Function} [onLoad] - Callback function called when plugin loads successfully
 * @property {Function} [onError] - Callback function called when plugin fails to load
 * @property {Object} [context] - Additional context to pass to the plugin
 */
```

**Example Usage:**

```javascript
const options = {
  required: true,
  timeout: 5000,
  silent: false,
  onLoad: (pluginName) => console.log(`${pluginName} loaded successfully`),
  onError: (pluginName, error) => console.error(`${pluginName} failed: ${error.message}`),
  context: { bot: botInstance, config: pluginConfig }
};
```

### ValidationResult

Result object returned from plugin validation operations.

```javascript
/**
 * Result object returned from plugin validation operations
 * @typedef {Object} ValidationResult
 * @property {boolean} valid - Whether the validation passed
 * @property {string} [error] - Error message if validation failed
 * @property {string[]} [warnings=[]] - Array of warning messages
 * @property {Object} [data] - Additional validation data
 * @property {string} pluginName - Name of the plugin that was validated
 * @property {Date} timestamp - When the validation occurred
 * @property {string} [suggestion] - Suggested fix for validation errors
 */
```

**Example Usage:**

```javascript
// Successful validation
const successResult = {
  valid: true,
  pluginName: "pathfinder",
  timestamp: new Date(),
  data: { functionCount: 15, exportType: "default" }
};

// Failed validation with suggestion
const failureResult = {
  valid: false,
  error: "Plugin is not a function",
  warnings: ["Plugin exports an object but no function found"],
  pluginName: "broken-plugin",
  timestamp: new Date(),
  suggestion: "Ensure the plugin exports a function or has a 'plugin' property"
};
```

### PluginLoadResult

Result object for individual plugin loading operations.

```javascript
/**
 * Plugin loading result for batch operations
 * @typedef {Object} PluginLoadResult
 * @property {string} name - Name of the plugin
 * @property {boolean} success - Whether the plugin loaded successfully
 * @property {string} [error] - Error message if loading failed
 * @property {number} loadTime - Time taken to load the plugin (ms)
 * @property {Date} timestamp - When the loading attempt occurred
 */
```

### PluginStatus

Comprehensive status information for all plugins.

```javascript
/**
 * Plugin status information
 * @typedef {Object} PluginStatus
 * @property {string[]} loaded - Array of successfully loaded plugin names
 * @property {string[]} failed - Array of failed plugin names
 * @property {number} total - Total number of plugins attempted
 * @property {number} successRate - Success rate as percentage (0-100)
 * @property {Date} lastUpdate - When the status was last updated
 * @property {Object} details - Detailed information about each plugin
 */
```

## Custom Error Classes

The plugin system includes specialized error classes for different failure scenarios:

### PluginLoadError

For general plugin loading failures.

```javascript
/**
 * Custom error class for plugin loading failures
 * @class PluginLoadError
 * @extends Error
 * @property {string} pluginName - Name of the plugin that failed to load
 * @property {string} phase - Loading phase where error occurred
 * @property {Error} [originalError] - Original error that caused the failure
 * @property {Date} timestamp - When the error occurred
 */
```

**Example Usage:**

```javascript
const error = new PluginLoadError(
  "Failed to load pathfinder plugin",
  "pathfinder",
  "validation",
  originalError
);
```

### PluginValidationError

For plugin validation failures.

```javascript
/**
 * Custom error class for plugin validation failures
 * @class PluginValidationError
 * @extends Error
 * @property {string} pluginName - Name of the plugin that failed validation
 * @property {string} validationType - Type of validation that failed
 * @property {string} [suggestion] - Suggested fix for the validation error
 * @property {Date} timestamp - When the error occurred
 */
```

**Example Usage:**

```javascript
const error = new PluginValidationError(
  "Plugin does not export a function",
  "pathfinder",
  "function-check",
  "Ensure the plugin exports a function or has a 'plugin' property"
);
```

### PluginDependencyError

For plugin dependency-related failures.

```javascript
/**
 * Custom error class for plugin dependency failures
 * @class PluginDependencyError
 * @extends Error
 * @property {string} pluginName - Name of the plugin with dependency issues
 * @property {string[]} missingDependencies - Array of missing dependency names
 * @property {Date} timestamp - When the error occurred
 */
```

**Example Usage:**

```javascript
const error = new PluginDependencyError(
  "Missing required dependencies",
  "advanced-plugin",
  ["pathfinder", "auto-eat"]
);
```

## Usage Examples

### Basic Plugin Loading

```javascript
const pluginLoader = new PluginLoader(bot);

// Load a single plugin
await pluginLoader.loadPlugin(
  require('mineflayer-pathfinder'),
  'pathfinder',
  { required: true }
);

// Load multiple plugins
const plugins = [
  {
    name: 'pathfinder',
    module: require('mineflayer-pathfinder'),
    options: { required: true }
  },
  {
    name: 'auto-eat',
    module: require('mineflayer-auto-eat'),
    dependencies: ['pathfinder'],
    config: { startAt: 14 }
  }
];

const results = await pluginLoader.loadPlugins(plugins);
```

### Plugin Validation

```javascript
const pluginConfig = {
  name: 'my-plugin',
  module: require('./my-plugin'),
  enabled: true
};

const validation = pluginLoader.validatePluginConfig(pluginConfig);
if (!validation.valid) {
  console.error(`Validation failed: ${validation.error}`);
  console.log(`Suggestion: ${validation.suggestion}`);
}
```

### Error Handling

```javascript
try {
  await pluginLoader.loadPlugin(brokenPlugin, 'broken-plugin', { required: true });
} catch (error) {
  if (error instanceof PluginValidationError) {
    console.error(`Validation error: ${error.message}`);
    console.log(`Suggestion: ${error.suggestion}`);
  } else if (error instanceof PluginDependencyError) {
    console.error(`Missing dependencies: ${error.missingDependencies.join(', ')}`);
  } else if (error instanceof PluginLoadError) {
    console.error(`Loading failed in phase: ${error.phase}`);
  }
}
```

## Default Values

| Property | Type | Default Value | Description |
|----------|------|---------------|-------------|
| `enabled` | boolean | `true` | Whether the plugin is enabled |
| `options` | PluginOptions | `{}` | Plugin loading options |
| `dependencies` | string[] | `[]` | Plugin dependencies |
| `priority` | number | `0` | Loading priority |
| `required` | boolean | `false` | Whether plugin is required |
| `timeout` | number | `10000` | Loading timeout in milliseconds |
| `silent` | boolean | `false` | Whether to suppress loading messages |
| `warnings` | string[] | `[]` | Validation warnings |

## Type Safety

All type definitions include comprehensive JSDoc annotations for:

- Parameter types and descriptions
- Return types
- Default values
- Usage examples
- Property documentation

This ensures proper IDE support, code completion, and type checking when used with TypeScript or JSDoc-aware editors.

---

[🏠 Back to Home](Home.md)
