<script setup lang="ts">
import { Command } from 'lucide-vue-next';
import { ref } from 'vue';

import { DefaultLayout } from '@mineo/pro-ui';


const menuItems = ref([
    {
        title: 'Playground',
        url: '/playground',
        icon: Command,
        isActive: true,
        children: [
            {
                title: 'Data Table',
                url: '/playground/data-table',
                icon: Command,
                isActive: true,
            },
        ],
    }
])

</script>

<template>
    <DefaultLayout :menus="menuItems">
        <router-view v-slot="{ Component }">
            <Transition name="fade">
                <component :is="Component" />
            </Transition>
        </router-view>
    </DefaultLayout>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
    transition: all 0.3s ease-out;
}
.fade-enter-from,
.fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
}
</style>