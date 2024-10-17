import { supabase } from "../supabase/supabase";
import { Tables, TablesInsert } from "../supabase/supabaseSchemas/supaDatabase";

export async function getFoodsWithData(startDate: Date, endDate: Date): Promise<{ food_amount: number; time_of_intake: string | null; food_types: Tables<"food_types"> | null }[]> {
    const { error, data } = await supabase
        .from("food")
        .select("food_amount, time_of_intake, food_types(*)")
        .gt("time_of_intake", startDate.toLocaleDateString())
        .lt("time_of_intake", endDate.toLocaleDateString())
        .order("time_of_intake", { ascending: false });
    if (error) {
        console.log(error);
        throw new Error();
    } else {
        return data;
    }
}

export async function getFoods() {
    const { error, data } = await supabase.from("food").select("*").returns<Tables<"food">[]>();
    if (error) {
        console.log(error);
        throw new Error();
    } else {
        return data;
    }
}

export async function addFood(foods: TablesInsert<"food">[]) {
    const { error } = await supabase.from("food").insert(foods);
    if (error) {
        console.log(error);
        throw new Error();
    }
}

export const addFoodCombo = async (combo: TablesInsert<"food_combos">) => {
    const { error } = await supabase.from("food_combos").insert([combo]);
    if (error) {
        console.log(error);
        throw new Error();
    }
};
