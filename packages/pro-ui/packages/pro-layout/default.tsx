import { defineComponent } from "vue";

import { AppSidebar } from "./components/AppSidebar";
import { defaultLayoutProps } from "./types";
import { ScrollArea, SidebarInset, SidebarProvider } from "@mineo/ui";
import { LayoutHeader } from "./components/LayoutHeader";

export const DefaultLayout = defineComponent({
    name: 'DefaultLayout',
    props: {
        ...defaultLayoutProps
    },
    setup(props, { slots }) {
        const { menus } = props;

        return () => (
            <SidebarProvider class="w-screen h-screen overflow-hidden">
                <AppSidebar menus={menus} />
                <SidebarInset class="w-0 flex-1">
                    <LayoutHeader />
                    <main class="flex-1 flex overflow-hidden">
                        {/* <ScrollArea class="flex-1 w-full"> */}
                            {slots.default?.()}
                        {/* </ScrollArea> */}
                    </main>
                </SidebarInset>
            </SidebarProvider>
        )
    }
})