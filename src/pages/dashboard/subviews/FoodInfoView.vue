<template>
    <div class="container">
        <div class="inner-container">
            <FoodInfoChart :proteins="dashboardStore.proteins" :fats="dashboardStore.fats" :carbohydrates="dashboardStore.carbohydrates" />
            {{ dashboardStore.kcal }}
            <button v-for="item in dashboardStore.foodData">{{ item.food_types.name }}</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import FoodInfoChart from "../components/FoodInfoChart.vue";
import { useDashboardStore } from "../store/dashboardStore";

const dashboardStore = useDashboardStore();
</script>

<style scoped>
.inner-container {
    display: flex;
    height: 100%;
    align-items: center;
    padding: 2rem;
    overflow-x: hidden;
}
.container {
    background-color: #1f1c1c;
    width: 100%;
    height: 100%;
    border-radius: 5px;
}
</style>
