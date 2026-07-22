<template>
    <div class="container shadowed">
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
import { onMounted, onUnmounted, ref, watch } from "vue";
import Chart from "primevue/chart";

const router = useRouter();
const userStore = useUserStore();

const x = ref<(null | number)[]>([]);
const y = ref<string[]>([]);

const chartData = ref();
const chartOptions = ref();

const theme = ref(document.documentElement.getAttribute("data-theme"));

const updateChart = async () => {
    chartData.value = await setChartData();
    chartOptions.value = setChartOptions();
};

watch(() => userStore.lastWeekWeights, updateChart, { deep: true });

watch(theme, updateChart);

const themeChanged = () => {
    theme.value = document.documentElement.getAttribute("data-theme");
};

onMounted(async () => {
    document.documentElement.addEventListener("themeChanged", themeChanged);

    if (userStore.lastWeekWeights.length !== 0) {
        await updateChart();
    }
});

onUnmounted(() => {
    document.documentElement.removeEventListener("themeChanged", themeChanged);
});

const setChartData = async () => {
    x.value = [];
    y.value = [];

    userStore.lastWeekWeights.forEach((date) => {
        if (date) {
            x.value.push(date.weight);
            y.value.push(date.date.toISOString().split("T")[0]);
        }
    });

    return {
        labels: y.value,
        datasets: [
            {
                data: x.value,
                fill: true,
                spanGaps: true,
                borderColor: getComputedStyle(document.documentElement).getPropertyValue("--graph-weight-line"),
                backgroundColor: getComputedStyle(document.documentElement).getPropertyValue("--color-weight-background"),
                tension: 0.4
            }
        ]
    };
};

const setChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);

    const textColor = documentStyle.getPropertyValue("--color-text");
    const textColorSecondary = documentStyle.getPropertyValue("--color-text-secondary");
    const surfaceBorder = documentStyle.getPropertyValue("--surface-border");

    const filteredValues = x.value.filter((v): v is number => v !== null);

    const minValue = Math.min(...filteredValues);
    const maxValue = Math.max(...filteredValues);

    return {
        maintainAspectRatio: false,
        animation: {
            duration: 900,
            easing: "easeInOutQuart"
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
                    callback(value: any) {
                        const date = new Date(y.value[value]);

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
                min: minValue - 1,
                max: maxValue + 1,
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
</style>
