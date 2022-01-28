import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import mars3dCesium from "./build/cesium-plugin";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    mars3dCesium(),
  ],
});
