import { VNodeChild, Component } from "vue";

export interface DataListPagination {
  /**
   * 当前页码
   * @description 当前页码，从 1 开始
   * @default 1
   */
  current: number;
  /**
   * 每页条数
   * @description 每页显示的条数
   * @default 10
   */
  pageSize: number;
  /**
   * 总条数
   * @description 总条数，用于分页
   * @default 0
   */
  total: number;
}

export interface DataListAction {
  /**
   * 操作项标签
   * @description 操作项的标签，用于显示在操作按钮中
   * @default undefined
   */
  label: string;
  /**
   * 操作项键
   * @description 操作项的键，用于唯一标识操作项
   */
  key: string | number;
  /**
   * 操作项样式
   * @description 操作项的样式，可选值为 'primary', 'secondary', 'tertiary', 'danger'
   * @default undefined
   */
  variant?: string;
  /**
   * 操作项图标
   * @description 操作项的图标，用于显示在操作按钮中
   * @default undefined
   */
  icon?: VNodeChild;
  /**
   * 是否禁用
   * @description 是否禁用操作项，点击后无反应
   * @default undefined
   */
  disabled?: boolean;
  /**
   * 是否分隔符
   * @description 是否分隔符，用于在操作项中添加分隔线
   * @default undefined
   */
  separator?: boolean;
  /**
   * 点击回调函数
   * @param item 点击操作项时触发的回调函数，参数为当前列表项数据
   * @default undefined
   */
  onClick?: (item: any) => void;
}

export interface DataListFilter {
  /**
   * 过滤字段
   * @description 要过滤的字段名
   */
  field: string;
  /**
   * 过滤值
   * @description 过滤的值
   */
  value: any;
  /**
   * 过滤操作符
   * @description 过滤的操作符，如 'eq', 'contains', 'gt', 'lt' 等
   * @default 'contains'
   */
  operator?: string;
}

export interface DataListSort {
  /**
   * 排序字段
   * @description 要排序的字段名
   */
  field: string;
  /**
   * 排序方向
   * @description 排序的方向，'asc' 或 'desc'
   * @default 'asc'
   */
  direction: 'asc' | 'desc';
}

export interface DataListSchema {
  /**
   * 字段名
   * @description 列表项的字段名
   */
  field: string;
  /**
   * 标签
   * @description 字段的显示标签
   */
  label: string;
  /**
   * 类型
   * @description 字段的类型，如 'text', 'number', 'date', 'boolean', 'select' 等
   * @default 'text'
   */
  type?: string;
  /**
   * 格式化函数
   * @description 用于格式化字段值的函数
   * @param value 字段值
   * @param item 列表项数据
   * @returns 格式化后的值
   */
  format?: (value: any, item: any) => VNodeChild;
  /**
   * 是否可编辑
   * @description 字段是否可编辑
   * @default false
   */
  editable?: boolean;
  /**
   * 编辑组件
   * @description 用于编辑字段的组件
   */
  editComponent?: Component;
  /**
   * 编辑配置
   * @description 编辑组件的配置
   */
  editConfig?: any;
  /**
   * 验证规则
   * @description 编辑时的验证规则
   */
  rules?: any[];
}

