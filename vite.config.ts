import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'prompt',
      includeAssets: ['vite.ico', 'icons/180.png', 'icons/192.png', 'icons/512.png'],
      manifest: {
        name: 'Duotify 日語學習 PWA',
        short_name: 'Duotify',
        start_url: '/',
        display: 'standalone',
        background_color: '#f6f0e8',
        theme_color: '#b45a32',
        icons: [
          { src: '/icons/180.png', sizes: '180x180', type: 'image/png' },
          { src: '/icons/192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icons/512.png', sizes: '512x512', type: 'image/png' }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json}']
      }
    })
  ],
  publicDir: '_private/_private_fileAssets/public',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
});
