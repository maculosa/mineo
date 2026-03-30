# Card 组件设计计划

## 1. 需求分析

基于 `@mineo/ui` 的 Card 组件，使用 Vue TSX 二次封装一个适合后台管理系统的 ProCard 组件。

## 2. 现有 @mineo/ui Card 组件

```
Card.vue         - 容器
CardHeader.vue   - 头部
CardTitle.vue    - 标题
CardDescription.vue - 描述
CardContent.vue  - 内容
CardFooter.vue   - 底部
CardAction.vue   - 操作按钮
```

## 3. ProCard 设计

### 3.1 目录结构
```
packages/pro-ui/packages/card/
├── index.ts
├── ProCard.tsx          # 主组件（容器）
├── ProCardHeader.tsx    # 头部（整合 Title、Description、Action）
├── ProCardContent.tsx    # 内容区
├── ProCardFooter.tsx    # 底部
├── types.ts             # 类型定义
└── styles.ts            # 样式工具函数
```

### 3.2 类型定义 (types.ts)
```typescript
export interface ProCardProps {
  title?: string
  description?: string
  loading?: boolean
  error?: string
  empty?: boolean
  emptyText?: string
  showHeader?: boolean
  showFooter?: boolean
  class?: string
}

export interface ProCardHeaderProps {
  title?: string
  description?: string
  extra?: any
  class?: string
}
```

### 3.3 组件设计

**ProCard.tsx**
- Props: title, description, loading, error, empty, emptyText, showHeader, showFooter
- 使用 Card, CardContent 组件
- 处理 loading/error/empty 状态显示

**ProCardHeader.tsx**
- Props: title, description, extra
- 使用 CardHeader, CardTitle, CardDescription, CardAction 组件
- 整合头部布局

**ProCardContent.tsx**
- 继承 CardContent
- Props: class

**ProCardFooter.tsx**
- 继承 CardFooter
- Props: class

### 3.4 状态处理

| 状态 | 显示内容 |
|------|---------|
| loading | 加载动画 + "加载中..." |
| error | 错误图标 + error 文本 |
| empty | 空状态图标 + emptyText |
| 正常 | slot 内容 |

## 4. 实现步骤

1. 创建 `types.ts` - 定义类型
2. 创建 `styles.ts` - 样式工具
3. 创建 `ProCard.tsx` - 主组件
4. 创建 `ProCardHeader.tsx` - 头部组件
5. 创建 `ProCardContent.tsx` - 内容组件
6. 创建 `ProCardFooter.tsx` - 底部组件
7. 创建 `index.ts` - 导出
8. 更新 `packages/pro-ui/index.ts` 添加导出

## 5. 使用示例

```tsx
// 基础用法
<ProCard title="卡片标题" description="卡片描述">
  内容区域
  <template #footer>
    底部区域
  </template>
</ProCard>

// 带操作按钮
<ProCard title="标题" description="描述" extra={<Button>操作</Button>}>
  内容
</ProCard>

// 加载状态
<ProCard title="标题" loading>

</ProCard>

// 错误状态
<ProCard title="标题" error="加载失败，请重试">
  内容
</ProCard>

// 空状态
<ProCard title="标题" empty emptyText="暂无数据">
  内容
</ProCard>
```