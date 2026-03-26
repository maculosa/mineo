import { mockDevServerPlugin } from 'vite-plugin-mock-dev-server'
import type { ViteEnv } from '../types.d'

export default function setupMock(viteEnv: ViteEnv) {
    const enable = viteEnv.VITE_ENABLE_MOCK === 'true'
    if (!enable) {
        return null
    }
    return mockDevServerPlugin()
}