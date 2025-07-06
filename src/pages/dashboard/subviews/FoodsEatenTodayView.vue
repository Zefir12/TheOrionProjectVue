<template>
    <FoodInfoModal v-model="foodModalOpen" :food="foodItemInModal" />
    <div class="full-container">
        <div class="top"><t>DZISIAJ ZJEDZONE</t></div>
        <div class="container">
            <div class="today-eaten-list">
                <TodayEatenCard :food="food" v-for="food in foods" @open-food-info-modal="openFoodInfoModal" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import FoodInfoModal from "../components/FoodInfoModal.vue";
import TodayEatenCard from "../components/TodayEatenCard.vue";
import { FoodItem, useDashboardStore } from "../store/dashboardStore";

const foodModalOpen = ref(false);
const foodItemInModal = ref<FoodItem | null>(null);

const foods = ref<FoodItem[]>([]);
const pendingFoods = ref<FoodItem[]>([]);
const dashboardStore = useDashboardStore();

const openFoodInfoModal = (food: FoodItem) => {
    foodItemInModal.value = food;
    foodModalOpen.value = true;
};

watch(
    () => dashboardStore.computedFoodsEatenToday,
    (newFoods) => {
        foods.value = [];
        pendingFoods.value = newFoods.slice();
    },
    { immediate: true }
);

watch(
    pendingFoods,
    async () => {
        while (pendingFoods.value.length > 0) {
            const nextFood = pendingFoods.value.shift(); // remove first item
            if (nextFood) {
                foods.value.push(nextFood); // add to foods
                await new Promise((resolve) => setTimeout(resolve, 20)); // 500ms delay between each transfer
            }
        }
    },
    { immediate: true }
);
</script>

<style scoped>
.today-eaten-list {
    column-count: 2;
    column-gap: 0.5rem;
    width: 100%;
    padding: 1rem;
}

.today-eaten-list > * {
    break-inside: avoid; /* Prevent items breaking between columns */
    margin-bottom: 0.5rem;
}

.full-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #1f1c1c;
    border-radius: 5px;
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
    max-height: 28rem;
    overflow-y: scroll;
    overflow-x: hidden;
    border-radius: 5px;
}
</style>
