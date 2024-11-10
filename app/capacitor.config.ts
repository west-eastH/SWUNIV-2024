import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.hanbot.box',
  appName: 'hanbotbox',
  webDir: 'dist',
  plugins: {
    CapacitorHttp: {
      enabled: true,
    },
  },
  // server: {
  //   url: 'http://galaxy4276.asuscomm.com:8000/api',
  //   cleartext: true,
  // },
};

export default config;
