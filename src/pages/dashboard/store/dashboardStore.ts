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
    const currentDay = ref(1);
    const foodData = ref([] as FoodItem[]);
    const day = ref(getMidnight(getTodayWithOffset(currentDay.value)));

    const fetchData = async () => {
        const baseDate = new Date(day.value); // e.g., 2025-06-19

        // Start at 00:00 UTC of the today
        const startDate = new Date(Date.UTC(baseDate.getUTCFullYear(), baseDate.getUTCMonth(), baseDate.getUTCDate() - 1, 24, 0, 0, 0));

        // End at 0:00 UTC of the next day day
        const endDate = new Date(Date.UTC(baseDate.getUTCFullYear(), baseDate.getUTCMonth(), baseDate.getUTCDate(), 24, 0, 0, 0));

        const data = await getFoodsWithData(startDate, endDate);
        foodData.value = data as FoodItem[];
    };

    const computedFoodsEatenToday = computed(() => {
        const totalsMap = new Map();

        foodData.value.forEach((item) => {
            const id = item.food_types.id;

            if (totalsMap.has(id)) {
                totalsMap.get(id).food_amount += item.food_amount;
            } else {
                totalsMap.set(id, { ...item });
            }
        });

        return Array.from(totalsMap.values());
    });

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

    const water = computed(() => {
        let total = 0;
        foodData.value.forEach((food) => {
            total += food.food_types.water_percentage * (food.food_amount / 100);
        });
        return Math.round(total * 100) / 100;
    });

    const fibre = computed(() => {
        let total = 0;
        foodData.value.forEach((food) => {
            total += food.food_types.fibre * (food.food_amount / 100);
        });
        return Math.round(total * 100) / 100;
    });

    const refreshDashboard = async () => {
        await fetchData();
    };

    return {
        currentDay,
        changeDay,
        fetchData,
        refreshDashboard,
        day,
        foodData,
        proteins,
        carbohydrates,
        fats,
        kcal,
        water,
        fibre,
        computedFoodsEatenToday
    };
});
