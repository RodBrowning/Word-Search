import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      includeAssets: ['logo.svg', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Caça-Palavras',
        short_name: 'Caça-palavras',
        description: 'Jogo caça-palavras online',
        theme_color: '#ff8c1a',
        icons: [
          {
            src: 'android/android-launchericon-96-96.png',
            sizes: '96x96',
          },
          {
            src: 'android/android-launchericon-72-72.png',
            sizes: '72x72',
          },
          {
            src: 'android/android-launchericon-48-48.png',
            sizes: '48x48',
          },
          {
            src: 'ios/16.png',
            sizes: '16x16',
          },
          {
            src: 'ios/20.png',
            sizes: '20x20',
          },
          {
            src: 'ios/29.png',
            sizes: '29x29',
          },
          {
            src: 'ios/32.png',
            sizes: '32x32',
          },
          {
            src: 'ios/40.png',
            sizes: '40x40',
          },
          {
            src: 'ios/50.png',
            sizes: '50x50',
          },
        ],
      },
    }),
  ],
  base: '/',
});
