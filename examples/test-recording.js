const fs = require('fs-extra');
const moment = require('moment');
const { spawn } = require('child_process');

// Ensure directories exist
fs.ensureDirSync('./recordings');

// Create test recording data
const testRecordingData = [
  {
    timestamp: moment().toISOString(),
    type: 'INFO',
    message: 'Bot started',
    botPosition: { x: 0, y: 64, z: 0 },
    botHealth: 20,
    botFood: 20
  },
  {
    timestamp: moment().add(1, 'second').toISOString(),
    type: 'CHAT',
    message: 'Player joined the game',
    botPosition: { x: 1, y: 64, z: 0 },
    botHealth: 20,
    botFood: 20
  },
  {
    timestamp: moment().add(2, 'seconds').toISOString(),
    type: 'PVP',
    message: 'Player attacked',
    botPosition: { x: 2, y: 64, z: 0 },
    botHealth: 18,
    botFood: 20
  },
  {
    timestamp: moment().add(3, 'seconds').toISOString(),
    type: 'MOVEMENT',
    message: 'Bot moved',
    botPosition: { x: 3, y: 64, z: 0 },
    botHealth: 18,
    botFood: 19
  },
  {
    timestamp: moment().add(4, 'seconds').toISOString(),
    type: 'SUCCESS',
    message: 'Recording stopped',
    botPosition: { x: 4, y: 64, z: 0 },
    botHealth: 18,
    botFood: 19
  }
];

// Save test recording
const filename = `./recordings/test_recording_${moment().format('YYYY-MM-DD_HH-mm-ss')}.json`;
const recordingObject = {
  startTime: testRecordingData[0].timestamp,
  endTime: testRecordingData[testRecordingData.length - 1].timestamp,
  server: 'ironanarchy.lol',
  botUsername: 'PvPBot',
  events: testRecordingData
};

fs.writeFileSync(filename, JSON.stringify(recordingObject, null, 2));
console.log(`✅ Test recording saved: ${filename} (${testRecordingData.length} events)`);

// Create a simple replay visualization (converting to video-like format)
const replayScript = `
#!/bin/bash
echo "Creating replay visualization..."
cat > /tmp/replay_data.txt << 'REPLAY_EOF'
${testRecordingData.map(event => `${event.timestamp}: ${event.type} - ${event.message} (Pos: ${event.botPosition.x},${event.botPosition.y},${event.botPosition.z})`).join('\n')}
REPLAY_EOF

# Create a simple text-based video using ffmpeg
echo "Converting to video format..."
ffmpeg -f lavfi -i color=c=black:s=640x480:d=5 -vf "drawtext=fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf:textfile=/tmp/replay_data.txt:fontcolor=white:fontsize=12:x=10:y=10" -c:v libx264 -t 5 ./recordings/replay_${moment().format('YYYY-MM-DD_HH-mm-ss')}.mp4 -y
echo "✅ Video replay generated"
`;

fs.writeFileSync('/tmp/create_replay.sh', replayScript);
console.log('✅ Replay script created');

// Execute the replay script
const child = spawn('bash', ['/tmp/create_replay.sh'], { stdio: 'inherit' });
child.on('close', (code) => {
  console.log(`Replay script finished with code ${code}`);
  
  // List all recordings
  console.log('\n📁 Generated recordings:');
  const files = fs.readdirSync('./recordings');
  files.forEach(file => {
    const filePath = `./recordings/${file}`;
    const stats = fs.statSync(filePath);
    console.log(`  ${file} - ${stats.size} bytes - ${stats.mtime.toISOString()}`);
  });
});
