<script setup lang="ts">
import Button from "primevue/button";
import { Booleanish } from "primevue/ts-helpers";
const props = defineProps<{ name: String; disabled?: Booleanish }>();
defineEmits(["click"]);
</script>

<template>
    <Button class="my-button" :disabled="props.disabled" text @click="$emit('click')">{{ name }}</Button>
</template>

<style scoped>
.my-button {
    background: rgba(132, 94, 247, 0.15);
    color: #d0bfff;
    font-weight: 600;
    line-height: 1;
    text-align: center;
    overflow: hidden;
    width: auto;
    cursor: pointer;
    border-radius: 4px;
    font-size: calc(0.875rem * 1);
    padding-top: 10px;
    padding-bottom: 10px;
    transition: 20ms;
    transition-timing-function: linear;

    justify-content: center;
    padding: 10px;
}

.my-button:disabled {
    background-color: #2e2e2e;
    color: #696969;
}

.my-button:hover:enabled {
    background-color: rgba(132, 94, 247, 0.2);
}
</style>
