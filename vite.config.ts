import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// Detect if running under Tauri (skips PWA service worker in dev)
const isTauri = !!process.env.TAURI_ENV_PLATFORM

// Base path:
//  - Tauri/desktop and local dev serve from root "/"
//  - GitHub Pages serves from a sub-path, supplied via VITE_BASE
//    (e.g. "/AccountsAndTransactionsView/")
const base = isTauri ? '/' : (process.env.VITE_BASE || '/')

function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        return path.resolve(__dirname, 'src/assets', filename)
      }
    },
  }
}

export default defineConfig({
  // Tauri dev server config
  server: {
    port: 5173,
    strictPort: true,
    host: isTauri ? '127.0.0.1' : true,
  },

  base,

  plugins: [
    figmaAssetResolver(),
    react(),
    tailwindcss(),

    // PWA — only active when not running in Tauri.
    // Manifest paths are RELATIVE (no leading slash) so they resolve
    // correctly against the manifest URL whether served from "/" or a
    // GitHub Pages sub-path.
    !isTauri && VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icons/icon-192.png', 'icons/icon-512.png'],
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        navigateFallback: `${base}index.html`,
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: { cacheName: 'google-fonts', expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 } },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: { cacheName: 'google-fonts-static', expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 365 } },
          },
        ],
      },
      manifest: {
        name: 'Ibra OS',
        short_name: 'Ibra OS',
        description: 'Personal Creative Operating System',
        theme_color: '#0a0a0f',
        background_color: '#0a0a0f',
        display: 'standalone',
        orientation: 'portrait-primary',
        start_url: base,
        scope: base,
        categories: ['productivity', 'design'],
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
        shortcuts: [
          { name: 'Projects', short_name: 'Projects', url: 'projects', description: 'Open Project Brain' },
          { name: 'Opportunities', short_name: 'Opps', url: 'opportunities', description: 'Open Opportunity Tracker' },
          { name: 'Agents', short_name: 'Agents', url: 'agents', description: 'Open Agent Command Centre' },
        ],
      },
    }),
  ].filter(Boolean),

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  assetsInclude: ['**/*.svg', '**/*.csv'],

  build: {
    // Tauri uses a different target on Windows
    target: isTauri ? ['es2021', 'chrome100', 'safari13'] : 'esnext',
    minify: !process.env.TAURI_DEBUG ? 'esbuild' : false,
    sourcemap: !!process.env.TAURI_DEBUG,
  },
})
