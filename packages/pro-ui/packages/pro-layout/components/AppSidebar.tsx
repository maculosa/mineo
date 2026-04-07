import { defineComponent } from "vue";
import { appSidebarProps } from "../types";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenuButton, SidebarMenuItem } from "@mineo/ui";
import { CommandIcon } from "lucide-vue-next";
import { NavMain } from "./NavMain";
import { NavSecondary } from "./NavSecondary";

export const AppSidebar = defineComponent({
    name: 'AppSidebar',
    props: {
        ...appSidebarProps
    },
    setup(props, { slots }) {
        const { menus, labs } = props;

        return () => (
            <Sidebar {...props}>
                <SidebarHeader>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" as-child>
                            <a>
                                <div class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                    <CommandIcon class="size-4" />
                                </div>
                                <div class="grid flex-1 text-left text-sm leading-tight">
                                    <span class="truncate font-medium">MO19</span>
                                    <span class="truncate text-xs">Studio</span>
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarHeader>
                <SidebarContent>
                    <NavMain items={menus} />
                    <NavSecondary items={labs} class="mt-auto" />
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