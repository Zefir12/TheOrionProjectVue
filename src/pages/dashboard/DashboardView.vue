<template>
    <div class="page-container">
        <div class="time-section">
            <StyledButton class="time-button" name="<" @click="dashboardStore.changeDay(-1)"></StyledButton>
            <span>{{ dashboardStore.day.toLocaleString().split(",")[0] }}</span>
            <StyledButton class="time-button" name=">" @click="dashboardStore.changeDay(1)"></StyledButton>
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

const dashboardStore = useDashboardStore();

onMounted(async () => {
    await dashboardStore.fetchData();
});
</script>

<style scoped>
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
    width: 100vw;
    overflow: scroll;
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
