import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'node:path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      'vue-i18n': 'vue-i18n/dist/vue-i18n.mjs',
    },
  },
  server: {
    proxy: {
      '/api': 'http://127.0.0.1:3000',
    },
  },
})
