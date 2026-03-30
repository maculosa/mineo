import type { Row } from "@tanstack/vue-table"
import { VNodeChild } from "vue"

export interface DataTableColumn<TData, TValue> {
    /**
     * 列标题
     * @description 列的 title 文本, 可以是字符串或函数, 函数的参数为行数据
     * @default undefined
     */
    title: string | (() => VNodeChild)
    /**
     * 列数据索引
     * @description 列数据的索引, 用于从行数据中获取列数据
     * @default undefined
     */
    dataIndex: keyof TData
    /**
     * 列标题对齐方式
     * @description 列标题的对齐方式, 可选值为 'left', 'center', 'right'
     * @default undefined
     */
    titleAlign?: 'left' | 'center' | 'right'
    /**
     * 列数据对齐方式
     * @description 列数据的对齐方式, 可选值为 'left', 'center', 'right'
     * @default 'left'
     */
    align?: 'left' | 'center' | 'right'
    /**
     * 列标题跨列数
     * @description 列标题跨的列数, 用于合并列
     * @default undefined
     */
    titleColSpan?: number
    /**
     * 列数据跨列数
     * @description 列数据跨的列数, 用于合并列
     * @default undefined
     */
    colSpan?: number
    /**
     * 是否显示省略号
     * @description 是否显示省略号, 超出部分用省略号表示
     * @default false
     */
    ellipsis?: boolean
    /**
     * 是否可复制
     * @description 是否可复制列数据
     * @default undefined
     */
    copyable?: boolean
    /**
     * 是否可调整宽度
     * @description 是否可调整列宽度
     * @default undefined
     */
    resizable?: boolean
    /**
     * 最大宽度
     * @description 列的最大宽度, 单位为像素
     * @default undefined
     */
    maxWidth?: number
    /**
     * 最小宽度
     * @description 列的最小宽度, 单位为像素
     * @default undefined
     */
    minWidth?: number
    /**
     * 列宽度
     * @description 列的宽度, 单位为像素
     * @default undefined
     */
    width?: number
    /**
     * 列标题类名
     * @description 列标题的类名, 用于自定义样式
     * @default undefined
     */
    className?: string
    /**
     * 固定列
     * @description 列是否固定在表格的左侧或右侧
     * @default undefined
     */
    fixed?: 'left' | 'right' | false
    /**
     * 列选项
     * @description 自定义选择项的选项，只对 `type='selection'` 生效
     * @default undefined
     * @param pageData 页数据
     * @param onSelect 选择回调函数
     */
    options?: Array<'all' | 'none' | { label: string, key: string | number, onSelect: (pageData: Row<TData>) => void }>
    /**
     * 自定义渲染函数
     * @param value 列数据
     * @param row 行数据
     * @default undefined
     */
    render?: (value: TValue, row: Row<TData>) => VNodeChild
}

export interface DataTableProps<TData, TValue> {
    columns: DataTableColumn<TData, TValue>[]
    data: TData[]
}

export interface DataTableActionItem {
    label?: string
    key: string | number
    icon?: VNodeChild
    disabled?: boolean
    separator?: boolean
    onClick: (row: Row<TData>) => void
}

