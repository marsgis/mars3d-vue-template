import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'
import mars3dCesium from 'vite-plugin-mars3d'

export default defineConfig({
  plugins: [
    vue(),
    eslintPlugin({
      cache: false
    }),
    mars3dCesium()
  ],
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src'),
      '@comp': path.join(__dirname, 'src/components'),
      '@comb': path.join(__dirname, 'src/composables')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/styles/variables.scss";'
      }
    }
  }
})
