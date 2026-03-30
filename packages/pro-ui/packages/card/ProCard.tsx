import { computed, defineComponent } from 'vue'
import { LoaderCircle, AlertCircle, InboxIcon } from 'lucide-vue-next'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
} from '@mineo/ui'
import type { ProCardProps } from './types'

export const ProCard = defineComponent({
  name: 'ProCard',
  props: {
    title: String,
    description: String,
    loading: Boolean,
    error: String,
    empty: Boolean,
    emptyText: {
      type: String,
      default: '暂无数据',
    },
    showHeader: {
      type: Boolean,
      default: true,
    },
    showFooter: Boolean,
    class: String,
    footerClass: String,
  },
  setup(props: ProCardProps, { slots }) {
    const hasHeader = computed(() => {
      return props.showHeader && (props.title || props.description || slots.extra)
    })

    return () => (
      <Card class={props.class}>
        {hasHeader.value && (
          <CardHeader>
            {props.title && <CardTitle>{props.title}</CardTitle>}
            {props.description && (
              <CardDescription>{props.description}</CardDescription>
            )}
            {slots.extra && <CardAction>{slots.extra()}</CardAction>}
          </CardHeader>
        )}

        <CardContent>
          {props.loading ? (
            <div class="flex flex-col items-center justify-center py-12 gap-3 text-muted-foreground">
              <LoaderCircle class="size-8 animate-spin" />
              <span class="text-sm">加载中...</span>
            </div>
          ) : props.error ? (
            <div class="flex flex-col items-center justify-center py-12 gap-3 text-destructive">
              <AlertCircle class="size-8" />
              <span class="text-sm">{props.error}</span>
            </div>
          ) : props.empty ? (
            <div class="flex flex-col items-center justify-center py-12 gap-3 text-muted-foreground">
              <InboxIcon class="size-8" />
              <span class="text-sm">{props.emptyText}</span>
            </div>
          ) : (
            slots.default?.()
          )}
        </CardContent>

        {slots.footer && (
          <div class={cn("flex items-center px-6 border-t pt-4", props.footerClass)}>
            {slots.footer()}
          </div>
        )}
      </Card>
    )
  },
})