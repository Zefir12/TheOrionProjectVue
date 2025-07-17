<template>
    <div class="zefir-weight-container">
        <div class="zefir-content">
            <Stack height="100%">
                <Group justify="center">
                    <StyledNumberInput v-model="weightStore.weightToAdd" />
                    <StyledButton @click="addWeight" name="Add" width="auto" />
                    <Calendar :style="{ width: '12rem' }" id="calendar-24h" v-model="date" hour-format="24" show-icon icon-display="input" dateFormat="dd/mm/yy" />
                    <div :style="{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }">
                        <label :style="{ fontSize: '10px', textAlign: 'center' }">Begin at 0</label> <input type="checkbox" v-model="weightChartTotal" />
                    </div>
                </Group>
                <div :key="`${chartData}`" class="zefir-chart-container">
                    <Chart :ref="chartRef" class="zefir-chart" type="line" :data="chartData" :options="chartOptions" />
                </div>
            </Stack>
        </div>
    </div>
</template>

<script setup lang="ts">
import StyledNumberInput from "@/components/global/StyledNumberInput.vue";
import StyledButton from "@/components/global/StyledButton.vue";
import Group from "@/components/global/containers/Group.vue";
import Stack from "@/components/global/containers/Stack.vue";
import { onMounted, ref, watch } from "vue";
import Chart from "primevue/chart";
import { useWeightStore } from "./store/weightStore";
import { getAllWeightBetween } from "../../lib/supabase/services/supabaseWeightService";
import { Tables } from "../../lib/supabase/supabase/supabaseSchemas/supaDatabase";
import { getAllDatesInRange, getMinMaxDates } from "../../lib/zefir/dates";
import Calendar from "primevue/calendar";

const weightStore = useWeightStore();
const date = ref(new Date(Date.now()));
const weightChartTotal = ref(localStorage.getItem("weightChartTotal") === "true");
const chartRef = ref();

const addWeight = async () => {
    const newDate = new Date(date.value);
    newDate.setHours(12, 0, 0, 0); // sets hour to 12:00:00.000
    await weightStore.addNewWeight(weightStore.weightToAdd, newDate);
    await refreshChart();
};

watch(weightChartTotal, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        localStorage.setItem("weightChartTotal", JSON.stringify(newValue));
        // only update chartOptions with fixed params or parameters that won't cause loop
        chartOptions.value = setChartOptions();
    }
});

const x = ref([] as (null | number)[]);
const y = ref([] as string[]);

const refreshChart = async () => {
    chartData.value = await setChartData();
    chartOptions.value = setChartOptions();
    console.log(chartData, chartOptions);
};

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
    const tomorrow = new Date(Date.now());
    tomorrow.setDate(tomorrow.getDate() + 1);
    const weight = await getAllWeightBetween(new Date("2024-01-01"), tomorrow);
    if (!weight) {
        throw new Error();
    }
    const dates = curateData(weight);
    x.value = [];
    y.value = [];
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
                tension: 0.4
            }
        ]
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
            easing: "easeInOutQuart" // Easing function
        },
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary,
                    maxTicksLimit: 16,
                    callback: function (value: any): string {
                        const label = y.value[value]; // y.value contains your date strings
                        const date = new Date(label);

                        // Format as "styczeń 2023" using Polish locale
                        return date.toLocaleDateString("pl-PL", {
                            month: "short",
                            year: "numeric"
                        });
                    }
                },
                grid: {
                    color: surfaceBorder
                }
            },
            y: {
                beginAtZero: weightChartTotal.value,
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            }
        }
    };
};
</script>

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
