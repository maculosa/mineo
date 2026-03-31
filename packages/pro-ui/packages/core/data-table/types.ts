import type { Row } from "@tanstack/vue-table"
import { VNodeChild } from "vue"

export interface DataTableColumn<TData = any, TValue = any> {
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
     * 是否为金额列
     * @description 是否为金额列, 金额列会自动格式化为金额格式, 例如 1234.56 -> 1,234.56
     * @default undefined
     */
    currency?: {
        /**
         * 货币符号
         * @description 货币符号, 例如 '$', '¥'
         * @default '$'
         */
        symbol?: string
        /**
         * 货币小数位数
         * @description 货币小数位数, 例如 2
         * @default 2
         */
        decimal?: number
        /**
         * 货币千分位分隔符
         * @description 货币千分位分隔符, 例如 ','
         * @default ','
         */
        thousand?: string
    } | true,
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
    pagination?: DataTablePagination
}

/**
 * 表格操作项
 * @description 表格操作项的属性, 包含标签、键、图标、是否禁用、是否分隔符、点击回调函数
 */
export interface DataTableActionItem<TData> {
    /**
     * 操作项标签
     * @description 操作项的标签, 用于显示在操作项中
     * @default undefined
     */
    label?: string
    /**
     * 操作项键
     * @description 操作项的键, 用于唯一标识操作项
     */
    key: string | number
    /**
     * 操作项图标
     * @description 操作项的图标, 用于显示操作项中
     * @default undefined
     */
    icon?: VNodeChild
    /**
     * 是否禁用
     * @description 是否禁用操作项, 点击后无反应
     * @default undefined
     */
    disabled?: boolean
    /**
     * 是否分隔符
     * @description 是否分隔符, 用于在操作项中添加分隔线
     * @default undefined
     */
    separator?: boolean
    /**
     * 点击回调函数
     * @param row 点击操作项时触发的回调函数, 参数为当前行数据
     * @default undefined
     */
    onClick: (row: Row<TData>) => void
}

export interface DataTablePagination {
    /**
     * 当前页码
     * @description 当前页码, 从 1 开始
     * @default 1
     */
    current: number
    /**
     * 每页条数
     * @description 每页显示的条数
     * @default 10
     */
    pageSize: number
    /**
     * 总条数
     * @description 总条数, 用于分页
     * @default 0
     */
    total: number
}