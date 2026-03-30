import { defineComponent, type HTMLAttributes } from 'vue'
import { CardContent } from '@mineo/ui'

export const ProCardContent = defineComponent({
  name: 'ProCardContent',
  props: {
    class: String as () => HTMLAttributes['class'],
  },
  setup(props, { slots }) {
    return () => <CardContent class={props.class}>{slots.default?.()}</CardContent>
  },
})