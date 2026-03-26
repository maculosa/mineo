import type { ViteEnv } from "../types";
import YAMLPlugin from 'unplugin-yaml/vite'
import TOMLPlugin from 'unplugin-toml/vite'

export default function setupExternalConfigPlugin(viteEnv: ViteEnv) {
    const { VITE_EXTERNAL_CONFIG_FILE } = viteEnv

    const plugins: any[] = []
    switch (VITE_EXTERNAL_CONFIG_FILE) {
        case 'yaml':
            plugins.push(YAMLPlugin())
            break
        case 'toml':
            plugins.push(TOMLPlugin())
            break
        default:
            break
    }

    return plugins
}
