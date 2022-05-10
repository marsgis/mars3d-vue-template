import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import mars3dCesium from "vite-plugin-mars3d"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    mars3dCesium(),
  ],
});
