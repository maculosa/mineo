import AutoImport from 'unplugin-auto-import/vite';
import { getSrcPath } from '../utils'
import type { ViteEnv } from '../types'
import react from '@vitejs/plugin-react'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import Icons from 'unplugin-icons/vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

export function reactPlugin(viteEnv: ViteEnv): any[] {
    const { VITE_ICON_PREFIX, VITE_ICON_LOCAL_PREFIX } = viteEnv

    const srcPath = getSrcPath()
    const localIconPath = `${srcPath}/assets/svg-icon`

    /** 本地svg图标集合名称 */
    const collectionName = VITE_ICON_LOCAL_PREFIX.replace(`${VITE_ICON_PREFIX}-`, '')

    return [
        react(),
        Icons({
            compiler: 'jsx',
            jsx: 'react',
            customCollections: {
                [collectionName]: FileSystemIconLoader(localIconPath, svg =>
                    svg.replace(/^<svg\s/, '<svg width="1em" height="1em" ')),
                },
            scale: 1,
            defaultClass: 'inline-block',
        }),
        AutoImport({
            imports: [
                'react',
                'react-dom',
            ],
            // 调整自动引入的文件位置
            dts: 'types/auto-import.d.ts',
        }),
        createSvgIconsPlugin({
            iconDirs: [localIconPath],
            symbolId: `${VITE_ICON_LOCAL_PREFIX}-[dir]-[name]`,
            inject: 'body-last',
            customDomId: '__SVG_ICON_LOCAL__'
        }),
    ]
}