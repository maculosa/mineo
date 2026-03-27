<script setup lang="ts">
import { Button } from './components/ui/button';

interface Props {
    loading?: boolean
}

defineProps<Props>()
</script>

<template>
    <Button v-bind="$attrs">
        <slot></slot>
    </Button>
</template>