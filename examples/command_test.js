// Simple command test
const fs = require('fs');

const code = fs.readFileSync('enhanced-ironanarchy-bot.js', 'utf8');

const commands = [
  '!record',
  '!screenshot', 
  '!discord',
  '!status',
  '!help'
];

console.log('🔍 Checking for command implementations...');

commands.forEach(cmd => {
  const found = code.includes(cmd);
  console.log(`${found ? '✅' : '❌'} ${cmd}: ${found ? 'Found' : 'Not found'}`);
});

// Check for recording functions
const recordingFunctions = [
  'recordEvent',
  'startRecording',
  'stopRecording',
  'saveRecording'
];

console.log('\n🔍 Checking for recording functions...');

recordingFunctions.forEach(func => {
  const found = code.includes(func);
  console.log(`${found ? '✅' : '❌'} ${func}: ${found ? 'Found' : 'Not found'}`);
});
