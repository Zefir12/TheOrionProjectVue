import { supabase } from "../supabase/supabase";
import { Tables, TablesInsert } from "../supabase/supabaseSchemas/supaDatabase";

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
