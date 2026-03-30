# ProCard 组件规范

## Why

需要一个适合后台管理系统的卡片组件，基于 `@mineo/ui` 的 Card 进行二次封装，提供统一的状态管理（loading/error/empty）和简化使用方式。

## What Changes

- 新增 `packages/pro-ui/packages/card/` 目录
- 实现 ProCard、ProCardContent、ProCardFooter 三个组件
- 支持 loading、error、empty 三种状态展示
- 支持标题、描述、操作按钮
- 整合 footer 插槽到主组件

## Impact

- Affected specs: 新增 `@mineo/pro-ui` 包的能力
- Affected code:
  - `packages/pro-ui/packages/card/` - 新增组件
  - `packages/pro-ui/index.ts` - 添加导出

## ADDED Requirements

### Requirement: ProCard 主组件

ProCard SHALL provide:
- `title` prop - 卡片标题
- `description` prop - 卡片描述
- `loading` prop - 加载状态，显示旋转图标和"加载中..."
- `error` prop - 错误状态，显示警告图标和错误文本
- `empty` / `emptyText` props - 空状态，显示收件箱图标和提示文本
- `showHeader` prop - 是否显示头部，默认 true
- `slots.extra` - 头部操作按钮插槽
- `slots.footer` - 底部插槽

#### Scenario: 加载状态
- **WHEN** 设置 `loading={true}`
- **THEN** 显示加载动画和"加载中..."文本

#### Scenario: 错误状态
- **WHEN** 设置 `error="错误信息"`
- **THEN** 显示红色警告图标和错误文本

#### Scenario: 空状态
- **WHEN** 设置 `empty={true}`
- **THEN** 显示收件箱图标和 emptyText 文本

### Requirement: ProCardContent 组件

ProCardContent SHALL provide:
- 继承 `@mineo/ui` 的 CardContent 样式
- `class` prop - 自定义样式

### Requirement: ProCardFooter 组件

ProCardFooter SHALL provide:
- 底部布局样式（带上边框）
- `class` prop - 自定义样式

## 使用示例

```tsx
// 基础用法
<ProCard title="卡片标题" description="卡片描述">
  <ProCardContent>内容区域</ProCardContent>
  <ProCardFooter>
    <Button>操作</Button>
  </ProCardFooter>
</ProCard>

// 带操作按钮
<ProCard title="标题" description="描述" v-slot:extra={<Button>操作</Button>}>
  <ProCardContent>内容</ProCardContent>
</ProCard>

// 加载状态
<ProCard title="标题" loading>
  <ProCardContent>内容</ProCardContent>
</ProCard>

// 错误状态
<ProCard title="标题" error="加载失败，请重试">
  <ProCardContent>内容</ProCardContent>
</ProCard>

// 空状态
<ProCard title="标题" empty emptyText="暂无数据">
  <ProCardContent>内容</ProCardContent>
</ProCard>
```