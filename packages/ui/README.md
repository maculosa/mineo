# @mineo/ui

基于 [shadcn-vue](https://shadcn-vue.com/) + [Tailwind CSS v4](https://tailwindcss.com/) 的组件库。

## 组件列表

| 组件 | 说明 |
|------|------|
| alert | 警告提示 |
| alert-dialog | 警告对话框 |
| aspect-ratio | 宽高比 |
| avatar | 头像 |
| badge | 徽章 |
| breadcrumb | 面包屑 |
| button | 按钮 |
| button-group | 按钮组 |
| calendar | 日历 |
| card | 卡片 |
| carousel | 轮播 |
| chart | 图表容器 |
| checkbox | 多选框 |
| collapsible | 可折叠 |
| combobox | 组合框 |
| command | 命令菜单 |
| context-menu | 右键菜单 |
| dialog | 对话框 |
| drawer | 抽屉 |
| dropdown-menu | 下拉菜单 |
| empty | 空状态 |
| field | 表单字段 |
| form | 表单 |
| hover-card | 悬停卡片 |
| input | 输入框 |
| input-group | 输入框组 |
| input-otp | OTP 输入 |
| item | 列表项 |
| label | 标签 |
| native-select | 原生选择器 |
| pagination | 分页 |
| select | 选择器 |
| separator | 分隔线 |
| textarea | 文本域 |
| tooltip | 工具提示 |
| typography | 排版 |

## 安装

```bash
pnpm add @mineo/ui
```

## 使用

### Button

```vue
<script setup lang="ts">
import { Button, buttonVariants } from '@mineo/ui'
</script>

<template>
  <Button variant="default">Default</Button>
  <Button variant="destructive">Destructive</Button>
  <Button variant="outline">Outline</Button>
  <Button variant="secondary">Secondary</Button>
  <Button variant="ghost">Ghost</Button>
  <Button variant="link">Link</Button>
</template>
```

**Variant**: `default` | `destructive` | `outline` | `secondary` | `ghost` | `link`

**Size**: `default` | `sm` | `lg` | `icon` | `icon-sm` | `icon-lg`

### Card

```vue
<script setup lang="ts">
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, CardAction } from '@mineo/ui'
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Card Title</CardTitle>
      <CardDescription>Card description text.</CardDescription>
      <CardAction>Action</CardAction>
    </CardHeader>
    <CardContent>Content</CardContent>
    <CardFooter>Footer</CardFooter>
  </Card>
</template>
```

### Dialog

```vue
<script setup lang="ts">
import { Button } from '@mineo/ui'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose, DialogTrigger } from '@mineo/ui'
</script>

<template>
  <Dialog>
    <DialogTrigger><Button>Open Dialog</Button></DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Title</DialogTitle>
        <DialogDescription>Description</DialogDescription>
      </DialogHeader>
      <div>Content</div>
      <DialogFooter>
        <DialogClose><Button variant="outline">Cancel</Button></DialogClose>
        <Button>Confirm</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
```

### Item

```vue
<script setup lang="ts">
import { Item, ItemHeader, ItemTitle, ItemDescription, ItemContent, ItemMedia, ItemActions, ItemSeparator, ItemGroup } from '@mineo/ui'
</script>

<template>
  <Item>
    <ItemMedia variant="icon">
      <Avatar />
    </ItemMedia>
    <ItemContent>
      <ItemHeader>
        <ItemTitle>Title</ItemTitle>
        <ItemActions>Actions</ItemActions>
      </ItemHeader>
      <ItemDescription>Description</ItemDescription>
    </ItemContent>
  </Item>
</template>
```

**Item Variants**: `default` | `outline` | `muted`

**Item Sizes**: `default` | `sm`

**ItemMedia Variants**: `default` | `icon` | `image`

### InputGroup

```vue
<script setup lang="ts">
import { InputGroup, InputGroupInput, InputGroupAddon, InputGroupButton } from '@mineo/ui'
import { XIcon, Search } from 'lucide-vue-next'
</script>

<template>
  <InputGroup>
    <InputGroupInput placeholder="Search..." />
    <InputGroupAddon><Search /></InputGroupAddon>
  </InputGroup>

  <InputGroup>
    <InputGroupInput placeholder="Enter value" />
    <InputGroupAddon align="inline-end">
      <InputGroupButton><XIcon /></InputGroupButton>
    </InputGroupAddon>
  </InputGroup>
</template>
```

### Select

```vue
<script setup lang="ts">
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@mineo/ui'
</script>

<template>
  <Select>
    <SelectTrigger>
      <SelectValue placeholder="Select..." />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Group</SelectLabel>
        <SelectItem value="1">Option 1</SelectItem>
        <SelectItem value="2">Option 2</SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>
```

### Form

配合 [vee-validate](https://vee-validate.logaretm.com/) + [zod](https://zod.dev/) 使用：

```vue
<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@mineo/ui'
import { Input } from '@mineo/ui'

const schema = z.object({
  username: z.string().min(2, 'Too short').max(20, 'Too long'),
  email: z.string().email('Invalid email'),
})

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(schema),
})

const onSubmit = handleSubmit((values) => {
  console.log(values)
})
</script>

<template>
  <form @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="username">
      <FormItem>
        <FormLabel>Username</FormLabel>
        <FormControl><Input placeholder="username" v-bind="componentField" /></FormControl>
        <FormDescription>Your unique username.</FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>
    <Button type="submit">Submit</Button>
  </form>
</template>
```

## 添加组件

```bash
# 单个组件
pnpm --filter @mineo/ui addcomps card

# 多个组件
pnpm --filter @mineo/ui addcomps form input label
```

## 开发

```bash
# 构建
pnpm --filter @mineo/ui build

# 类型检查
pnpm --filter @mineo/ui typecheck
```

## 依赖

- vue: ^3.5.0
- tailwindcss: ^4.0.0
- reka-ui: ^2.0.0
- class-variance-authority: ^0.7.0
- lucide-vue-next: ^1.0.0