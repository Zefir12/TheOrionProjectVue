<template>
    <div class="main-card">
        <div>{{ props.mealItem.name }}</div>
        <div class="inner">
            <StyledButton :name="'x'" @click="emit('submit')"></StyledButton>
            Mnożnik
            <StyledNumberInput v-model="mealItem.multiplier"></StyledNumberInput>
        </div>

        <BulkFoodItem v-for="item in props.mealItem.foods" :food-item="item" :name="item.name" @submit="props.mealItem.foods.splice(props.mealItem.foods.indexOf(item), 1)" />
    </div>
</template>

<script setup lang="ts">
import { MealAsItemToAdd } from "@/lib/models/Food";
import BulkFoodItem from "./BulkFoodItem.vue";
import StyledNumberInput from "../global/StyledNumberInput.vue";
import StyledButton from "../global/StyledButton.vue";

const emit = defineEmits(["submit"]);
const props = defineProps<{
    mealItem: MealAsItemToAdd;
}>();
</script>

<style scoped>
.main-card {
    display: flex;
    flex-direction: column;
    border-style: solid;
    border-width: 1px;
    border-color: black;
    border-radius: 5px;
    padding: 5px;
}
.inner {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
</style>
