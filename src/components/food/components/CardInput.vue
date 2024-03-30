<script setup lang="ts">
import InputText from "primevue/inputtext";
const model = defineModel<string>()
defineProps(["label"]);
</script>

<template>
    <div class="card-button">
        <small class="small-label">{{ label }}</small>
        <InputText v-model="model" class="my-p-inputtext" />
    </div>
</template>

<style scoped>


.small-label {
    line-height: 1.2;
    font-size: x-small;
    color: #828282;
    margin: 0;
    padding-bottom: 2px;
}

.my-p-inputtext {
    border-radius: calc(0.125rem * 1);
    background-color: #3b3b3b;
    color: #c9c9c9;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji;
    height: calc(1.875rem * 1);
    line-height: calc(calc(1.875rem * 1) - calc(0.125rem * 1));
    font-size: 12px;
}

.card-button {
    overflow: hidden;
    display: flex;
    text-align: left;
    flex-direction: column;
    gap: 0;
}
</style>
