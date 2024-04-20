import { defineStore } from "pinia";
import { Tables } from "../../../lib/supabase/supabase/supabaseSchemas/supaDatabase";
import { onMounted, ref } from "vue";
import { getBloodPreassuresBetween } from "../../../lib/supabase/services/supabaseBloodPreassureService";
import { addDays, getAllDatesInRange } from "../../../lib/zefir/dates";

export const useBloodPreassureStore = defineStore("bloodPreassureStore", () => {
    const bloodPreassures = ref([] as Tables<"bloodpressure">[]);
    const chartY = ref([] as string[]);
    const chartX = ref([] as (null | number)[]);
    const chartX2 = ref([] as (null | number)[]);
    const chartXNormal = ref([] as (null | number)[]);
    const chartX2Normal = ref([] as (null | number)[]);
    const chartData = ref({});
    const chartOptions = ref({});

    const setChartData = async () => {
        return {
            labels: chartY,

            datasets: [
                {
                    label: "Diastolic",
                    data: chartX2,
                    spanGaps: true,
                    fill: false,
                    borderColor: "#b197fc",
                    tension: 0.4
                },
                {
                    label: "Systolic",
                    data: chartX,
                    // fill: true,
                    spanGaps: true,
                    borderColor: "#b197fc",
                    backgroundColor: "#00000070",
                    tension: 0.4
                },
                {
                    label: "Systolic Normal",
                    data: chartXNormal,
                    spanGaps: true,
                    fill: false,
                    pointStyle: false,
                    borderColor: "#444",
                    tension: 0.4
                },
                {
                    label: "Diastolic Normal",
                    data: chartX2Normal,
                    spanGaps: true,
                    pointStyle: false,
                    fill: false,
                    borderColor: "#444",
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
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y: {
                    suggestedMin: 0,
                    suggestedMax: 200,
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

    onMounted(async () => {
        const minDate = new Date(addDays(new Date(Date.now()), -60));
        const maxDate = new Date(Date.now());
        bloodPreassures.value = await getBloodPreassuresBetween(minDate, maxDate);
        const dates = getAllDatesInRange(minDate, maxDate);
        //set chart x and y
        dates.forEach((item) => {
            chartY.value.push(item.toISOString().split("T")[0]);
            let xValue = null;
            let xValue2 = null;
            bloodPreassures.value.forEach((val) => {
                if (val.created_at.split("T")[0] === item.toISOString().split("T")[0]) {
                    xValue = val.systolic;
                    xValue2 = val.diastolic;
                }
            });
            chartX.value.push(xValue);
            chartX2.value.push(xValue2);
            chartX2Normal.value.push(120);
            chartXNormal.value.push(80);
        });

        chartData.value = await setChartData();
        chartOptions.value = setChartOptions();
    });

    return { bloodPreassures, chartData, chartOptions };
});
