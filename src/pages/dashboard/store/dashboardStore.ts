import { getFoodsWithData } from "@/lib/supabase/services/supabaseFoodService";
import { Tables } from "@/lib/supabase/supabase/supabaseSchemas/supaDatabaseExtensions";
import { getMidnight, getTodayWithOffset } from "@/lib/zefir/dates";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export interface FoodItem {
    food_amount: number;
    time_of_intake: string;
    food_types: Tables<"food_types">;
}

export const useDashboardStore = defineStore("dashboardStore", () => {
    const currentDay = ref(0);
    const foodData = ref([] as FoodItem[]);
    const day = ref(getMidnight(getTodayWithOffset(currentDay.value)));

    const fetchData = async () => {
        const baseDate = new Date(day.value); // e.g., 2025-06-19

        // Start at 00:00 UTC of the today
        const startDate = new Date(Date.UTC(baseDate.getUTCFullYear(), baseDate.getUTCMonth(), baseDate.getUTCDate(), 24, 0, 0, 0));

        // End at 0:00 UTC of the next day day
        const endDate = new Date(Date.UTC(baseDate.getUTCFullYear(), baseDate.getUTCMonth(), baseDate.getUTCDate() + 1, 24, 0, 0, 0));

        const data = await getFoodsWithData(startDate, endDate);
        foodData.value = data as FoodItem[];
    };

    const changeDay = async (offset: number) => {
        currentDay.value += offset;
        day.value = getMidnight(getTodayWithOffset(currentDay.value));

        await fetchData();
    };

    const proteins = computed(() => {
        let totalProtein = 0;
        foodData.value.forEach((food) => {
            totalProtein += food.food_types.protein * (food.food_amount / 100);
        });
        return totalProtein;
    });
    const fats = computed(() => {
        let totalFats = 0;
        foodData.value.forEach((food) => {
            totalFats += food.food_types.fat * (food.food_amount / 100);
        });
        return totalFats;
    });
    const carbohydrates = computed(() => {
        let totalCarbs = 0;
        foodData.value.forEach((food) => {
            totalCarbs += food.food_types.carbs * (food.food_amount / 100);
        });
        return totalCarbs;
    });
    const kcal = computed(() => {
        let totalKcal = 0;
        foodData.value.forEach((food) => {
            totalKcal += food.food_types.kcal * (food.food_amount / 100);
        });
        return Math.round(totalKcal * 100) / 100;
    });

    return {
        currentDay,
        changeDay,
        fetchData,
        day,
        foodData,
        proteins,
        carbohydrates,
        fats,
        kcal
    };
});
