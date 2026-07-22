<template>
    <Chart
        class="food-chart"
        type="doughnut"
        :data="{
            labels: ['Proteins', 'Fats', 'Carbohydrates'],
            datasets: [
                {
                    data: [props.proteins, props.fats, props.carbohydrates],
                    backgroundColor: ['#646159', '#FFA000', '#7a1515'],
                    borderColor: ['#000', '#000', '#000'],
                    borderRadius: '6'
                }
            ]
        }"
        :options="{
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                animateRotate: false, // Disable rotation animation
                duration: 150, // Animation duration in ms
                easing: 'ease' // Smooth easing function
            },
            plugins: {
                legend: {
                    position: 'bottom',
                    display: true,
                    labels: {
                        color: textColor,
                        padding: 20,
                        usePointStyle: true,
                        pointStyle: 'circle',
                        font: {
                            size: 14,
                            family: 'sans-serif',
                            weight: 'bold'
                        }
                    }
                },
                centerText: {} // activate custom plugin
            }
        }"
        :plugins="[centerTextPlugin]"
    />
</template>

<script setup lang="ts">
import Chart from "primevue/chart";
import { ref, onMounted, onUnmounted } from "vue";

const props = defineProps<{
    proteins: number;
    fats: number;
    carbohydrates: number;
    kcal: number;
}>();

const textColor = ref(getComputedStyle(document.documentElement).getPropertyValue("--color-text").trim());

const chartData = ref();
const chartOptions = ref();

const updateChart = () => {
    textColor.value = getComputedStyle(document.documentElement).getPropertyValue("--color-text").trim();

    const newData = [props.proteins, props.fats, props.carbohydrates];

    if (!chartData.value) {
        chartData.value = {
            labels: ["Proteins", "Fats", "Carbohydrates"],
            datasets: [
                {
                    data: newData,
                    backgroundColor: ["#646159", "#FFA000", "#7a1515"],
                    borderColor: ["#000", "#000", "#000"],
                    borderRadius: 6
                }
            ]
        };
    } else {
        // Keep the same dataset, only change values
        chartData.value.datasets[0].data = newData;
    }

    chartOptions.value = {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            animateRotate: false,
            duration: 500,
            easing: "easeInOutQuart"
        },
        plugins: {
            legend: {
                position: "bottom",
                display: true,
                labels: {
                    color: textColor.value,
                    padding: 20,
                    usePointStyle: true,
                    pointStyle: "circle",
                    font: {
                        size: 14,
                        family: "sans-serif",
                        weight: "bold"
                    }
                }
            },
            centerText: {}
        }
    };
};

const themeChanged = () => {
    updateChart();
};

onMounted(() => {
    updateChart();
    document.documentElement.addEventListener("themeChanged", themeChanged);
});

onUnmounted(() => {
    document.documentElement.removeEventListener("themeChanged", themeChanged);
});

const centerTextPlugin = {
    id: "centerText",
    beforeDraw(chart: any) {
        const { width, height } = chart;
        const ctx = chart.ctx;

        ctx.restore();

        const fontSize = 16;
        ctx.font = `bold ${fontSize}px sans-serif`;
        ctx.textBaseline = "middle";
        ctx.fillStyle = textColor.value;

        const text = `${props.kcal.toFixed(0)} kcal`;
        const textX = Math.round((width - ctx.measureText(text).width) / 2);
        const textY = height / 2 - 18;

        ctx.fillText(text, textX, textY);
        ctx.save();
    }
};
</script>

<style scoped>
.food-chart {
    height: 240px;
    width: 340px;
}
</style>
