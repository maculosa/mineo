import { Button } from "@mineo/ui";
import { cn } from "@mineo/utils";
import { RefreshCw } from "lucide-vue-next";
import { defineComponent } from "vue";

export const RefreshButton = defineComponent({
  name: "RefreshButton",
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["click"],
  setup(props, { emit }) {
    const handleClick = () => {
      emit("click");
    };
    return () => (
      <Button variant="outline" size="sm" disabled={props.disabled} onClick={handleClick}>
        <RefreshCw class={cn("w-4 h-4", props.loading && "animate-spin")} />
      </Button>
    );
  },
});
