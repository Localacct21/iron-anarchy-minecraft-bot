const mineflayer = require('mineflayer')

console.log('Testing Mineflayer installation...')

// Test basic bot creation (without connecting)
try {
  const testBot = mineflayer.createBot({
    host: 'localhost',
    port: 25565,
    username: 'TestBot',
    version: '1.19.2',
    auth: 'offline'
  })
  
  console.log('✅ Mineflayer installed successfully!')
  console.log('✅ Bot creation works!')
  
  // Test plugin loading
  try {
    const { pathfinder } = require('mineflayer-pathfinder')
    console.log('✅ Pathfinder plugin available!')
  } catch (e) {
    console.log('❌ Pathfinder plugin not available:', e.message)
  }
  
  try {
    const pvp = require('mineflayer-pvp')
    console.log('✅ PvP plugin available!')
  } catch (e) {
    console.log('❌ PvP plugin not available:', e.message)
  }
  
  try {
    const autoEat = require('mineflayer-auto-eat')
    console.log('✅ Auto-eat plugin available!')
  } catch (e) {
    console.log('❌ Auto-eat plugin not available:', e.message)
  }
  
  // Close the test bot
  testBot.end()
  
  console.log('\n🎉 Installation test completed!')
  console.log('You can now run your bot with: ./start.sh')
  
} catch (error) {
  console.log('❌ Error testing bot:', error.message)
}
