// import { defineConfig } from "vite";
import { defineMineoConfig } from "@mineo/viteconfig";
// import { vueConfig } from '@mineo/viteconfig/vue';

// https://vite.dev/config/
export default defineMineoConfig({
  platform: 'vue',
  tailwindcss: true,
  icon: true,
  server: {
    host: true,
    port: 5800
  }
})
