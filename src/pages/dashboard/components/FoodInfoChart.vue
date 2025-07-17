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
                    borderColor: ['#000', '#000', '#111'],
                    borderRadius: '10',
                    borderWidth: [1.3, 1, 2],
                    borderAlign: 'inner'
                }
            ]
        }"
        :options="{
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                animateRotate: false, // Disable rotation animation
                duration: 450, // Animation duration in ms
                easing: 'easeOut' // Smooth easing function
            },
            plugins: {
                legend: {
                    position: 'bottom',
                    display: true,
                    labels: {
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

const props = defineProps<{
    proteins: number;
    fats: number;
    carbohydrates: number;
    kcal: number;
}>();
const centerTextPlugin = {
    id: "centerText",
    beforeDraw(chart: any) {
        const { width } = chart;
        const { height } = chart;
        const ctx = chart.ctx;

        ctx.restore();
        const fontSize = 16;
        ctx.font = `bold ${fontSize}px sans-serif`;
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#fff"; // white color

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
