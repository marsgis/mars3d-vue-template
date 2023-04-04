import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { vitePluginMars3d } from "vite-plugin-mars3d"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vitePluginMars3d(),
  ],
});
