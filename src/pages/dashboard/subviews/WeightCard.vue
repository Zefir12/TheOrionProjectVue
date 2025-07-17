<template>
    <div class="container">
        <div class="inner-container">
            <div class="top"><div>WAGA</div></div>
            <div class="plus-icon">
                <IconPlus size="32" stroke-width="2" style="margin: 1rem; cursor: pointer" @click="router.push({ name: 'weight' })" />
            </div>
            <div :style="{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '90%', height: '15rem' }">
                <Chart class="zefir-chart" type="line" :data="chartData" :options="chartOptions" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { IconPlus } from "@tabler/icons-vue";
import { useUserStore } from "@/stores/userStore";
import { onMounted, ref, watch } from "vue";
import Chart from "primevue/chart";

const router = useRouter();
const userStore = useUserStore();

const x = ref([] as (null | number)[]);
const y = ref([] as string[]);

const chartData = ref();
const chartOptions = ref();

watch(
    () => userStore.lastWeekWeights,
    async () => {
        chartData.value = await setChartData();
        chartOptions.value = setChartOptions();
    }
);

onMounted(async () => {
    if (userStore.lastWeekWeights.length !== 0) {
        chartData.value = await setChartData();
        chartOptions.value = setChartOptions();
    }
});

const setChartData = async () => {
    userStore.lastWeekWeights.forEach((date) => {
        if (date) {
            x.value.push(date.weight);
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

    const filteredValues = x.value.filter((v): v is number => v !== null);
    const minValue = Math.min(...filteredValues);
    const maxValue = Math.max(...filteredValues);

    return {
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        animation: {
            duration: 900, // Transition duration in milliseconds
            easing: "easeInOutQuart" // Easing function
        },
        plugins: {
            legend: {
                display: false,
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

                        // Return short weekday name in Polish locale, e.g. "pon", "wt"
                        return date.toLocaleDateString("pl-PL", {
                            weekday: "short"
                        });
                    }
                },
                grid: {
                    display: false,
                    color: surfaceBorder
                }
            },
            y: {
                min: minValue - 1, // 10 below min
                max: maxValue + 1, // 10 above max
                beginAtZero: false,
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    display: false,
                    color: surfaceBorder
                }
            }
        }
    };
};
</script>

<style scoped>
.zefir-chart {
    height: 100%;
    width: 100%;
}

.plus-icon {
    position: absolute;
    top: 0rem;
    right: 0rem;
    cursor: pointer;
}
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
    position: relative;
}
.container {
    background-color: #1f1c1c;
    width: 100%;
    height: 100%;
    max-height: 100%;
    border-radius: 5px;
}
</style>
