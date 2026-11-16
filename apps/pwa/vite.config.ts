import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  // Port dédié à Hopla : il doit correspondre à l'URL de redirection configurée dans Supabase Auth.
  server: { port: 5180, strictPort: true },
  preview: { port: 5181, strictPort: true },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icone.svg', 'apple-touch-icon.png'],
      manifest: {
        name: 'Hopla',
        short_name: 'Hopla',
        description: 'Réviser du CP à la 3e, avec Octave.',
        lang: 'fr',
        theme_color: '#4B3FD1',
        background_color: '#F4F5FA',
        display: 'standalone',
        orientation: 'any',
        start_url: '/',
        icons: [
          { src: 'icone-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icone-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icone-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        // Les packs de contenu restent disponibles hors connexion.
        globPatterns: ['**/*.{js,css,html,svg,png,woff2}'],
        // Lecture de texte des photos de leçon : chargée à la première photo, puis gardée pour le hors connexion.
        globIgnores: ['ocr/**'],
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.pathname.startsWith('/ocr/'),
            handler: 'CacheFirst',
            options: { cacheName: 'hopla-ocr', expiration: { maxEntries: 10 } },
          },
          {
            urlPattern: ({ url }) => url.pathname.startsWith('/packs/'),
            handler: 'StaleWhileRevalidate',
            options: { cacheName: 'hopla-packs' },
          },
          {
            urlPattern: ({ url }) => /fonts\.(googleapis|gstatic)\.com$/.test(url.hostname),
            handler: 'CacheFirst',
            options: { cacheName: 'hopla-polices', expiration: { maxEntries: 20, maxAgeSeconds: 31536000 } },
          },
        ],
      },
    }),
  ],
});
