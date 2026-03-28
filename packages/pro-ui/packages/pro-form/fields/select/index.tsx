import { computed, defineComponent, toRefs, type PropType } from "vue";
import {
    InputGroup,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@mineo/ui";
import { XIcon } from "lucide-vue-next";

export interface ProSelectItem {
    value: string
    label: string
    type?: 'group'
    disabled?: boolean
    children?: ProSelectItem[]
}

export const ProSelect = defineComponent({
  name: "ProSelect",
  props: {
    modelValue: {
      type: String,
      default: "",
    },
    items: {
      type: Array as PropType<ProSelectItem[]>,
      default: () => [],
    },
    placeholder: {
      type: String,
      default: "",
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const { modelValue, items, placeholder } = toRefs(props);

    const selectValue = computed({
        get() {
            return modelValue.value
        },
        set(val) {
            emit("update:modelValue", val)
        }
    })

    return () => (
      <Select v-model:modelValue={selectValue.value}>
        <SelectTrigger class="w-[180px] relative group">
          <SelectValue placeholder={placeholder.value} />
          <XIcon class="opacity-0 group-hover:opacity-100 absolute top-2 right-3 hover:bg-muted bg-white z-999" />
        </SelectTrigger>
        <SelectContent>
          {items.value.map(item => (
            item.type === 'group' ? (
                <SelectGroup key={item.value}>
                    <SelectLabel>{item.label}</SelectLabel>
                    {item.children?.map(c => (
                        <SelectItem key={c.value} value={c.value} disabled={c.disabled}>{c.label}</SelectItem>
                    ))}
                </SelectGroup>
            ) : (
                <SelectItem key={item.value} value={item.value} disabled={item.disabled}>{item.label}</SelectItem>
            )
          ))}
        </SelectContent>
      </Select>
    );
  },
});
