# Mineo v1 研发计划

## 一、体系设计

### 1.1 设计目标

**核心能力**：
- [ ] 开箱即用（零配置 CRUD）
- [ ] 强类型（TS 全覆盖）
- [ ] 数据驱动（schema-first）
- [ ] 可扩展（插件化）
- [ ] 可主题（Design Token + CSS Vars）
- [ ] 可动画（Motion System）
- [ ] 可国际化（i18n）

### 1.2 模块拆分

```bash
packages/
├── core/                 # 核心 hooks + utils
├── theme/                # 主题系统（tokens + css vars）
├── motion/               # 动画系统
├── components/
│   ├── pro-table/
│   ├── pro-form/
│   ├── pro-list/
│   ├── pro-description/
│   ├── pro-tabs/
│   ├── pro-filter/
│   ├── pro-layout/
│   ├── pro-login/
│   └── pro-text/
├── presets/              # 默认配置（CRUD模板）
└── playground/           # 示例项目
```


## 二、核心设计

### 2.1 Column Schema

```ts
export interface ProColumn<T = any> {
  type?: 'selection' | 'index' | 'expand'
  
  title?: string
  key?: keyof T
  
  width?: number
  align?: 'left' | 'center' | 'right'
  fixed?: boolean | 'left' | 'right'
  
  // 功能
  sortable?: boolean
  filterable?: boolean
  searchable?: boolean
  
  // UI
  copyable?: boolean
  ellipsis?: boolean
  tooltip?: boolean
  
  // 权限
  hideInTable?: boolean
  hideInSearch?: boolean
  
  // 渲染
  render?: (row: T, index: number) => VNode
  renderFormItem?: () => VNode
  
  // 扩展能力（关键）
  valueType?:
    | 'text'
    | 'select'
    | 'date'
    | 'money'
    | 'tag'
    | 'progress'
    | 'avatar'
  
  valueEnum?: Record<string, { text: string, color?: string }>
}
```

## 三、核心组件设计

### 3.1 ProTable

```ts
export interface ProTableProps<T = any> {
  title?: string | () => VNode
  columns: ProColumn<T>[]
  
  // 数据
  request?: (params: any) => Promise<{
    data: T[]
    total: number
  }>
  
  dataSource?: T[]
  
  rowKey?: string
  
  // 分页
  pagination?: {
    pageSize?: number
    current?: number
  }
  
  // 查询
  search?: boolean | ProSearchConfig
  
  // 工具栏
  toolbar?: {
    title?: string
    actions?: VNode[]
  }
  
  // 选择
  rowSelection?: {
    type?: 'checkbox' | 'radio'
    onChange?: (rows: T[]) => void
  }
  
  // 排序过滤
  onChange?: (params) => void
  
  // UI
  bordered?: boolean
  size?: 'small' | 'middle' | 'large'
  expandRender?: (row) => VNode
  
  // 高级
  virtual?: boolean
  draggable?: boolean
  
}
```

### 3.2 ProForm

```ts
export interface ProFormProps {
  schema: ProFormItem[]
  
  initialValue?: Record<string, any>
  
  onSubmit?: (values) => Promise<void>
  
  layout?: 'horizontal' | 'vertical' | 'inline'
  
  grid?: boolean
  
  submitter?: {
    reset?: boolean
    submitText?: string
  }
}
```

### 3.3 ProLayout

```ts
export interface ProLayoutProps {
  title?: string
  
  logo?: string
  
  menu?: MenuItem[]
  
  collapsed?: boolean
  
  theme?: 'light' | 'dark'
  
  layout?: 'side' | 'top' | 'mix'
  
  // 动画
  motion?: boolean
  
  // 权限
  access?: (route) => boolean
}
```

### 3.4 ProLogin

```ts
export interface ProLoginProps {
  onSubmit: (data) => Promise<void>
  
  logo?: string
  title?: string
  
  background?: string
  
  providers?: ('wechat' | 'alipay' | 'union')
}
```

## 四、核心技术选型

| 能力 | 技术 |
| :--: | :--:|
| 表格 | `@tanstack/vue-table` |
| 数据 | `@tanstack/vue-query` |
| UI | `shadcn-vue` |
| Animation | `motion-v/vueuse/motion`|
| 状态 | `pinia` |
| 表单 | `vee-validate + zod` |
| 样式 | `tailwindcss v4` |
| 主题 | `CSS Variables` |

## 五、主题系统设计

```ts
export const theme = {
  colorPrimary: '#3b82f6',
  borderRadius: '8px',
  fontSize: '16px'
}
```

自动生成：

```css
:root {
  --mineo-primary: #3b82f6;
  --mineo-radius: 8px;
}
```

## 六、动画系统

建议封装：

```ts
useMotion({
  type: 'fade-slide',
  duration: 0.3
})
```

内置：
- fade
- slide
- scale
- list-stager（列表动画）


## 最后

1. Schema 驱动 CRUD
2. 插件系统
3. 可视化配置
4. CLI（create-pro-app）
