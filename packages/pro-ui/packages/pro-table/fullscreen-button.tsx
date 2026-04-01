import { Button } from "@mineo/ui";
import { Maximize2, Minimize2 } from "lucide-vue-next";
import { defineComponent } from "vue";

export const FullscreenButton = defineComponent({
  name: "FullscreenButton",
  props: {
    isFullscreen: {
      type: Boolean,
      default: false,
    }
  },
  emits: ['toggle'],
  setup(props, { emit }) {
    const toggle = () => {
      emit('toggle');
    }
    return () => (
        <Button
            variant="outline"
            size="sm"
            onClick={toggle}
        >
            {props.isFullscreen ? <Minimize2 class="w-4 h-4" /> : <Maximize2 class="w-4 h-4" />}
        </Button>
    )
  }
})
