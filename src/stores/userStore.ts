import { getUserDailyTresholds, setUserKcalTreshold, setUserProteinTreshold, setUserWaterTreshold } from "@/lib/supabase/services/supabaseUserService";
import { supabase } from "@/lib/supabase/supabase/supabase";
import { defineStore } from "pinia";
import { onBeforeMount, reactive } from "vue";

export interface UserDailyStats {
    water: number;
    calories: number;
    protein: number;
}

export const useUserStore = defineStore("userStore", () => {
    const userDailyStats = reactive({
        water: 1000,
        calories: 1000,
        protein: 1000
    });

    async function fetchUserDailyStats() {
        const user = await supabase.auth.getUser();
        const stats = await getUserDailyTresholds(user.data.user?.id ?? "");
        userDailyStats.water = stats?.water ?? 3440;
        userDailyStats.calories = stats?.calories ?? 2333;
        userDailyStats.protein = stats?.protein ?? 133;
    }

    onBeforeMount(async () => {
        await fetchUserDailyStats();
    });

    const setWaterTreshold = async (water: number) => {
        const user = await supabase.auth.getUser();
        if (user.data.user) {
            await setUserWaterTreshold(user.data.user.id, water, userDailyStats);
            await fetchUserDailyStats();
        }
    };

    const setKcalTreshold = async (calories: number) => {
        const user = await supabase.auth.getUser();
        if (user.data.user) {
            await setUserKcalTreshold(user.data.user.id, calories, userDailyStats);
            await fetchUserDailyStats();
        }
    };

    const setProteinTreshold = async (protein: number) => {
        const user = await supabase.auth.getUser();
        if (user.data.user) {
            await setUserProteinTreshold(user.data.user.id, protein, userDailyStats);
            await fetchUserDailyStats();
        }
    };

    return { userDailyStats, setWaterTreshold, setKcalTreshold, setProteinTreshold };
});
