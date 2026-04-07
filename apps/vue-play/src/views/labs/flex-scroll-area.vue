<script setup lang="ts">
import { ScrollArea } from '@mineo/ui';
</script>

<template>
    <div class="h-screen flex flex-col relative">
        <div class="h-20 bg-transparent flex items-center justify-center">
            <span class="text-2xl font-bold">Flex Scroll Area</span>
        </div>
        <ScrollArea class="flex-1 min-h-0">
            <div class="h-[2000px] bg-linear-to-b from-lime-300/10 via-lime-50 to-lime-100"></div>
        </ScrollArea>
        <div class="h-16 bg-muted flex items-center justify-center">
            <span class="text-xl font-bold">Flex Scroll Area Footer</span>
        </div>
    </div>
</template>