import { supabase } from "../supabase/supabase";
import { Tables } from "../supabase/supabaseSchemas/supaDatabase";

export async function getAllWeight() {
    const { data, error } = await supabase.from("weight").select("*").order("created_at", { ascending: false }).returns<Tables<"weight">[]>();
    if (error) {
        console.log(error);
    } else {
        return data;
    }
}

export async function addNewWeightToDb(weight: number) {
    const { error } = await supabase.from("weight").insert({
        weight: weight,
    });
    if (error) console.log(error);
}

export async function getAllWeightBetween(minDate: Date, maxDate: Date) {
    const { data, error } = await supabase
        .from("weight")
        .select("*")
        .gt("created_at", new Date(minDate).toISOString().slice(0, -1))
        .lt("created_at", new Date(maxDate).toISOString().slice(0, -1))
        .order("created_at", { ascending: false })
        .returns<Tables<"weight">[]>();
    if (error) {
        console.log(error);
    } else {
        return data;
    }
}
