/// <reference types="vitest/config" />
import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

function gscMeta(gsc: string): Plugin {
  return { name: 'gsc-meta', transformIndexHtml: (html) =>
    gsc ? html.replace('%VITE_GSC%', gsc) : html.replace(/\s*<meta name="google-site-verification"[^>]*>/, '') };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [
      react(), tailwindcss(), gscMeta(env.VITE_GSC ?? ''),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.svg', 'robots.txt', 'sitemap.xml'],
        workbox: { globPatterns: ['**/*.{js,css,html,svg,png,webp,woff2}'], maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, navigateFallbackDenylist: [/^\/sitemap\.xml$/, /^\/robots\.txt$/] },
        manifest: {
          name: 'Siap Kelas 3', short_name: 'Siap Kelas 3', lang: 'id', start_url: '/', display: 'standalone',
          background_color: '#FFFBF5', theme_color: '#FF7A1A',
          icons: [
            { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
            { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
            { src: 'maskable-icon-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
          ],
        },
      }),
    ],
    test: { environment: 'jsdom', include: ['tests/unit/**/*.test.ts?(x)', 'tests/content/**/*.test.ts'], setupFiles: ['tests/setup.ts'] },
  };
});
