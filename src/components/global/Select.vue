<template>
    <select v-model="model" name="cars" id="cars">
        <option v-for="option in props.options" :value="option">{{ option.name }}</option>
    </select>
</template>

<script setup lang="ts">
export interface SelectOption {
    name: string;
    value: any;
}

const props = defineProps<{
    options: SelectOption[];
}>();
const model = defineModel();
</script>
