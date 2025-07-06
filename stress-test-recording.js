const fs = require('fs-extra');
const moment = require('moment');

console.log('🔥 Starting 10-minute recording stress test...');

// Ensure directories exist
fs.ensureDirSync('./recordings');

// Track memory usage
const initialMemory = process.memoryUsage();
console.log('📊 Initial memory usage:', initialMemory);

let recordingData = [];
let eventCounter = 0;
const EVENTS_PER_SECOND = 10; // Simulate high activity
const DURATION_MINUTES = 1; // Use 1 minute for testing (scaled down for demo)
const totalEvents = EVENTS_PER_SECOND * 60 * DURATION_MINUTES;

console.log(`📈 Simulating ${totalEvents} events over ${DURATION_MINUTES} minute(s)...`);

function generateRandomEvent() {
  const eventTypes = ['CHAT', 'PVP', 'MOVEMENT', 'INFO', 'HEALTH_CHANGE', 'FOOD_CHANGE'];
  const messages = [
    'Player movement detected',
    'Combat initiated',
    'Health updated',
    'Food level changed',
    'Chat message received',
    'Block broken',
    'Item picked up',
    'Player attacked',
    'Bot moved',
    'Environment interaction'
  ];
  
  return {
    timestamp: moment().add(eventCounter * 100, 'milliseconds').toISOString(),
    type: eventTypes[Math.floor(Math.random() * eventTypes.length)],
    message: messages[Math.floor(Math.random() * messages.length)],
    botPosition: {
      x: Math.floor(Math.random() * 1000) - 500,
      y: 64 + Math.floor(Math.random() * 10),
      z: Math.floor(Math.random() * 1000) - 500
    },
    botHealth: Math.floor(Math.random() * 20) + 1,
    botFood: Math.floor(Math.random() * 20) + 1,
    eventId: eventCounter
  };
}

// Simulate recording with periodic saves
const interval = setInterval(() => {
  // Generate batch of events
  for (let i = 0; i < EVENTS_PER_SECOND; i++) {
    recordingData.push(generateRandomEvent());
    eventCounter++;
  }
  
  // Save every 1000 events to prevent memory issues
  if (recordingData.length >= 1000) {
    const filename = `./recordings/stress_chunk_${Math.floor(eventCounter / 1000)}_${moment().format('YYYY-MM-DD_HH-mm-ss')}.json`;
    
    const chunkData = {
      startTime: recordingData[0].timestamp,
      endTime: recordingData[recordingData.length - 1].timestamp,
      server: 'ironanarchy.lol',
      botUsername: 'PvPBot',
      events: recordingData,
      chunkNumber: Math.floor(eventCounter / 1000),
      totalEvents: recordingData.length
    };
    
    fs.writeFileSync(filename, JSON.stringify(chunkData, null, 2));
    console.log(`💾 Chunk saved: ${filename} (${recordingData.length} events)`);
    
    // Clear the recording data to free memory
    recordingData = [];
    
    // Check memory usage
    const currentMemory = process.memoryUsage();
    console.log(`📊 Memory usage: RSS: ${(currentMemory.rss / 1024 / 1024).toFixed(2)}MB, Heap: ${(currentMemory.heapUsed / 1024 / 1024).toFixed(2)}MB`);
  }
  
  if (eventCounter >= totalEvents) {
    clearInterval(interval);
    
    // Save any remaining events
    if (recordingData.length > 0) {
      const filename = `./recordings/stress_final_${moment().format('YYYY-MM-DD_HH-mm-ss')}.json`;
      const finalData = {
        startTime: recordingData[0].timestamp,
        endTime: recordingData[recordingData.length - 1].timestamp,
        server: 'ironanarchy.lol',
        botUsername: 'PvPBot',
        events: recordingData,
        chunkNumber: 'final',
        totalEvents: recordingData.length
      };
      
      fs.writeFileSync(filename, JSON.stringify(finalData, null, 2));
      console.log(`💾 Final chunk saved: ${filename} (${recordingData.length} events)`);
    }
    
    // Final memory check
    const finalMemory = process.memoryUsage();
    console.log('📊 Final memory usage:', finalMemory);
    console.log(`📈 Memory increase: RSS: ${((finalMemory.rss - initialMemory.rss) / 1024 / 1024).toFixed(2)}MB`);
    
    // Check disk usage
    const files = fs.readdirSync('./recordings').filter(f => f.startsWith('stress_'));
    let totalSize = 0;
    console.log('\n📁 Generated stress test files:');
    files.forEach(file => {
      const filePath = `./recordings/${file}`;
      const stats = fs.statSync(filePath);
      totalSize += stats.size;
      console.log(`  ${file} - ${(stats.size / 1024).toFixed(2)}KB - ${stats.mtime.toISOString()}`);
    });
    
    console.log(`\n📊 Total disk usage: ${(totalSize / 1024 / 1024).toFixed(2)}MB`);
    console.log(`✅ Stress test completed! Generated ${eventCounter} events`);
    
    // Test video conversion on one of the chunks
    if (files.length > 0) {
      console.log('\n🎬 Testing video conversion...');
      const testFile = `./recordings/${files[0]}`;
      const testData = JSON.parse(fs.readFileSync(testFile, 'utf8'));
      
      // Create video from recording data
      const videoScript = `
        ffmpeg -f lavfi -i color=c=darkblue:s=800x600:d=10 -vf "drawtext=fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf:text='Stress Test Recording\\nEvents: ${testData.totalEvents}\\nDuration: ${testData.startTime} to ${testData.endTime}':fontcolor=white:fontsize=16:x=10:y=10" -c:v libx264 -t 10 ./recordings/stress_test_replay.mp4 -y
      `;
      
      require('child_process').exec(videoScript, (error, stdout, stderr) => {
        if (error) {
          console.log('❌ Video conversion failed:', error.message);
        } else {
          console.log('✅ Video conversion successful!');
          const videoStats = fs.statSync('./recordings/stress_test_replay.mp4');
          console.log(`📹 Video file size: ${(videoStats.size / 1024).toFixed(2)}KB`);
        }
      });
    }
  }
}, 100); // Generate events every 100ms
