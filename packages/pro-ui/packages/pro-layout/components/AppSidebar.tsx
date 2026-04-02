import { defineComponent } from "vue";
import { appSidebarProps } from "../types";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenuButton, SidebarMenuItem } from "@mineo/ui";
import { CommandIcon } from "lucide-vue-next";
import { NavMain } from "./NavMain";

export const AppSidebar = defineComponent({
    name: 'AppSidebar',
    props: {
        ...appSidebarProps
    },
    setup(props, { slots }) {
        const { menus } = props;

        return () => (
            <Sidebar {...props}>
                <SidebarHeader>
                    <SidebarMenuItem>
                        <SidebarMenuButton>
                            <div>
                                <div class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                    <CommandIcon class="size-4" />
                                </div>
                                <div class="grid flex-1 text-left text-sm leading-tight">
                                    <span class="truncate font-medium">MO19</span>
                                    <span class="truncate text-xs">Studio</span>
                                </div>
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarHeader>
                <SidebarContent>
                    <NavMain items={menus} />
                </SidebarContent>
                {slots.footer && (
                    <SidebarFooter>
                        {slots.footer?.()}
                    </SidebarFooter>
                )}
            </Sidebar>
        )
        
    }
})