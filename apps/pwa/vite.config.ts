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
      // Une nouvelle version attend le clic de l'utilisateur (composant MiseAJour) : pas de rechargement en plein exercice.
      registerType: 'prompt',
      includeAssets: ['icone.svg', 'apple-touch-icon.png'],
      manifest: {
        name: 'Hopla.',
        short_name: 'Hopla.',
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
          { src: 'icone-masquable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        // Les packs de contenu restent disponibles hors connexion.
        globPatterns: ['**/*.{js,css,html,svg,png,woff2}'],
        // Lecture de texte des photos de leçon et images des questions : chargées à la demande, puis gardées
        // pour le hors connexion, pas téléchargées à l'installation.
        globIgnores: ['ocr/**', 'images/**'],
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.pathname.startsWith('/ocr/'),
            handler: 'CacheFirst',
            options: { cacheName: 'hopla-ocr', expiration: { maxEntries: 10 } },
          },
          {
            // Images des questions : gardées sur l'appareil une fois vues, pour le hors connexion.
            urlPattern: ({ url }) => url.pathname.startsWith('/images/'),
            handler: 'CacheFirst',
            options: { cacheName: 'hopla-images', expiration: { maxEntries: 800, maxAgeSeconds: 31536000 } },
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
