import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  server:{
    port:3000,
    proxy:{
      '/api1':{
        target: "https://openapi.api.govee.com/router/api/v1/device/control",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api1/, ''),
      }
    }

  },
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
