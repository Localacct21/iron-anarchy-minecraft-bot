/**
 * Simple Plugin Test
 * Just tests imports and function validation without creating a bot
 */

console.log('🔍 Testing Plugin Imports...\n')

// Test each plugin import
const plugins = []

try {
  console.log('1. Testing mineflayer-pathfinder...')
  const { pathfinder } = require('mineflayer-pathfinder')
  console.log(`   Type: ${typeof pathfinder}`)
  console.log(`   ✅ pathfinder: ${typeof pathfinder === 'function' ? 'VALID' : 'INVALID'}`)
  plugins.push({ name: 'pathfinder', module: pathfinder, valid: typeof pathfinder === 'function' })
} catch (error) {
  console.log(`   ❌ pathfinder: ${error.message}`)
  plugins.push({ name: 'pathfinder', valid: false, error: error.message })
}

try {
  console.log('\n2. Testing mineflayer-pvp...')
  const mineflayerPvp = require('mineflayer-pvp')
  console.log(`   Type: ${typeof mineflayerPvp}`)
  console.log(`   Has plugin: ${mineflayerPvp.plugin ? 'yes' : 'no'}`)
  const isValid = typeof mineflayerPvp.plugin === 'function'
  console.log(`   ✅ mineflayer-pvp: ${isValid ? 'VALID' : 'INVALID'}`)
  plugins.push({ name: 'mineflayer-pvp', module: mineflayerPvp.plugin, valid: isValid })
} catch (error) {
  console.log(`   ❌ mineflayer-pvp: ${error.message}`)
  plugins.push({ name: 'mineflayer-pvp', valid: false, error: error.message })
}

try {
  console.log('\n3. Testing mineflayer-auto-eat...')
  const autoEatModule = require('mineflayer-auto-eat')
  console.log(`   Type: ${typeof autoEatModule}`)
  console.log(`   Has loader: ${autoEatModule.loader ? 'yes' : 'no'}`)
  const autoEat = autoEatModule.loader || autoEatModule
  const isValid = typeof autoEat === 'function'
  console.log(`   ✅ mineflayer-auto-eat: ${isValid ? 'VALID' : 'INVALID'}`)
  plugins.push({ name: 'mineflayer-auto-eat', module: autoEat, valid: isValid })
} catch (error) {
  console.log(`   ❌ mineflayer-auto-eat: ${error.message}`)
  plugins.push({ name: 'mineflayer-auto-eat', valid: false, error: error.message })
}

try {
  console.log('\n4. Testing mineflayer-armor-manager...')
  const armorManager = require('mineflayer-armor-manager')
  console.log(`   Type: ${typeof armorManager}`)
  const isValid = typeof armorManager === 'function'
  console.log(`   ✅ mineflayer-armor-manager: ${isValid ? 'VALID' : 'INVALID'}`)
  plugins.push({ name: 'mineflayer-armor-manager', module: armorManager, valid: isValid })
} catch (error) {
  console.log(`   ❌ mineflayer-armor-manager: ${error.message}`)
  plugins.push({ name: 'mineflayer-armor-manager', valid: false, error: error.message })
}

try {
  console.log('\n5. Testing mineflayer-collectblock...')
  const collectBlock = require('mineflayer-collectblock')
  console.log(`   Type: ${typeof collectBlock}`)
  console.log(`   Has plugin: ${collectBlock.plugin ? 'yes' : 'no'}`)
  const isValid = typeof collectBlock.plugin === 'function'
  console.log(`   ✅ mineflayer-collectblock: ${isValid ? 'VALID' : 'INVALID'}`)
  plugins.push({ name: 'mineflayer-collectblock', module: collectBlock.plugin, valid: isValid })
} catch (error) {
  console.log(`   ❌ mineflayer-collectblock: ${error.message}`)
  plugins.push({ name: 'mineflayer-collectblock', valid: false, error: error.message })
}

try {
  console.log('\n6. Testing mineflayer-bloodhound...')
  const bloodhound = require('mineflayer-bloodhound')
  console.log(`   Type: ${typeof bloodhound}`)
  const isValid = typeof bloodhound === 'function'
  console.log(`   ✅ mineflayer-bloodhound: ${isValid ? 'VALID' : 'INVALID'}`)
  plugins.push({ name: 'mineflayer-bloodhound', module: bloodhound, valid: isValid })
} catch (error) {
  console.log(`   ❌ mineflayer-bloodhound: ${error.message}`)
  plugins.push({ name: 'mineflayer-bloodhound', valid: false, error: error.message })
}

try {
  console.log('\n7. Testing mineflayer-web-inventory...')
  const webInventory = require('mineflayer-web-inventory')
  console.log(`   Type: ${typeof webInventory}`)
  const isValid = typeof webInventory === 'function'
  console.log(`   ✅ mineflayer-web-inventory: ${isValid ? 'VALID' : 'INVALID'}`)
  plugins.push({ name: 'mineflayer-web-inventory', module: webInventory, valid: isValid })
} catch (error) {
  console.log(`   ❌ mineflayer-web-inventory: ${error.message}`)
  plugins.push({ name: 'mineflayer-web-inventory', valid: false, error: error.message })
}

// Summary
console.log('\n📊 PLUGIN VALIDATION SUMMARY:')
const validPlugins = plugins.filter(p => p.valid)
const invalidPlugins = plugins.filter(p => !p.valid)

console.log(`✅ Valid plugins: ${validPlugins.length}/${plugins.length}`)
if (validPlugins.length > 0) {
  console.log(`   ${validPlugins.map(p => p.name).join(', ')}`)
}

if (invalidPlugins.length > 0) {
  console.log(`❌ Invalid plugins: ${invalidPlugins.length}`)
  invalidPlugins.forEach(p => {
    console.log(`   ${p.name}: ${p.error || 'Not a function'}`)
  })
}

console.log(`\n🎯 Success Rate: ${(validPlugins.length/plugins.length*100).toFixed(1)}%`)
