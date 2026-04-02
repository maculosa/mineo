import type { PropType } from "vue";
import type { SidebarMenuItem as NavMenuItem } from "../types";

import { defineComponent, Fragment } from "vue";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@mineo/ui";
import { ChevronRight } from "lucide-vue-next";

export const NavMain = defineComponent({
  name: "NavMain",
  props: {
    items: {
      type: Array as PropType<NavMenuItem[]>,
      default: () => [],
    },
    label: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const { items } = props;

    return () => (
      <SidebarGroup>
        {props.label && <SidebarGroupLabel>{props.label}</SidebarGroupLabel>}
        <SidebarMenu>
          {items.map((item) => (
            <Collapsible key={item.id} default-open={item.isActive} as-child>
              <SidebarMenuItem>
                <SidebarMenuButton as-child tooltip={item.title}>
                  <component is={item.icon} />
                  <span>{item.title}</span>
                </SidebarMenuButton>
                {item.children && (
                  <Fragment>
                    <CollapsibleTrigger as-child>
                      <SidebarMenuAction class="data-[state=open]:rotate-90">
                        <ChevronRight />
                        <span class="sr-only">Toggle</span>
                      </SidebarMenuAction>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                        <SidebarMenuSub>
                            {item.children.map((child) => (
                                <SidebarMenuSubItem key={child.id}>
                                    <SidebarMenuButton as-child>
                                        <component is={child.icon} />
                                        <span>{child.title}</span>
                                    </SidebarMenuButton>
                                </SidebarMenuSubItem>
                            ))}
                        </SidebarMenuSub>
                    </CollapsibleContent>
                  </Fragment>
                )}
              </SidebarMenuItem>
            </Collapsible>
          ))}
        </SidebarMenu>
      </SidebarGroup>
    );
  },
});
