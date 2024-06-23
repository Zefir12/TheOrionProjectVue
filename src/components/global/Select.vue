<template>
    <div class="styled-number-input-container">
        <small class="small-label">{{ props.label }}</small>
        <select class="my-input" :style="{ width: props.width }" v-model="model">
            <option v-for="option in props.options" :value="option">{{ option.name }}</option>
        </select>
    </div>
</template>

<script setup lang="ts">
export interface SelectOption {
    name: string;
    value: unknown;
}

const props = defineProps<{
    label?: string;
    width?: string;
    options: SelectOption[];
}>();
const model = defineModel();
</script>

<style scoped>
.small-label {
    line-height: 1.2;
    font-size: x-small;
    color: #828282;
    margin: 0;
    padding-bottom: 2px;
}

.styled-number-input-container {
    overflow: hidden;
    width: auto;
    display: flex;
    text-align: left;
    flex-direction: column;
    gap: 0;
}

.my-input {
    height: 1.875rem;
    width: 100%;
}
</style>
