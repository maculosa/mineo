import type { DataTableActionItem } from "./types";
import { computed, defineComponent, PropType } from "vue";

import { MoreHorizontalIcon } from "lucide-vue-next";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  Button,
  ButtonGroup
} from "@mineo/ui";

export const DataTableActionRoot = defineComponent({
  name: "DataTableActionRoot",
  props: {
    group: {
      type: Boolean,
      default: false,
    }
  },
  setup(props, { slots }) {
    const { group } = props;

    if (group) {
      return () => (
        <ButtonGroup>
          {slots.default?.()}
        </ButtonGroup>
      );
    } 
    return () => (
      <div class="flex items-center gap-1">
        {slots.default?.()}
      </div>
    )
  }
})

export const DataTableAction = defineComponent({
  name: "DataTableAction",
  props: {
    items: {
      type: Array as PropType<DataTableActionItem<any>[]>,
      required: true,
    },
    splitNum: {
      type: Number,
      default: 2,
    },
    iconOnly: {
      type: Boolean,
      default: false,
    },
    group: {
      type: Boolean,
      default: false,
    }
  },
  setup(props) {
    const { items, splitNum, iconOnly, group } = props; 

    const displayItems = items.slice(0, splitNum);
    const dropdownItems = items.slice(splitNum);

    return () => (
      <DataTableActionRoot group={group}>
        {displayItems.map((item) => (
          <Button
            key={item.key}
            variant={item.variant || undefined}
            size={iconOnly ? "icon-sm" : "sm"}
            disabled={item.disabled}
            onClick={item.onClick}
          >
            {item.icon}
            {!iconOnly && item.label}
          </Button>
        ))}
        {dropdownItems.length > 0 && (
          <DataTableActionDropdown items={dropdownItems} />
        )}
      </DataTableActionRoot>
    );
  },
});

export const DataTableActionDropdown = defineComponent({
  name: "DataTableActionDropdown",
  props: {
    items: {
      type: Array as PropType<DataTableActionItem<any>[]>,
      default: () => [],
    },
  },
  setup(props) {
    const { items } = props;

    const count = computed(() => items.length);

    return () => (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button size="icon-sm" variant="outline">
            <MoreHorizontalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {items.map((item) => (
            <>
              {item.separator && count.value > 1 && (
                <DropdownMenuSeparator key={`${item.key}-separator`} />
              )}
              <DropdownMenuItem
                key={item.key}
                disabled={item.disabled}
                variant={item.variant || undefined}
                onClick={item.onClick}
              >
                {item.icon}
                {item.label}
              </DropdownMenuItem>
            </>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
});
