import { supabase } from "../supabase/supabase";
import { Tables } from "../supabase/supabaseSchemas/supaDatabase";

export async function getFoods() {
    const { error, data } = await supabase.from("food").select("*").returns<Tables<"food">[]>();
    if (error) {
        console.log(error);
        throw new Error();
    } else {
        return data;
    }
}
