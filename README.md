# mineo

## 介绍

mineo 是一个基于 Vue 3 的新一代系统级组件内核，采用 「Headless + Adapter + Scene」组织架构。

## 核心思想以及用法



## 项目结构

```txt
procore/
├─ pnpm-workspace.yaml
├─ package.json
├─ tsconfig.base.json
├─ README.md

├─ packages/
│  ├─ core/                    # 🚨 绝对核心（无 UI）
│  │  ├─ form-graph/           # @procore/form-graph
│  │  ├─ table-query/          # @procore/table-query（后面）
│  │  ├─ action/               # @procore/action
│  │  ├─ permission/           # @procore/permission
│  │  └─ shared/               # utils / types
│  │
│  ├─ adapters/
│  │  ├─ vue/                  # Vue Adapter 基础
│  │  │  ├─ form/              # @procore/vue-form
│  │  │  └─ table/             # @procore/vue-table
│  │  │
│  │  └─ shadcn-vue/           # UI 实现（重点）
│  │     ├─ form-ui/           # @procore/shadcn-form
│  │     └─ table-ui/          # @procore/shadcn-table
│  │
│  ├─ scenes/
│  │  ├─ admin-form/           # 可选：预制业务 Scene
│  │  └─ admin-table
│  │
│  └─ devtools/
│     └─ playground/           # 调试 & 文档
│
└─ apps/
   └─ docs/                    # VitePress / Storybook

```