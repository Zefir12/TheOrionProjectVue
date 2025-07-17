<template>
    <div class="item" :style="{ backgroundColor: props.backgroundColor ?? 'rgba(255, 255, 255, 0.178)' }">
        <div>{{ props.name }}</div>
        <div :style="{ fontWeight: 700 }"><slot></slot></div>
    </div>
</template>
<script setup lang="ts">
const props = defineProps<{
    name: string;
    backgroundColor?: string;
}>();
</script>

<style scoped>
.item {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem;
    border-radius: 0.5rem;
}
</style>
