<template>
    <Chart
        class="food-chart"
        type="doughnut"
        :data="{
            labels: ['Proteins', 'Fats', 'Carbohydrates'],
            datasets: [
                {
                    data: [props.proteins, props.fats, props.carbohydrates],
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
                }
            },
            Chart: {
                overrides: {
                    doughnut: {
                        plugins: {
                            legend: {
                                display: false
                            }
                        }
                    }
                }
            }
        }"
    />
</template>
<script setup lang="ts">
import Chart from "primevue/chart";

const props = defineProps<{
    proteins: number;
    fats: number;
    carbohydrates: number;
}>();
</script>
<style scoped>
.food-chart {
    height: 100%;
    width: 200px;
}
</style>
