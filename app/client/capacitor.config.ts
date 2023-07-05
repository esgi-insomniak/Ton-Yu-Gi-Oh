import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'yugioh.insomniak.esgi',
  appName: 'Yugioh Insomniak',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
