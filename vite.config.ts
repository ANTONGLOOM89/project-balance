import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'url'

export default defineConfig({
    optimizeDeps: {
      include: ['vue', 'vue-router']
    },
    build: {
      rollupOptions: {
        input: 'src/main.js'
      }
    },
    plugins: [vue()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
)
