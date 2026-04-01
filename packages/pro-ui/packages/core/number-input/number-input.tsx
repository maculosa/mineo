import { defineComponent, computed } from "vue";
import { Input } from "@mineo/ui";
import { Button } from "@mineo/ui";
import { MinusIcon, PlusIcon } from "lucide-vue-next";
import type { ProNumberInputProps } from "./types";
import { cn } from "@mineo/utils";

export const ProNumberInput = defineComponent({
  name: "ProNumberInput",
  props: {
    modelValue: {
      type: Number,
      default: 0,
    },
    min: {
      type: Number,
      default: undefined,
    },
    max: {
      type: Number,
      default: undefined,
    },
    step: {
      type: Number,
      default: 1,
    },
    decimal: {
      type: Number,
      default: 0,
    },
    prefix: {
      type: String,
      default: "",
    },
    suffix: {
      type: String,
      default: "",
    },
    showControls: {
      type: Boolean,
      default: true,
    },
    hideInput: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    width: {
      type: Number,
      default: 80,
    },
    size: {
      type: String,
      default: "sm",
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const displayValue = computed(() => {
      const value = props.modelValue ?? 0;
      return value.toFixed(props.decimal);
    });

    const isAtMin = computed(() => {
      if (props.min === undefined) return false;
      return props.modelValue <= props.min;
    });

    const isAtMax = computed(() => {
      if (props.max === undefined) return false;
      return props.modelValue >= props.max;
    });

    const canDecrement = computed(() => !props.disabled && !isAtMin.value);
    const canIncrement = computed(() => !props.disabled && !isAtMax.value);

    const clamp = (value: number): number => {
      if (props.min !== undefined && value < props.min) {
        return props.min;
      }
      if (props.max !== undefined && value > props.max) {
        return props.max;
      }
      return value;
    };

    const roundToStep = (value: number): number => {
      const step = props.step;
      return Math.round(value / step) * step;
    };

    const decrement = () => {
      if (!canDecrement.value) return;
      const newValue = roundToStep(props.modelValue - props.step);
      emit("update:modelValue", clamp(newValue));
    };

    const increment = () => {
      if (!canIncrement.value) return;
      const newValue = roundToStep(props.modelValue + props.step);
      emit("update:modelValue", clamp(newValue));
    };

    const handleInput = (event: Event) => {
      const target = event.target as HTMLInputElement;
      const rawValue = target.value.replace(/[^\d.-]/g, "");
      let value = parseFloat(rawValue);

      if (isNaN(value)) {
        value = props.min ?? 0;
      }

      const roundedValue = roundToStep(value);
      emit("update:modelValue", clamp(roundedValue));
    };

    const inputSize = computed(() => {
      const sizeMap = {
        sm: "h-8 w-16",
        md: "h-12 w-24",
        lg: "h-16 w-32",
      }
      return sizeMap[props.size] || "h-8 w-16";
    })

    return () => (
      <div class={cn("flex items-center gap-1")}>
        {props.prefix && (
          <span class={cn("text-sm text-muted-foreground", props.disabled && "opacity-50")}>
            {props.prefix}
          </span>
        )}
        {!props.hideInput && (
          <Input
            type="text"
            inputMode="decimal"
            modelValue={displayValue.value}
            disabled={props.disabled}
            class={cn("text-center", inputSize.value)}
            style={{ width: `${props.width}px` }}
            onUpdate:modelValue={(val: string | number) => {
              const rawValue = String(val).replace(/[^\d.-]/g, "");
              let value = parseFloat(rawValue);
              if (isNaN(value)) {
                value = props.min ?? 0;
              }
              const roundedValue = roundToStep(value);
              emit("update:modelValue", clamp(roundedValue));
            }}
          />
        )}
        {props.showControls && (
          <div class={cn("flex flex-col gap-1")}>
            <Button
              variant="outline"
              size="icon"
              class={cn("h-4 w-4")}
              disabled={!canIncrement.value}
              onClick={increment}
            >
              <PlusIcon class="h-3 w-3" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              class={cn("h-4 w-4")}
              disabled={!canDecrement.value}
              onClick={decrement}
            >
              <MinusIcon class="h-3 w-3" />
            </Button>
          </div>
        )}
        {props.suffix && (
          <span class={cn("text-sm text-muted-foreground", props.disabled && "opacity-50")}>
            {props.suffix}
          </span>
        )}
      </div>
    );
  },
});