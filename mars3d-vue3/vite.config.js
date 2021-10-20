import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ViteComponents from 'unplugin-vue-components/vite'
import WindiCSS from 'vite-plugin-windicss'
import mars3dCesium from 'vite-plugin-mars3d'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '/src'),
    },
  },
  build: {
    minify: true,
  },
  plugins: [vue(), ViteComponents(), WindiCSS(), mars3dCesium()],
  server: {
    host: '0.0.0.0',
  },
})
