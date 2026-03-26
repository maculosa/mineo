import type { MineoConfig } from "..";
import { vuePlugin } from "./vue";
import { reactPlugin } from './react'
import type { ViteEnv } from "../types";
import setupExternalConfigPlugin from "./yaml";
import setupMock from "./mock";
import tailwindcss from "@tailwindcss/vite";

export function setupVitePlugins(viteEnv: ViteEnv, config: MineoConfig) {
  const plugins: any[] = [
    setupExternalConfigPlugin(viteEnv),
    setupMock(viteEnv),
    config.tailwindcss && tailwindcss() || null
  ]
  switch (config.platform) {
    case 'vue':
      plugins.push(...vuePlugin(viteEnv))
      break
    case 'react':
      plugins.push(...reactPlugin(viteEnv))
      break
    default:
      break
  }
  return plugins
}
