/**
 * Vue-specific Vite configuration.
 * @module vueConfig
 * @description Vue-specific Vite configuration.
 * @author Mineo
 * @example
 * ```ts
 * import { vueConfig } from '@mineo/vite-config/vue';
 * ```
 * @see {@link https://mineo.banmao.cc}
 */
import type { UserConfig } from 'vite'
import vue from "@vitejs/plugin-vue";
import vueJSX from "@vitejs/plugin-vue-jsx";
import AutoImport from 'unplugin-auto-import/vite'
import tailwindcss from '@tailwindcss/vite';

export const vueConfig: UserConfig = {
  plugins: [vue(), vueJSX(), AutoImport({
    imports: ['vue', 'vue-router', 'vue-i18n', {
        '@vueuse/core': [
            'useDebounceFn',
            'useThrottleFn',
        ],
        'axios': [
            ['default', 'axios']
        ]
    }],
    dts: true,
  }), tailwindcss()],
};
