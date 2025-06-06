<template>
    <div class="container">
        <div class="inner-container">
            <FoodInfoChart :proteins="dashboardStore.proteins" :fats="dashboardStore.fats" :carbohydrates="dashboardStore.carbohydrates" :kcal="dashboardStore.kcal" />
            <div class="container-foritems">
                <button class="item" v-for="item in dashboardStore.foodData">{{ item.food_types.name }}</button>
            </div>
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
    max-height: 100%;
    border-radius: 5px;
}
.container-foritems {
    max-height: 200px;
    height: 100%;
    column-width: 100px;
    width: 100%;
    column-gap: 1px;
    overflow: hidden;
    margin-left: 26px;
}
.item {
    width: 100px;
    margin: 1px;
}
</style>
