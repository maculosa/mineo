import type { ViteEnv } from "../types";
import { createHtmlPlugin } from 'vite-plugin-html'

export default (viteEnv: ViteEnv) => {
    return createHtmlPlugin({
        minify: true,
        inject: {
            data: {
                title: viteEnv.VITE_TITLE
            }
        }
    })
}
