<template>
    <div class="container">
        <div class="inner-container">
            <div class="top"><t>DZISIEJSZE MAKRO</t></div>

            <FoodInfoChart :proteins="dashboardStore.proteins" :fats="dashboardStore.fats" :carbohydrates="dashboardStore.carbohydrates" :kcal="dashboardStore.kcal" />

            <div class="container-foritems">
                <NumberLabel name="Białko:"><NumberAnimationWrapper :value="Helpers.RoundT1(dashboardStore.proteins)" suffix="g" /></NumberLabel>
                <NumberLabel name="Tłuszcze:"><NumberAnimationWrapper :value="Helpers.RoundT1(dashboardStore.fats)" suffix="g" /></NumberLabel>
                <NumberLabel name="Węglowodany:"><NumberAnimationWrapper :value="Helpers.RoundT1(dashboardStore.carbohydrates)" suffix="g" /></NumberLabel>
                <NumberLabel name="Fibre:"><NumberAnimationWrapper :value="Helpers.RoundT1(dashboardStore.fibre)" suffix="g" /></NumberLabel>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Helpers from "@/common/helpers";
import FoodInfoChart from "../components/FoodInfoChart.vue";
import { useDashboardStore } from "../store/dashboardStore";
import NumberLabel from "@/components/dashboard/NumberLabel.vue";
import NumberAnimationWrapper from "@/components/global/NumberAnimationWrapper.vue";

const dashboardStore = useDashboardStore();
</script>

<style scoped>
.top {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-size: large;
    font-weight: bold;
    margin: 1rem 0 0 3rem;
}
.inner-container {
    display: flex;
    height: max(100%, 30rem);
    flex-direction: column;
    align-items: center;
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
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 1rem;
    width: 100%;
    height: 160px;
    padding: 1rem;
}
</style>
