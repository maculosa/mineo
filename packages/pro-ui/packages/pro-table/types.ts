import { PropType } from "vue"

/**
 * 表格密度
 * @description 表格的密度, 可选值为 'medium', 'compact', 'loose'
 * @default 'medium'
 */
export type TableDensity = 'medium' | 'compact' | 'loose'

export const proTableProps = {
    /**
     * 表格密度
     * @description 表格的密度, 可选值为 'medium', 'compact', 'loose'
     * @default 'medium'
     */
    density: {
        type: String as PropType<TableDensity>,
        default: 'medium'
    },
    

}

export type ProTableProps = typeof proTableProps
