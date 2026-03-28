import { defineComponent } from 'vue'
import { cn } from '@mineo/utils'

/**
 * Pro Text
 */
export const ProText = defineComponent({
  name: 'ProText',
  props: {
    variant: {
        type: String,
        default: 'primary'
    }
  },
  setup(props, { slots }) {
    const { variant } = props
    return () => (
      <p class={cn('text-muted-foreground text-xl leading-7 not-first:mt-6', variant)}>{slots.default?.()}</p>
    )
  }
})
