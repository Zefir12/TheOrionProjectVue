import { UserDailyStats } from "@/stores/userStore";
import { supabase } from "../supabase/supabase";
import { Json } from "@/lib/types/json";

export async function getUserDailyTresholds(user_id: string): Promise<UserDailyStats | null> {
    const { error, data } = await supabase.from("user_settings").select("daily_tresholds").eq("user_id", user_id);

    if (error) {
        console.log(error);
        throw new Error();
    } else {
        if (data.length === 0) {
            const daily_tresholds = {
                water: 3440,
                calories: 2333,
                protein: 133
            };
            setUserDailyTresholds(user_id, {
                daily_tresholds
            });

            return null;
        }
        return data[0].daily_tresholds as unknown as UserDailyStats;
    }
}

export async function setUserWaterTreshold(user_id: string, water: number, daily_tresholds: UserDailyStats) {
    const newTresholds = { water, calories: daily_tresholds.calories, protein: daily_tresholds.protein } as UserDailyStats;
    const { error } = await supabase
        .from("user_settings")
        .update({
            user_id,
            daily_tresholds: newTresholds as unknown as Json
        })
        .eq("user_id", user_id);
    if (error) {
        console.log(error);
        throw new Error();
    }
}

export async function setUserKcalTreshold(user_id: string, calories: number, daily_tresholds: UserDailyStats) {
    const newTresholds = { water: daily_tresholds.water, calories, protein: daily_tresholds.protein } as UserDailyStats;
    const { error } = await supabase
        .from("user_settings")
        .update({
            user_id,
            daily_tresholds: newTresholds as unknown as Json
        })
        .eq("user_id", user_id);
    if (error) {
        console.log(error);
        throw new Error();
    }
}

export async function setUserProteinTreshold(user_id: string, protein: number, daily_tresholds: UserDailyStats) {
    const newTresholds = { water: daily_tresholds.water, calories: daily_tresholds.calories, protein } as UserDailyStats;
    const { error } = await supabase
        .from("user_settings")
        .update({
            user_id,
            daily_tresholds: newTresholds as unknown as Json
        })
        .eq("user_id", user_id);
    if (error) {
        console.log(error);
        throw new Error();
    }
}

export async function setUserDailyTresholds(user_id: string, dailyTresholds: { daily_tresholds: UserDailyStats }) {
    const { error } = await supabase
        .from("user_settings")
        .upsert({
            user_id,
            daily_tresholds: dailyTresholds.daily_tresholds as unknown as Json
        })
        .eq("user_id", user_id);
    if (error) {
        console.log(error);
        throw new Error();
    }
}
