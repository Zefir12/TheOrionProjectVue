<template>
    <div class="page-container">
        <div class="time-section">
            <StyledButton class="time-button" name="<" @click="dashboardStore.changeDay(-1)"></StyledButton>
            <span>{{ dashboardStore.day.toISOString().split("T")[0] }}</span>
            <StyledButton class="time-button" name=">" @click="dashboardStore.changeDay(1)"></StyledButton>
        </div>
        <div class="top-panels">
            <div class="stat-card">
                <div :style="{ display: 'flex', alignItems: 'center' }">
                    <IconDroplet size="40" stroke-width="2" />
                    <div :style="{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }">
                        <t class="subtitle">{{ Math.round(dashboardStore.water / 100) / 10 }} / 2L</t>
                        <t class="normal-text">Water consumed today</t>
                    </div>
                </div>
                <ProgressBar class="custom-water-bar" :mode="'determinate'" :show-value="true" :value="dashboardStore.water / 20"
                    ><div :style="{ marginLeft: '40px' }">{{ Math.round(dashboardStore.water / 20) }}%</div></ProgressBar
                >
            </div>
        </div>
        <div class="grid-container">
            <div class="item1 grid-item"><FoodInfoView /></div>
            <div class="item2 grid-item"><SleepInfoView /></div>
            <div class="grid-item"><SleepInfoView /></div>
            <div class="grid-item"><SleepInfoView /></div>
            <div class="grid-item"><SleepInfoView /></div>
            <div class="grid-item"><SleepInfoView /></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import FoodInfoView from "./subviews/FoodInfoView.vue";
import SleepInfoView from "./subviews/SleepInfoView.vue";
import StyledButton from "@/components/global/StyledButton.vue";
import { useDashboardStore } from "./store/dashboardStore";
import { onMounted } from "vue";
import { IconDroplet } from "@tabler/icons-vue";
import ProgressBar from "primevue/progressbar";

const dashboardStore = useDashboardStore();

onMounted(async () => {
    await dashboardStore.fetchData();
});
</script>

<style scoped>
::v-deep(.p-progressbar-value.p-progressbar-value-animate) {
    background-color: rgb(4, 93, 194);
    display: flex;
    justify-content: start;
}

::v-deep(.p-progressbar-label) {
    color: #fff;
}
.subtitle {
    font-weight: 700;
}

.normal-text {
    font-size: 12px;
}
.stat-card {
    background: #332947;
    border-radius: 8px;
    padding: 0.5rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    max-width: 400px;
    transition: all 0.3s ease;
}

.stat-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.top-panels {
    width: min(80%, 1200px);
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
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
    width: 25rem;
}
.page-container {
    flex-direction: column;
    display: flex;
    height: 100vh;
    width: 100%;
    overflow: hidden;
    align-items: center;
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

.item1 {
    grid-column: 1 / 4;
}
.item2 {
    grid-column: 1 / 2;
    grid-row: 2 / 4;
}
</style>
