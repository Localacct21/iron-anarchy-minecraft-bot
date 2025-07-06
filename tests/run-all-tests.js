const { spawn } = require('child_process');

async function runTestFile(testFile) {
  return new Promise((resolve) => {
    console.log(`\n🔍 Running ${testFile}...`);
    const child = spawn('node', [testFile], { 
      stdio: 'pipe',
      cwd: __dirname
    });
    
    let output = '';
    let errorOutput = '';
    
    child.stdout.on('data', (data) => {
      output += data.toString();
    });
    
    child.stderr.on('data', (data) => {
      errorOutput += data.toString();
    });
    
    child.on('close', (code) => {
      console.log(output);
      if (errorOutput) {
        console.error(errorOutput);
      }
      resolve(code === 0);
    });
  });
}

async function runAllTests() {
  console.log('🚀 Running all tests...\n');
  
  const testFiles = [
    'plugin-loader-simple.test.js',
    'discord-integration-simple.test.js'
  ];
  
  let totalPassed = 0;
  let totalFailed = 0;
  
  for (const testFile of testFiles) {
    const success = await runTestFile(testFile);
    if (success) {
      totalPassed++;
    } else {
      totalFailed++;
    }
  }
  
  console.log('\n🏁 Final Results:');
  console.log(`✅ Test suites passed: ${totalPassed}`);
  console.log(`❌ Test suites failed: ${totalFailed}`);
  
  if (totalFailed > 0) {
    console.log('\n❌ Some tests failed. Please check the output above.');
    process.exit(1);
  } else {
    console.log('\n🎉 All tests passed!');
    process.exit(0);
  }
}

// Run all tests
runAllTests().catch(error => {
  console.error('Error running tests:', error);
  process.exit(1);
});
