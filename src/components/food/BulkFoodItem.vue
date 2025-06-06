<template>
    <div class="zefir-main-card">
        <div class="right-side">
            <Select v-model="foodItem.option" :options="foodItem.servings" class="zefir-select"></Select>
        </div>
        <div class="content-center"><StyledNumberInput :style="{ maxWidth: '4rem' }" v-model="foodItem.multiplier"></StyledNumberInput></div>
        <div class="content-center">{{ props.name }}</div>
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
    align-items: center;
    height: 100%;
}
.zefir-select {
    height: 100%;
}
.right-side {
    height: 100%;
    /* background-color: aqua; */
}
.x-button {
    height: 3rem;
    width: 3rem;
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
    border-radius: 5px;
    padding: 0px;
    overflow: hidden;
    background: #7950f226;
    color: #b197fc;
}
</style>
