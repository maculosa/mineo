import type { Component, HTMLAttributes, VNodeChild } from "vue"

export type ActionItem = {
    /** 操作项 */
    label: string
    /** 操作 key */
    key: string
    /** 操作类型，传统 UI 框架 */
    type?: string
    /** class 类名 */
    className?: string | HTMLAttributes['class']
    /** 操作项图标 */
    icon?: string | Component | VNodeChild
    /** style 样式 */
    style?: Record<string, string> | HTMLAttributes['style']
}

export type ActionConfig = {
    /** 操作项 */
    items: ActionItem[],
    /** UI 类型 */
    ui: 'naive-ui' | 'shadcn-vue'
}

export const defineConfig = (option: ActionConfig) => {

}