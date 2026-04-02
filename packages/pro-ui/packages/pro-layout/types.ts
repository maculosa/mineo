import type { PropType } from "vue"
import type { SidebarProps } from "@mineo/ui"

export interface SidebarMenuItem {
    title: string
    url: string
    icon?: any
    isActive: boolean
    children?: SidebarMenuItem[]
    [key: string]: any
}

export interface AppSidebarProps extends SidebarProps {
    menus: SidebarMenuItem[]
}

export const appSidebarProps = {
    menus: {
        type: Array as PropType<SidebarMenuItem[]>,
        default: () => [],
    },
    variant: {
        type: String as PropType<AppSidebarProps['variant']>,
        default: 'inset',
    },
    side: {
        type: String as PropType<AppSidebarProps['side']>,
        default: 'left',
    },
    collapsible: {
        type: String as PropType<AppSidebarProps['collapsible']>,
        default: 'offcanvas',
    },
    class: {
        type: String as PropType<AppSidebarProps['class']>,
        default: '',
    },
}

export const defaultLayoutProps = {
    ...appSidebarProps,
}