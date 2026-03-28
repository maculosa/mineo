// import { defineConfig } from "vite";
import { defineMineoConfig } from "@mineo/viteconfig";

// https://vite.dev/config/
export default defineMineoConfig({
  platform: 'vue',
  tailwindcss: true,
  icon: true,
  server: {
    host: true,
    port: 5800
  },
})
