
/**
 * This file provides Capacitor commands that can be run directly with Node.js
 * without needing to modify package.json
 * 
 * Run commands using: node capacitor-commands.js [command]
 * 
 * Available commands:
 * - init: Initialize Capacitor
 * - add-android: Add Android platform
 * - sync: Sync changes to native platforms
 * - open-android: Open Android Studio
 * - build-android: Build for Android
 * - run-android: Run on Android device/emulator
 */

const { execSync } = require('child_process');

// Configuration
const appName = 'fila-zero-facil';
const appId = 'app.lovable.57fdfdaeaba644bfa52cb0d8b459a277';
const webDir = 'dist';

// Parse command
const command = process.argv[2];

if (!command) {
  showHelp();
  process.exit(0);
}

// Execute the appropriate command
try {
  switch (command) {
    case 'init':
      console.log('Initializing Capacitor...');
      execSync(`npx cap init ${appName} ${appId} --web-dir ${webDir}`, { stdio: 'inherit' });
      break;
    
    case 'add-android':
      console.log('Adding Android platform...');
      execSync('npx cap add android', { stdio: 'inherit' });
      break;
    
    case 'sync':
      console.log('Syncing changes to native platforms...');
      execSync('npx cap sync', { stdio: 'inherit' });
      break;
    
    case 'open-android':
      console.log('Opening Android Studio...');
      execSync('npx cap open android', { stdio: 'inherit' });
      break;
    
    case 'build-android':
      console.log('Running build process for Android...');
      execSync('node capacitor-build.js', { stdio: 'inherit' });
      break;
    
    case 'run-android':
      console.log('Running on Android device/emulator...');
      execSync('npx cap run android', { stdio: 'inherit' });
      break;
    
    default:
      console.log(`Unknown command: ${command}`);
      showHelp();
      break;
  }
} catch (error) {
  console.error('Error executing command:', error.message);
  process.exit(1);
}

function showHelp() {
  console.log(`
Capacitor Commands Helper
-------------------------
Usage: node capacitor-commands.js [command]

Available commands:
  init          - Initialize Capacitor project
  add-android   - Add Android platform
  sync          - Sync web code to native platforms
  open-android  - Open Android Studio
  build-android - Build the project for Android
  run-android   - Run on Android device/emulator

Example:
  node capacitor-commands.js build-android
  `);
}
