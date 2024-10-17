<template>
    <Card class="z-time-shelf-card" :class="{ highlight: props.highlighted }">
        <template #content>
            <div>
                {{ props.name }}
            </div>
            <div class="absolute-text" v-if="props.text">
                {{ props.text }}
            </div>
            <div class="z-item-container">
                <slot name="content"></slot>
            </div>
        </template>
    </Card>
</template>

<script setup lang="ts">
import Card from "primevue/card";

const props = defineProps<{
    name: string;
    highlighted?: boolean;
    text?: string;
}>();
</script>

<style scoped>
.z-item-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1px;
}
.z-time-shelf-card {
    cursor: pointer;
}
.highlight {
    background-color: rgba(137, 43, 226, 0.05);
    border-width: 1px;
    border-color: rgba(22, 0, 31, 0.233);
    border-style: solid;
}
.absolute-text {
}
</style>
