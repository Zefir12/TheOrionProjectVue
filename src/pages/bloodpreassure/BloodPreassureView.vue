<script setup lang="ts">
import { useBloodPreassureStore } from "./store/bloodpreassureStore";
import Stack from "@/components/global/containers/Stack.vue";
import Group from "@/components/global/containers/Group.vue";
import StyledNumberInput from "@/components/global/StyledNumberInput.vue";
import StyledButton from "@/components/global/StyledButton.vue";
import Chart from "primevue/chart";

const bloodPreassureStore = useBloodPreassureStore();
</script>
<template>
    <div class="zefir-weight-container">
        <div class="zefir-content">
            <Stack height="100%">
                <Group justify="center">
                    <StyledNumberInput :disabled="true" />
                    <StyledButton :disabled="true" name="Add" width="auto" />
                </Group>
                <div class="zefir-chart-container">
                    <Chart class="zefir-chart" type="line" :data="bloodPreassureStore.chartData" :options="bloodPreassureStore.chartOptions" />
                </div>
            </Stack>
        </div>
    </div>
</template>

<style scoped>
.zefir-chart-container {
    height: 90%;
    width: 100%;
}
.zefir-chart {
    height: 100%;
    width: 100%;
}

.zefir-weight-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
}

.zefir-content {
    width: 80%;
    height: 90%;
}
</style>
