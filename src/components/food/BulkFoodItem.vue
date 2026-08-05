<template>
    <div class="zefir-main-card">
        <div class="right-side">
            <Select v-model="foodItem.option" :options="foodItem.servings" class="zefir-select"></Select>
            <div class="content-center"><StyledNumberInput :style="{ maxWidth: '6rem' }" v-model="foodItem.multiplier"></StyledNumberInput></div>
        </div>
        <div class="content-center">
            <div>{{ props.name }}</div>
        </div>
        <button class="x-button" @click="emit('submit')">X</button>
    </div>
</template>

<script setup lang="ts">
import Select from "@/components/global/Select.vue";
import StyledNumberInput from "@/components/global/StyledNumberInput.vue";
import { FoodAsItemToAdd } from "@/lib/models/Food";
import { onMounted } from "vue";

const emit = defineEmits(["submit"]);
const props = defineProps<{
    name?: string;
    foodItem: FoodAsItemToAdd;
}>();

onMounted(() => {});
</script>

<style scoped>
.content-center {
    display: flex;
    justify-content: center;
    flex-grow: 1;
    align-items: center;
    font-size: smaller;
    text-align: center;
}
.zefir-select {
    height: 50%;
    max-width: 6rem;
}
.right-side {
    height: 100%;
    /* background-color: aqua; */
}
.x-button {
    height: 3.4rem;
    width: 3.4rem;
    border-radius: 5px;
    border: 0px;
    cursor: pointer;
    background-color: #3b3941;
}
.x-button:hover {
    background-color: brown;
}
.zefir-main-card {
    min-height: 3rem;
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    border-radius: 5px;
    padding: 0px;
    overflow: hidden;
    background: var(--color-meal-item-row);
    color: var(--color-text);
}
</style>
