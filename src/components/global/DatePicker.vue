<template>
    <div class="styled-number-input-container">
        <small class="small-label">{{ props.label }}</small>
        <VueDatePicker v-model="model" time-picker-inline :action-row="{ showNow: true }" dark />
    </div>
</template>

<script setup lang="ts">
/*
https://vue3datepicker.com/customization/theming/
https://vue3datepicker.com/slots/content/
*/

import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const model = defineModel();
const props = defineProps<{
    label?: string;
}>();
</script>

<style scoped>
.dp__theme_dark {
    --dp-background-color: #3b3b3b;
    --dp-font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji;
    --dp-text-color: #c9c9c9;
    --dp-button-height: 2px;
    --dp-border-color: #3f3f46;
    --dp-border-radius: calc(0.15rem * 1);
    --dp-border-color-hover: #3f3f46;
    --dp-font-size: 12px;
}

.small-label {
    line-height: 1.2;
    font-size: x-small;
    color: #828282;
    margin: 0;
    padding-bottom: 2px;
}

.styled-number-input-container {
    width: auto;
    display: flex;
    text-align: left;
    flex-direction: column;
    gap: 0;
}
</style>
