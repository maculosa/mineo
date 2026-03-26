// import { defineConfig } from "vite";
import { defineMineoConfig } from "@mineo/viteconfig";
import { vueConfig } from '@mineo/viteconfig/vue';

// https://vite.dev/config/
// export default defineConfig((configEnv) => {
  
//   return {
//     ...vueConfig,
//   }
// })
export default defineMineoConfig({
  vue: true,
  server: {
    host: true,
    port: 5800
  }
})
