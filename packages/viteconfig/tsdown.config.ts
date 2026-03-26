import { defineConfig } from 'tsdown'

export default defineConfig([
  {
    entry: ['./src/*.ts'],
    outDir: './dist',
    dts: {
      tsgo: true,
    },
    format: ['esm'],
    platform: 'node',
  },
])
