import { supabase } from "../supabase/supabase";
import { Tables, TablesInsert } from "../supabase/supabaseSchemas/supaDatabase";

export async function getFoodsWithData(startDate: Date, endDate: Date): Promise<{ food_amount: number; time_of_intake: string | null; food_types: Tables<"food_types"> | null }[]> {
    const { error, data } = await supabase
        .from("food")
        .select("food_amount, time_of_intake, food_types(*)")
        .gte("time_of_intake", startDate.toLocaleDateString())
        .lt("time_of_intake", endDate.toLocaleDateString())
        .order("time_of_intake", { ascending: false });
    if (error) {
        console.log(error);
        throw new Error();
    } else {
        return data;
    }
}

export async function getFoodsForEditDispaly(startDate: Date, endDate: Date): Promise<{ food_amount: number; time_of_intake: string | null; id: number; portion: string | null; food_id: number }[]> {
    const { error, data } = await supabase
        .from("food")
        .select("food_amount, time_of_intake, id, portion, food_id")
        .gte("time_of_intake", startDate.toLocaleDateString())
        .lt("time_of_intake", endDate.toLocaleDateString())
        .order("time_of_intake", { ascending: false });
    if (error) {
        console.log(error);
        throw new Error();
    } else {
        return data;
    }
}

export async function deleteFoodsByIds(ids: number[]) {
    if (ids.length === 0) return;

    const { error } = await supabase.from("food").delete().in("id", ids);

    if (error) {
        console.error("Error deleting foods:", error);
        throw new Error("Failed to delete food items.");
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

export async function updateFood(id: number, updates: Partial<TablesInsert<"food">>) {
    const { error } = await supabase.from("food").update(updates).eq("id", id);
    if (error) {
        console.log(`Error updating food with id ${id}:`, error);
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
