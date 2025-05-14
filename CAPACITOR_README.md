
# Capacitor Setup for Fila Zero Fácil

This file provides instructions for setting up and using Capacitor to build a mobile app from this web application.

## Requirements

- Node.js and npm installed
- Android Studio (for Android builds)
- Xcode (for iOS builds, Mac only)

## Available Commands

Instead of using npm scripts, use the following Node.js commands:

```bash
# Initialize Capacitor (first time setup)
node capacitor-commands.js init

# Add Android platform
node capacitor-commands.js add-android

# Sync web code to native platforms (run after any web code changes)
node capacitor-commands.js sync

# Open Android Studio
node capacitor-commands.js open-android

# Build for Android (combines building web app and syncing)
node capacitor-commands.js build-android

# Run on Android device/emulator
node capacitor-commands.js run-android
```

## Getting Started

1. Clone this repository
2. Run `npm install`
3. Run `node capacitor-commands.js build-android` to build the app
4. Run `node capacitor-commands.js open-android` to open in Android Studio
5. In Android Studio, build and run on your device or emulator

## Notes

- Make sure you have Android Studio properly configured with SDK tools
- For physical devices, enable Developer Options and USB Debugging
- The app can be run directly with `node capacitor-commands.js run-android` if you have devices/emulators set up
