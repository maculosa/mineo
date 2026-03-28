import { defineConfig, loadEnv, type UserConfig } from 'vite';
import { fileURLToPath } from 'node:url';
import { setupVitePlugins } from './plugins';
import type { ViteEnv } from './types';

export interface MineoConfig extends UserConfig {
  platform?: 'vue' | 'react'
  tailwindcss?: boolean
  icon?: boolean
  alias?: Record<string, string>
}

export const defineMineoConfig = (mineoConfig: MineoConfig) => {
  const { platform, tailwindcss, icon, alias } = mineoConfig

  return defineConfig((configEnv) => {
    const viteEnv = loadEnv(configEnv.mode, process.cwd()) as unknown as ViteEnv

    return {
      resolve: {
        alias: {
          '@/': fileURLToPath(new URL('./src', import.meta.url)),
          ...alias
        }
      },
      plugins: setupVitePlugins(viteEnv, { platform, tailwindcss, icon: icon || false }),
      ...mineoConfig,
    }
  })
}