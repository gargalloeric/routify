/// <reference types="vitest" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      // with options if you need to use change origin
      '/electricityProxy': {
        target: 'https://api.preciodelaluz.org',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/electricityProxy/, '')
      },
    },
  },
  test: {
    env: {
      VITE_ELECTICITY_URL: 'https://api.preciodelaluz.org',
    },
  },
})
