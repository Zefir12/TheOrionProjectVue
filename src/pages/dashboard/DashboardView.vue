<template>
    <WaterTresholdModal v-model="waterModalOpened" />
    <KcalTresholdModal v-model="kcalModalOpened" />
    <ProteinTresholdModal v-model="proteinModalOpened" />
    <AddWaterModal v-model="addWaterModalOpened" />
    <div class="page-container">
        <div class="time-section">
            <div class="arrow-icon" @click="dashboardStore.changeDay(-1)">
                <IconArrowNarrowLeft size="32" stroke-width="3" />
            </div>
            <span :style="{ fontWeight: '700' }">{{ dashboardStore.day.toISOString().split("T")[0] }}</span>
            <div v-if="dashboardStore.currentDay != 1" class="arrow-icon" @click="dashboardStore.changeDay(1)">
                <IconArrowNarrowRight size="32" stroke-width="3" />
            </div>
            <div class="arrow-icon-disabled" v-else><IconArrowNarrowRight size="32" stroke-width="3" /></div>
        </div>
        <div class="top-panels">
            <FoodStatCard
                @cog-clicked="waterModalOpened = true"
                :subtitle="'Water consumed today'"
                :value="dashboardRefs.water.value"
                :treshold="userStore.userDailyStats.water"
                :color="'#045dc2'"
                :icon="IconDroplet"
                suffix="L"
                :scale="1000"
                :icon-clickable="true"
                @icon-clicked="addWaterModalOpened = true"
            />
            <FoodStatCard
                @cog-clicked="kcalModalOpened = true"
                :subtitle="'Kcal today'"
                :value="dashboardRefs.kcal.value"
                :decimals="0"
                :tresholdType="'under'"
                :treshold="userStore.userDailyStats.calories"
                :color="'#b99f29'"
                :icon="IconBolt"
            />
            <FoodStatCard
                @cog-clicked="proteinModalOpened = true"
                :subtitle="'Protein today'"
                :value="dashboardRefs.proteins.value"
                :treshold="userStore.userDailyStats.protein"
                :color="'#6e6e6e'"
                :icon="IconMeat"
                suffix="g"
            />
        </div>
        <div class="dashboard-content">
            <div class="big-panel"><FoodInfoView /></div>
            <div class="big-panel"><FoodsEatenTodayView /></div>
            <div class="big-panel"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import FoodInfoView from "./subviews/FoodInfoView.vue";
import { useDashboardStore } from "./store/dashboardStore";
import { onMounted, ref } from "vue";
import { IconDroplet, IconBolt, IconMeat, IconArrowNarrowLeft, IconArrowNarrowRight } from "@tabler/icons-vue";
import FoodsEatenTodayView from "./subviews/FoodsEatenTodayView.vue";
import FoodStatCard from "./components/FoodStatCard.vue";
import { useUserStore } from "@/stores/userStore";
import WaterTresholdModal from "./components/tresholds/WaterTresholdModal.vue";
import KcalTresholdModal from "./components/tresholds/KcalTresholdModal.vue";
import ProteinTresholdModal from "./components/tresholds/ProteinTresholdModal.vue";
import AddWaterModal from "./components/AddWaterModal.vue";
import { storeToRefs } from "pinia";

const dashboardStore = useDashboardStore();
const userStore = useUserStore();

const waterModalOpened = ref(false);
const addWaterModalOpened = ref(false);
const kcalModalOpened = ref(false);
const proteinModalOpened = ref(false);

const dashboardRefs = storeToRefs(dashboardStore);

onMounted(async () => {
    await dashboardStore.fetchData();
});
</script>

<style scoped>
.dashboard-content {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    width: min(95%, 1200px);
}

@media (min-width: 1000px) {
    .dashboard-content {
        grid-template-columns: 1fr 1fr;
    }
}

.arrow-icon {
    cursor: pointer;
    padding: 3px;
    border-radius: 6px;
    background-color: #312b43;
    display: flex;
    align-items: center;
    justify-content: center;
}

.arrow-icon-disabled {
    padding: 3px;
    border-radius: 6px;
    background-color: #3f3f3f;
    display: flex;
    align-items: center;
    justify-content: center;
}

.arrow-icon:hover {
    background-color: #413a54;
}

.top-panels {
    width: min(95%, 1200px);
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
}

.big-panel {
    background: #332947;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    transition: all 0.3s ease;
}

.time-button {
    width: 2.4rem;
    padding: 0px;
}

.time-section {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 4rem;
    padding: 1rem;
    width: 16rem;
}

.page-container {
    flex-direction: column;
    display: flex;

    width: 100%;
    overflow: hidden;
    align-items: center;
    margin-bottom: 20px;
}

.grid-container {
    display: grid;
    height: 50rem;
    width: 50rem;
    gap: 5px 5px;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    justify-items: center;
    align-items: center;
}

.grid-item {
    width: 100%;
    height: 100%;
}
</style>
