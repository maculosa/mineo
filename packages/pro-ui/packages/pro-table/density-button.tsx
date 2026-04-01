import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@mineo/ui";
import { Settings2 } from "lucide-vue-next";
import { defineComponent, PropType } from "vue";
import type { TableDensity } from "./types";

export function DensityButton() {
  return defineComponent({
    name: "DensityButton",
    props: {
      density: {
        type: String as PropType<TableDensity>,
        default: "medium",
      },
    },
    emits: ['update:density'],
    setup(props, { emit }) {
        const handleClickDensity = (density: TableDensity) => {
            emit('update:density', density);
        }

        return () => (
            <DropdownMenu>
                <DropdownMenuTrigger as-child>
                    <Button variant="outline" size="sm">
                        <Settings2 class="w-4 h-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => handleClickDensity('medium')}>
                        默认
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleClickDensity('compact')}>
                        紧凑
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleClickDensity('loose')}>
                        宽松
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        )
    }
  })
}