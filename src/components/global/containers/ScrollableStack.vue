<script setup lang="ts">
import Stack from './Stack.vue';

defineProps<{height?: string}>()
</script>

<template>
    <Stack :height="height" justify="flex-start" class="z-scrollablestack-container" gap="0"><slot></slot></Stack>

</template>

<style scoped>
.z-scrollablestack-container {
    overflow-y: auto;
    flex-wrap: nowrap;
    height: 70vh;
    border-color: yellowgreen;
    border-radius: 1px;
}

</style>