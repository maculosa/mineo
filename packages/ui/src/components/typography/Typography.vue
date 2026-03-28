<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import type { TypographyVariants } from '.';
import { computed, ref, useSlots } from 'vue';
import { Primitive } from 'reka-ui';
import { cn } from '@mineo/utils'
import { typographyVariants } from '.';
import { Button } from '../button'

interface Props extends PrimitiveProps {
    /** 
     * 文字标签
     * @values `h1` | `h2` | `h3` | `h4` | `p` | `span` | `blockquote` | `list` | `lead` | `muted` | `large` | `small` | `code`
     * @default 'p'
     */
    tag?: TypographyVariants['tag']
    /**
     * 是否内联
     * 
     * @default false
     */
    inline?: boolean
    /**
     * 文字截断
     * @description 截断文字，显示省略号表示更多内容
     * @default false
     */
    truncate?: boolean
    /**
     * 截断行数
     * @description 截断文字，显示指定行数
     * @default 2
     */
    lineClamp?: number
    /**
     * 是否加粗
     * 
     * @default false
     */
    strong?: boolean
    /**
     * 是否斜体
     * 
     * @default false
     */
    italic?: boolean
    /**
     * 文字下划线
     * 
     * @default false
     */
    underline?: boolean
    /**
     * 是否删除线
     * 
     * @default false
     */
    delete?: boolean
    /**
     * 文字对齐
     * 
     * @values `default` | `left` | `right` | `center`
     * @default 'default'
     */
    align?: TypographyVariants['align']
    /**
     * 文字颜色
     * @values `default` | `primary` | `secondary` | `muted` | `accent` | `destructive`
     * @default 'default'
     */
    color?: TypographyVariants['color']
    /**
     * 是否可复制
     * @description 文字可复制，点击复制按钮复制文字
     * @default false
     */
    copyable?: boolean
    /**
     * 复制文字
     * @description 复制文字，点击复制按钮复制文字
     * @default ''
     */
    copyText?: string
    /**
     * 文字类名
     * 
     * @default ''
     */
    class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
    tag: "p"
})

const slots = defineSlots<{
    default?: () => any
}>()

const copied = ref(false)

const copy = async () => {
    const text = props.copyText || (typeof slots.default?.()[0]?.children === 'string'
    ? slots.default?.()[0]?.children
    : '')

    if (!text) return

    await navigator.clipboard.writeText(text)

    copied.value = true

    setTimeout(() => {
        copied.value = false
    }, 1500)
}

const tag = computed(() => {
    if (props.as) return props.as

    if (props.inline) return 'span'

    const map = {
        h1: "h1",
        h2: "h2",
        h3: "h3",
        h4: "h4",
        p: "p",
        span: "span",
        blockquote: "blockquote",
        code: "code",
    }

    return map[props.tag] || 'span'
})




const classes = computed(() => cn(
    'group transition-all duration-300',
    typographyVariants({ tag: props.tag, color: props.color || 'default', align: props.align || 'default' }),
    props.truncate && !props.lineClamp && 'truncate',
    props.lineClamp && !props.truncate && `line-clamp-${props.lineClamp}`,
    props.strong && props.tag === 'p' && 'font-bold',
    props.italic && 'italic',
    props.underline && 'underline',
    props.delete && 'line-through',
    props.copyable && 'cursor-pointer hover:bg-muted',
    copied.value && 'bg-lime-500/10 hover:bg-lime-500/10',
    props.class,
))


</script>

<template>
<Primitive
    :data-slot="tag"
    :data-tag="tag"
    :as-child="asChild"
    :as="tag"
    :class="classes"
    @click.stop="props.copyable && copy()"
   >
    <slot />
</Primitive>
</template>