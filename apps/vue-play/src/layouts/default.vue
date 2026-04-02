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
                <router-view />
    </DefaultLayout>
</template>