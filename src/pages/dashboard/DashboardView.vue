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
                        <t class="subtitle"> <NumberAnimationWrapper :value="dashboardStore.water / 1000" :suffix="' / 2L'" /></t>
                        <t class="normal-text">Water consumed today</t>
                    </div>
                </div>
                <ProgressBar class="custom-water-bar" :mode="'determinate'" :show-value="true" :value="dashboardStore.water / 20"
                    ><div :style="{ marginLeft: '40px' }"><NumberAnimationWrapper :value="dashboardStore.water / 20" suffix="%" /></div
                ></ProgressBar>
            </div>

            <div class="stat-card">
                <div :style="{ display: 'flex', alignItems: 'center' }">
                    <IconBolt color="#b99f29" size="40" stroke-width="2" />
                    <div :style="{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }">
                        <t class="subtitle"><NumberAnimationWrapper :decimals="0" :value="dashboardStore.kcal" :suffix="' / 2000'" /></t>
                        <t class="normal-text">Kcal today</t>
                    </div>
                </div>
                <ProgressBar class="custom-kcal-bar" :mode="'determinate'" :show-value="true" :value="dashboardStore.kcal / 20"
                    ><div :style="{ marginLeft: '40px' }"><NumberAnimationWrapper :value="dashboardStore.kcal / 20" suffix="%" /></div
                ></ProgressBar>
            </div>

            <div class="stat-card">
                <div :style="{ display: 'flex', alignItems: 'center' }">
                    <IconMeat color="#6e6e6e" size="40" stroke-width="2" />
                    <div :style="{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }">
                        <t class="subtitle"><NumberAnimationWrapper :decimals="0" :value="dashboardStore.proteins" :suffix="' / 120g'" /></t>
                        <t class="normal-text">Protein today</t>
                    </div>
                </div>
                <ProgressBar class="custom-protein-bar" :mode="'determinate'" :show-value="true" :value="dashboardStore.proteins / 1.2"
                    ><div :style="{ marginLeft: '40px' }"><NumberAnimationWrapper :value="dashboardStore.proteins / 1.2" suffix="%" /></div
                ></ProgressBar>
            </div>
        </div>
        <div class="dashboard-content">
            <div class="big-panel"><FoodInfoView /></div>
            <div class="big-panel"></div>
            <div class="big-panel"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import FoodInfoView from "./subviews/FoodInfoView.vue";
import StyledButton from "@/components/global/StyledButton.vue";
import { useDashboardStore } from "./store/dashboardStore";
import { onMounted } from "vue";
import { IconDroplet, IconBolt, IconMeat } from "@tabler/icons-vue";
import ProgressBar from "primevue/progressbar";
import NumberAnimationWrapper from "@/components/global/NumberAnimationWrapper.vue";

const dashboardStore = useDashboardStore();

onMounted(async () => {
    await dashboardStore.fetchData();
});
</script>

<style scoped>
::v-deep(.custom-water-bar .p-progressbar-value.p-progressbar-value-animate) {
    background-color: rgb(4, 93, 194);
    display: flex;
    justify-content: start;
}

::v-deep(.custom-kcal-bar .p-progressbar-value.p-progressbar-value-animate) {
    background-color: rgb(185, 159, 41);
    display: flex;
    justify-content: start;
}

::v-deep(.custom-protein-bar .p-progressbar-value.p-progressbar-value-animate) {
    background-color: rgb(110, 110, 110);
    display: flex;
    justify-content: start;
}

::v-deep(.p-progressbar-label) {
    color: #fff;
}

::v-deep(.custom-water-bar .p-progressbar-value) {
    transition: width 0.5s ease-out !important; /* Faster - 0.2 seconds */
}

::v-deep(.custom-kcal-bar .p-progressbar-value) {
    transition: width 0.5s ease-out !important; /* Faster - 0.2 seconds */
}

.subtitle {
    font-weight: 700;
}

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

.normal-text {
    font-size: 12px;
}
.stat-card {
    background: #1f1c1c;
    border-radius: 8px;
    padding: 1rem;
    box-shadow: 0 2px 8px rgba(99, 10, 10, 0.1);
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
    width: 25rem;
}
.page-container {
    flex-direction: column;
    display: flex;

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
