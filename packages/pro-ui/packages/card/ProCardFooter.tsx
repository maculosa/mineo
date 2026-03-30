import { defineComponent, type HTMLAttributes } from 'vue'
import { cn } from '@mineo/utils'

export const ProCardFooter = defineComponent({
  name: 'ProCardFooter',
  props: {
    class: String as () => HTMLAttributes['class'],
  },
  setup(props, { slots }) {
    return () => (
      <div class={cn('flex items-center px-6 border-t pt-4', props.class)}>
        {slots.default?.()}
      </div>
    )
  },
})