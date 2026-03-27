import { defineConfig } from 'tsdown';
import Vue from 'unplugin-vue/rolldown'

export default defineConfig({
    entry: [
        'src/index.ts'
    ],
    format: ['esm', 'cjs'],
    dts: {
        vue: true
    },
    clean: true,
    sourcemap: true,
    deps: {
        neverBundle: ['vue']
    },
    platform: 'neutral',
    plugins: [
        Vue({ isProduction: true })
    ]
})
