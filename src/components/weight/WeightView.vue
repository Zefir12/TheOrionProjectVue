<script setup lang="ts">
import StyledNumberInput from "../global/StyledNumberInput.vue";
import StyledButton from "../global/StyledButton.vue";
import Group from "../global/containers/Group.vue";
import Stack from "../global/containers/Stack.vue";
import { onMounted, ref } from "vue";
import Chart from "primevue/chart";
import { useWeightStore } from "./store/weightStore";
import { getAllWeightBetween } from "../../lib/supabase/services/supabaseWeightService";
import { Tables } from "../../lib/supabase/supabase/supabaseSchemas/supaDatabase";
import { getAllDatesInRange, getMinMaxDates } from "../../lib/zefir/dates";

const weightStore = useWeightStore();

const x = ref([] as (null | number)[]);
const y = ref([] as string[]);

onMounted(async () => {
    chartData.value = await setChartData();
    chartOptions.value = setChartOptions();
});

const chartData = ref();
const chartOptions = ref();

function curateData(data: Tables<"weight">[]) {
    const { minDate, maxDate } = getMinMaxDates(data);
    if (!minDate || !maxDate) {
        throw new Error();
    }
    const allDays = getAllDatesInRange(minDate, maxDate);
    const total: { date: Date; value: null | number }[] = [];
    allDays.forEach((day) => {
        total.push({ date: day, value: null });
    });

    data.forEach((item) => {
        if (item.created_at !== null) {
            const dateStr = item.created_at.split("T")[0];
            const foundDay = total.find((day) => {
                return day.date.toISOString().split("T")[0] === dateStr;
            });
            if (foundDay) {
                foundDay.value = item.weight;
            }
        }
    });
    return total;
}

const setChartData = async () => {
    // const x: (number | null)[] = [];
    // const y: string[] = [];
    // const weight = await getAllWeight();
    const weight = await getAllWeightBetween(new Date("2023-06-01"), new Date(Date.now()));
    if (!weight) {
        throw new Error();
    }
    const dates = curateData(weight);
    dates.forEach((date) => {
        if (date) {
            x.value.push(date.value);
            y.value.push(date.date.toISOString().split("T")[0]);
        }
    });

    return {
        labels: y,

        datasets: [
            // {
            //     label: "Projected Weight",
            //     data: x,
            //     borderDash: [10, 2],
            //     spanGaps: true,
            //     fill: false,
            //     borderColor: "#333",
            //     tension: 0.4,
            // },
            {
                label: "Weight",
                data: x,
                fill: true,
                spanGaps: true,
                borderColor: "#b197fc",
                backgroundColor: "#00000070",
                tension: 0.4,
            },
        ],
    };
};
const setChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue("--text-color");
    const textColorSecondary = documentStyle.getPropertyValue("--text-color-secondary");
    const surfaceBorder = documentStyle.getPropertyValue("--surface-border");

    return {
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        animation: {
            duration: 0, // Transition duration in milliseconds
            easing: "easeInOutQuart", // Easing function
        },
        plugins: {
            legend: {
                labels: {
                    color: textColor,
                },
            },
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary,
                },
                grid: {
                    color: surfaceBorder,
                },
            },
            y: {
                ticks: {
                    color: textColorSecondary,
                },
                grid: {
                    color: surfaceBorder,
                },
            },
        },
    };
};
</script>

<template>
    <div class="zefir-weight-container">
        <div class="zefir-content">
            <Stack height="100%">
                <Group justify="center">
                    <StyledNumberInput v-model="weightStore.weightToAdd" />
                    <StyledButton @click="weightStore.addNewWeight" name="Add" width="auto" />
                </Group>
                <div class="zefir-chart-container">
                    <Chart class="zefir-chart" type="line" :data="chartData" :options="chartOptions" />
                </div>
            </Stack>
        </div>
    </div>
</template>

<style scoped>
.zefir-chart-container {
    height: 90%;
    width: 100%;
    /* overflow-x: scroll; */
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
