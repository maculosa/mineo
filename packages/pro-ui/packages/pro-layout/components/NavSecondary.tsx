import type { PropType } from "vue";
import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@mineo/ui";
import { defineComponent } from "vue";
import type { SidebarMenuItem as NavSecondaryItem } from "../types";
import { RouterLink } from "vue-router";
import { MineoIcon } from "../../core/icon";

export const NavSecondary = defineComponent({
    name: 'NavSecondary',
    props: {
        items: {
            type: Array as PropType<NavSecondaryItem[]>,
            default: () => [],
        },
    },
    setup(props) {
        const { items } = props;
        console.log(items);
    
        return () => (
            <SidebarGroup>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {items.map(item => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton as-child size="sm">
                                <RouterLink to={item.url}>
                                    <MineoIcon icon={item.icon} size={24} />
                                    {item.title}
                                </RouterLink>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
        )
    }
})
 