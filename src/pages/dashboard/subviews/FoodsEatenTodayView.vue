<template>
    <FoodInfoModal v-model="foodModalOpen" :food="foodItemInModal" />
    <div class="container">
        <div class="top"><t>DZISIAJ ZJEDZONE</t></div>
        <div class="today-eaten-list">
            <TodayEatenCard :food="food" v-for="food in dashboardStore.computedFoodsEatenToday" @open-food-info-modal="openFoodInfoModal" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import FoodInfoModal from "../components/FoodInfoModal.vue";
import TodayEatenCard from "../components/TodayEatenCard.vue";
import { FoodItem, useDashboardStore } from "../store/dashboardStore";

const foodModalOpen = ref(false);
const foodItemInModal = ref<FoodItem | null>(null);

const openFoodInfoModal = (food: FoodItem) => {
    foodItemInModal.value = food;
    foodModalOpen.value = true;
};

const dashboardStore = useDashboardStore();
</script>

<style scoped>
.today-eaten-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
    width: 100%;
    padding: 1rem;
}
.top {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-size: large;
    font-weight: bold;
    margin: 1rem 0 0 2rem;
}
.container {
    background-color: #1f1c1c;
    width: 100%;
    height: 100%;

    border-radius: 5px;
}
</style>
