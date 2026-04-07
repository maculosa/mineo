import type { PropType, HTMLAttributes } from "vue";
import { defineComponent, h } from "vue";
import { cn } from '@mineo/utils'

export const MineoIcon = defineComponent({
    name: 'MineoIcon',
    props: {
        icon: {
            type: String,
            default: '',
        },
        size: {
            type: Number,
            default: 16,
        },
        class: {
            type: String as PropType<HTMLAttributes['class']>,
            default: '',
        },
    },
    setup(props) {
        const { icon, size, class: className } = props;
        return () => h(icon, { class: cn(className), style: { fontSize: `${size}px` } });
    }
})