export interface DataListProps<T = any> {
  /**
   * 数据列表
   * @description 列表数据
   * @default []
   */
  data: T[];
  /**
   * 分页配置
   * @description 分页配置，包含当前页码、每页条数、总条数
   * @default { current: 1, pageSize: 10, total: 0 }
   */
  pagination?: DataListPagination;
  /**
   * 是否启用分页
   * @description 是否启用分页功能
   * @default true
   */
  paginationEnabled?: boolean;
  /**
   * 异步数据获取函数
   * @description 用于异步获取数据的函数
   * @param params 参数，包含分页、过滤、排序信息
   * @returns 包含数据和总条数的对象
   */
  fetchData?: (params: {
    page: number;
    pageSize: number;
    filters: DataListFilter[];
    sort: DataListSort | null;
  }) => Promise<{ data: T[]; total: number }>;
  /**
   * 是否加载中
   * @description 表格是否处于加载状态
   * @default false
   */
  loading?: boolean;
  /**
   * 错误信息
   * @description 表格加载错误时的错误信息
   * @default undefined
   */
  error?: string;
  /**
   * 重试回调
   * @description 表格加载错误时的重试按钮回调
   * @default undefined
   */
  onRetry?: () => void;
  /**
   * 操作项
   * @description 列表项的操作按钮
   * @default []
   */
  actions?: DataListAction[];
  /**
   * 批量操作项
   * @description 批量操作按钮
   * @default []
   */
  batchActions?: DataListAction[];
  /**
   * 是否启用批量操作
   * @description 是否启用批量操作功能
   * @default false
   */
  batchActionsEnabled?: boolean;
  /**
   * 已选择的项
   * @description 当前已选择的列表项
   * @default []
   */
  selectedItems?: T[];
  /**
   * 选择项变化回调
   * @description 选择项变化时的回调函数
   * @param items 已选择的项
   */
  onSelectChange?: (items: T[]) => void;
  /**
   * 过滤条件
   * @description 过滤条件
   * @default []
   */
  filters?: DataListFilter[];
  /**
   * 过滤条件变化回调
   * @description 过滤条件变化时的回调函数
   * @param filters 过滤条件
   */
  onFilterChange?: (filters: DataListFilter[]) => void;
  /**
   * 排序条件
   * @description 排序条件
   * @default null
   */
  sort?: DataListSort | null;
  /**
   * 排序条件变化回调
   * @description 排序条件变化时的回调函数
   * @param sort 排序条件
   */
  onSortChange?: (sort: DataListSort | null) => void;
  /**
   * Schema 配置
   * @description 用于配置列表项的显示和编辑
   * @default []
   */
  schema?: DataListSchema[];
  /**
   * 自定义列表项渲染
   * @description 自定义列表项的渲染函数
   * @param item 列表项数据
   * @param index 列表项索引
   * @returns 渲染的 VNode
   */
  itemRenderer?: (item: T, index: number) => VNodeChild;
  /**
   * 自定义空状态
   * @description 自定义空状态的渲染函数
   * @returns 渲染的 VNode
   */
  emptyRenderer?: () => VNodeChild;
  /**
   * 自定义加载状态
   * @description 自定义加载状态的渲染函数
   * @returns 渲染的 VNode
   */
  loadingRenderer?: () => VNodeChild;
  /**
   * 自定义错误状态
   * @description 自定义错误状态的渲染函数
   * @returns 渲染的 VNode
   */
  errorRenderer?: () => VNodeChild;
  /**
   * 网格列数
   * @description 网格布局的列数
   * @default 1
   */
  gridColumns?: number;
  /**
   * 网格间隙
   * @description 网格布局的间隙，单位为像素
   * @default 16
   */
  gridGap?: number;
  /**
   * 列表项类名
   * @description 列表项的 CSS 类名
   * @default undefined
   */
  itemClass?: string;
  /**
   * 容器类名
   * @description 容器的 CSS 类名
   * @default undefined
   */
  containerClass?: string;
}

export interface DataListEmits {
  /**
   * 页码变化事件
   * @param page 新的页码
   */
  'update:page': [page: number];
  /**
   * 每页条数变化事件
   * @param pageSize 新的每页条数
   */
  'update:pageSize': [pageSize: number];
  /**
   * 选择项变化事件
   * @param items 已选择的项
   */
  'select-change': [items: any[]];
  /**
   * 过滤条件变化事件
   * @param filters 过滤条件
   */
  'filter-change': [filters: DataListFilter[]];
  /**
   * 排序条件变化事件
   * @param sort 排序条件
   */
  'sort-change': [sort: DataListSort | null];
  /**
   * 数据项编辑事件
   * @param item 编辑后的数据项
   * @param field 编辑的字段
   * @param value 新的值
   */
  'item-edit': [item: any, field: string, value: any];
}
