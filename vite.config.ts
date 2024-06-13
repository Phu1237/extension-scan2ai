import { fileURLToPath, URL } from 'node:url'
// const path = require('path')

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [
      vue(),
      VueDevTools(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    build: {
      watch: mode === 'development' ? {} : false,
      rollupOptions: {
        input: {
          ui: fileURLToPath(new URL('./ui.html', import.meta.url)),
          content: fileURLToPath(new URL('./src/core/content.js', import.meta.url)),
          background: fileURLToPath(new URL('./src/core/background.js', import.meta.url))
        },
        output: {
          entryFileNames: '[name].js',
        },
      },
    },
  }
})
