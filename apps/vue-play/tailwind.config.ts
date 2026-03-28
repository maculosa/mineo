import type { Config } from "tailwindcss";

export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,ts,tsx}",

    // 👇 扫描 workspace
    "../../packages/**/*.{vue,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;
