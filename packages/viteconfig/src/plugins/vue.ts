import AutoImport from 'unplugin-auto-import/vite'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
// import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import DefineOptions from 'unplugin-vue-define-options/vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { getSrcPath } from '../utils'
import type { ViteEnv } from '../types'
import vue from '@vitejs/plugin-vue'
import vueJSX from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

export function vuePlugin(viteEnv: ViteEnv): any[] {
  const { VITE_ICON_PREFIX, VITE_ICON_LOCAL_PREFIX } = viteEnv

  const srcPath = getSrcPath()
  const localIconPath = `${srcPath}/assets/svg-icon`

  /** 本地svg图标集合名称 */
  const collectionName = VITE_ICON_LOCAL_PREFIX.replace(`${VITE_ICON_PREFIX}-`, '')

  return [
    vue(),
    vueJSX(),
    vueDevTools(),
    DefineOptions(),
    Icons({
      compiler: 'vue3',
      customCollections: {
        [collectionName]: FileSystemIconLoader(localIconPath, svg =>
          svg.replace(/^<svg\s/, '<svg width="1em" height="1em" ')),
      },
      scale: 1,
      defaultClass: 'inline-block',
    }),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        '@vueuse/core',
      ],
      // 调整自动引入的文件位置
      dts: 'types/auto-import.d.ts',
    }),
    Components({
      dts: 'types/components.d.ts',
      types: [{ from: 'vue-router', names: ['RouterLink', 'RouterView'] }],
      resolvers: [
        // NaiveUiResolver(),
        IconsResolver({
          customCollections: [collectionName],
          componentPrefix: VITE_ICON_PREFIX,
        }),
      ],
    }),
    createSvgIconsPlugin({
      iconDirs: [localIconPath],
      symbolId: `${VITE_ICON_LOCAL_PREFIX}-[dir]-[name]`,
      inject: 'body-last',
      customDomId: '__SVG_ICON_LOCAL__',
    }),
  ]
}
