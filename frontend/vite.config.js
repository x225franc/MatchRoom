import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    },
    // Ignorer les erreurs d'assets manquants
    assetsInlineLimit: 0,
    // Désactiver la vérification stricte des assets
    emptyOutDir: true
  },
  define: {
    'window.config.FRONTEND_URL': JSON.stringify(process.env.FRONTEND_URL || 'https://matchrooms.vercel.app'),

    'window.config.BACKEND_URL': JSON.stringify(process.env.BACKEND_URL || 'http://localhost:3000'),
  }
})
