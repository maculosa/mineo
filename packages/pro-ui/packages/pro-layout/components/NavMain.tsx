import type { PropType } from "vue";
import type { SidebarMenuItem as NavMenuItem } from "../types";

import { defineComponent, Fragment, h } from "vue";
import { useRouter } from "vue-router";
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
    const router = useRouter();

    const handleClick = (url: string) => {
      router.push(url);
    };

    const renderIcon = (icon: any) => {
      if (icon && typeof icon === 'object') {
        return h(icon, { class: "size-4" });
      }
    };

    return () => (
      <SidebarGroup>
        {props.label && <SidebarGroupLabel>{props.label}</SidebarGroupLabel>}
        <SidebarMenu>
          {items.map((item) => (
            <Collapsible key={item.id} default-open={item.isActive} as-child>
              <SidebarMenuItem>
                <SidebarMenuButton as-child tooltip={item.title}>
                  <div class="cursor-pointer">
                    {renderIcon(item.icon)}
                    <span>{item.title}</span>
                  </div>
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
                          <SidebarMenuSubItem key={child.id} onClick={() => handleClick(child.url)}>
                            <SidebarMenuButton as-child>
                              <div class="cursor-pointer">
                                {renderIcon(child.icon)}
                                <span>{child.title}</span>
                              </div>
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
