import { defineComponent } from "vue";

import { AppSidebar } from "./components/AppSidebar";
import { defaultLayoutProps } from "./types";
import { SidebarInset, SidebarProvider } from "@mineo/ui";
import { LayoutHeader } from "./components/LayoutHeader";

export const DefaultLayout = defineComponent({
    name: 'DefaultLayout',
    props: {
        ...defaultLayoutProps
    },
    setup(props, { slots }) {
        const { menus } = props;

        return () => (
            <SidebarProvider>
                <AppSidebar menus={menus} />
                <SidebarInset>
                    <LayoutHeader />
                    <main>
                        {slots.default?.()}
                    </main>
                </SidebarInset>
            </SidebarProvider>
        )
    }
})