<template>
    <button class="my-button">
        <component :is="icon || DefaultIcon" :stroke-width="2" />
    </button>
</template>

<script setup lang="ts">
import { IconPlus as DefaultIcon } from "@tabler/icons-vue";

// Add a prop to accept a custom icon component
defineProps<{
    icon?: any; // Or type it stricter if you want
}>();
</script>

<style scoped>
.my-button {
    background: rgba(132, 94, 247, 0.15);
    color: #d0bfff;
    display: flex;
    flex-direction: row;
    justify-items: center;
    align-items: center;

    text-align: center;
    width: 2.25rem;
    height: 2.25rem;
    cursor: pointer;
    border-radius: 4px;

    transition: 20ms;
    transition-timing-function: linear;
    border-color: transparent;
    justify-content: center;
    align-items: center;
    padding: 2px;
}

.my-button:disabled {
    background-color: #2e2e2e;
    color: #696969;
}

.my-button:hover:enabled {
    background-color: rgba(132, 94, 247, 0.2);
}
</style>
