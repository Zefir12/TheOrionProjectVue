<template>
    <div class="custom-select">
        <small v-if="props.label" class="small-label">{{ props.label }}</small>
        <select class="my-input select" :style="{ width: props.width, height: props.height }" v-model="model">
            <option v-for="option in props.options" :value="option.value">{{ option.name }}</option>
        </select>
    </div>
</template>

<script setup lang="ts">
export interface SelectOption {
    name: string;
    value: number;
}

const props = defineProps<{
    label?: string;
    width?: string;
    height?: string;
    options: SelectOption[];
}>();
const model = defineModel();
</script>

<style scoped>
select {
    appearance: none;
    outline: none;
    background-color: transparent;
    border: none;
    padding: 0 1em 0 0;
    margin: 0;
    width: 100%;
    font-family: inherit;
    font-size: inherit;
    cursor: inherit;
    line-height: inherit;
}
.select {
    width: 100%;
    height: calc(1.875rem * 1);
    min-width: 15ch;
    font-weight: 100;
    color: #c9c9c9;
    font-family:
        -apple-system,
        BlinkMacSystemFont,
        Segoe UI,
        Roboto,
        Helvetica,
        Arial,
        sans-serif,
        Apple Color Emoji,
        Segoe UI Emoji;
    border: 1px solid #3f3f46;
    border-radius: calc(0.125rem * 1);
    padding: 0.25em 0.5em;
    font-size: 0.875rem;
    cursor: pointer;
    line-height: 1.1;
    background-color: #3b3b3b;
}

.select::after {
    content: "";
    width: 0.8em;
    height: 0.5em;
    background-color: var(--select-arrow);
    clip-path: polygon(100% 0%, 0 0%, 50% 100%);
}
.small-label {
    line-height: 1.2;
    font-size: x-small;
    color: #828282;
    margin: 0;
    padding-bottom: 2px;
}

.custom-select {
    overflow: hidden;
    width: 100%;
    display: flex;
    text-align: left;
    flex-direction: column;
    gap: 0;
}

.my-input {
    height: 100%;
    width: 100%;
}
</style>
