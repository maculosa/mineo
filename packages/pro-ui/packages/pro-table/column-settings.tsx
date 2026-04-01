import { Button, DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@mineo/ui";
import type { Table } from "@tanstack/vue-table";
import { Settings } from "lucide-vue-next";
import type { PropType } from "vue";
import { defineComponent } from "vue";

export const ColumnSettings = defineComponent({
  name: "ColumnSettings",
  props: {
    table: {
        type: Object as PropType<Table<any>>
    }
  },
  setup(props) {
    const { table } = props;
    return () => (
        <DropdownMenu>
            <DropdownMenuTrigger as-child>
                <Button variant="outline" size="sm">
                    <Settings />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {
                    table.getAllColumns().filter((col) => col.getCanHide()).map((column) => (
                        <DropdownMenuCheckboxItem key={column.id}
                            checked={column.getIsVisible()}
                            onUpdate:checked={column.toggleVisibility()}
                        >
                            {column.columnDef.header || column.id}
                        </DropdownMenuCheckboxItem>
                    ))
                }
            </DropdownMenuContent>
        </DropdownMenu>
    )
  }
})