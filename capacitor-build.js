
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration
const appName = 'fila-zero-facil';
const appId = 'app.lovable.57fdfdaeaba644bfa52cb0d8b459a277';
const webDir = 'dist';

// Check if this is the first run
const isFirstRun = !fs.existsSync(path.join(__dirname, 'android'));

// Build the web app
console.log('Building web app...');
execSync('npm run build', { stdio: 'inherit' });

if (isFirstRun) {
  // Initialize Capacitor
  console.log('Initializing Capacitor...');
  execSync(`npx cap init ${appName} ${appId} --web-dir ${webDir}`, { stdio: 'inherit' });

  // Add Android platform
  console.log('Adding Android platform...');
  execSync('npx cap add android', { stdio: 'inherit' });
} else {
  // Sync changes to Android
  console.log('Syncing changes to Android...');
  execSync('npx cap sync android', { stdio: 'inherit' });
}

console.log('Build completed successfully!');
console.log('');
console.log('To run the app on an Android device or emulator:');
console.log('1. Run: npx cap open android');
console.log('2. Build and run the app from Android Studio');
console.log('');
console.log('Or use: npx cap run android');
