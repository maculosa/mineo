# Number Input 组件开发计划

## 1. 需求分析

在 `/Users/macmini/Workspaces/banmao/mineo/packages/pro-ui/packages/core/number-input` 目录下实现一个数字输入框组件 `ProNumberInput`，功能包括：

- **显示/隐藏控制**：可控制输入框的显示隐藏
- **数字增减**：提供加/减按钮控制数字
- **小数位数**：支持配置小数位数
- **百分比模式**：支持百分比显示（值会除以 100 显示）
- **货币模式**：支持货币符号显示
- **禁用状态**：支持禁用状态

## 2. 技术选型

- **基础组件**：复用 `@mineo/ui` 中的 `Input` 和 `Button` 组件
- **状态管理**：使用 Vue 3 Composition API
- **样式**：使用 Tailwind CSS

## 3. 文件结构

```
/Users/macmini/Workspaces/banmao/mineo/packages/pro-ui/packages/core/number-input/
├── index.ts           # 导出
├── types.ts           # 类型定义
└── number-input.tsx   # 组件实现
```

## 4. 实现步骤

### 4.1 创建 types.ts

定义 `ProNumberInputProps` 接口，包含：

| 属性 | 类型 | 说明 | 默认值 |
|------|------|------|--------|
| `modelValue` | `number` | 绑定值 | `0` |
| `min` | `number` | 最小值 | `undefined` |
| `max` | `number` | 最大值 | `undefined` |
| `step` | `number` | 步进值 | `1` |
| `decimal` | `number` | 小数位数 | `0` |
| `prefix` | `string` | 前缀（如货币符号 ¥） | `''` |
| `suffix` | `string` | 后缀（如百分比 %） | `''` |
| `showControls` | `boolean` | 是否显示增减按钮 | `true` |
| `hideInput` | `boolean` | 是否隐藏输入框 | `false` |
| `disabled` | `boolean` | 是否禁用 | `false` |

### 4.2 创建 number-input.tsx

实现 `ProNumberInput` 组件：

1. **布局结构**：
   - 使用 flex 布局，包含前缀、输入框、增减按钮、后缀
   - 增减按钮使用 `Button` 组件，variant="outline"，size="icon"
   - 输入框使用 `Input` 组件

2. **核心逻辑**：
   - `increment()`: 值增加 step，不超过 max
   - `decrement()`: 值减少 step，不低于 min
   - 输入时进行格式化处理（保留小数位）
   - 百分比模式下：displayValue = modelValue / 100，实际值仍是原值

3. **事件处理**：
   - `onUpdate:modelValue`: 值变化时触发
   - 增减按钮点击事件

### 4.3 创建 index.ts

导出组件和类型：

```typescript
export { ProNumberInput } from './number-input'
export type { ProNumberInputProps } from './types'
```

## 5. 组件使用示例

```tsx
// 基本用法
<ProNumberInput v-model={value} />

// 货币模式
<ProNumberInput v-model={amount} prefix="¥" :decimal={2} />

// 百分比模式
<ProNumberInput v-model={percent} suffix="%" :decimal={2} />

// 隐藏输入框，只显示增减按钮
<ProNumberInput v-model={value} :hideInput={true} />

// 禁用状态
<ProNumberInput v-model={value} :disabled={true} />
```

## 6. 注意事项

- 组件应支持 `v-model` 语法
- 增减按钮在达到 min/max 边界时应禁用
- 输入框应限制只能输入数字
- 小数位数处理要精确，使用 toFixed 进行格式化
