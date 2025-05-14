
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.57fdfdaeaba644bfa52cb0d8b459a277',
  appName: 'fila-zero-facil',
  webDir: 'dist',
  server: {
    url: 'https://57fdfdae-aba6-44bf-a52c-b0d8b459a277.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#33C3F0",
      showSpinner: true,
      spinnerColor: "#FFFFFF"
    }
  }
};

export default config;
