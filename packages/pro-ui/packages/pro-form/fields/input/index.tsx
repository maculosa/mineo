import { computed, defineComponent, toRefs } from "vue";
import { Search, XIcon } from "lucide-vue-next";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@mineo/ui";

export const ProSearch = defineComponent({
  name: "ProSearch",
  props: {
    modelValue: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    result: {
      type: String,
      default: "",
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const { modelValue, placeholder, result } = toRefs(props);

    const inputValue = computed({
      get() {
        return modelValue.value;
      },
      set(val) {
        emit("update:modelValue", val);
      },
    });

    return () => (
      <InputGroup v-model:modelValue={inputValue.value}>
        <InputGroupInput placeholder={placeholder.value} />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <InputGroupButton>{result.value}</InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    );
  },
});

export const ProInput = defineComponent({
  name: "ProInput",
  props: {
    modelValue: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const { modelValue, placeholder } = toRefs(props);

    const inputValue = computed({
      get() {
        return modelValue.value;
      },
      set(val) {
        emit("update:modelValue", val);
      },
    });

    function handleClear() {
      inputValue.value = "";
      emit("update:modelValue", "");
    }

    return () => (
      <InputGroup class="group">
        <InputGroupInput
          v-model:modelValue={inputValue.value}
          placeholder={placeholder.value}
        />
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            class="opacity-0 group-hover:opacity-100"
            onClick={() => handleClear()}
          >
            <XIcon />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    );
  },
});
