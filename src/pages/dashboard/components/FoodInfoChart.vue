<template>
    <Chart
        class="food-chart"
        type="doughnut"
        :data="{
            labels: ['Proteins', 'Fats', 'Carbohydrates'],
            datasets: [
                {
                    data: [props.proteins, props.fats, props.carbohydrates],
                    backgroundColor: ['#646159', '#FFA000', '#673AB7'],
                    borderColor: ['#646159', '#FFA000', '#673AB7'],
                    borderRadius: '10',
                    borderAlign: 'inner'
                }
            ]
        }"
        :options="{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
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
        const textY = height / 2;

        ctx.fillText(text, textX, textY);
        ctx.save();
    }
};
</script>
<style scoped>
.food-chart {
    height: 100%;
    width: 200px;
}
</style>
