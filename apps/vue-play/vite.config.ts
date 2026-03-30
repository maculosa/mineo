import { defineMineoConfig } from "@mineo/viteconfig";

export default defineMineoConfig({
  platform: 'vue',
  tailwindcss: true,
  icon: true,
  server: {
    host: true,
    port: 5800
  },
})