
const fs = require('fs');
const packageJson = require('./package.json');

// Add Capacitor scripts
packageJson.scripts = {
  ...packageJson.scripts,
  "cap:init": "npx cap init fila-zero-facil app.lovable.57fdfdaeaba644bfa52cb0d8b459a277 --web-dir dist",
  "cap:add:android": "npx cap add android",
  "cap:sync": "npx cap sync",
  "cap:open:android": "npx cap open android",
  "cap:build:android": "node capacitor-build.js",
  "cap:run:android": "npx cap run android"
};

fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 2));
console.log('package.json updated successfully');
