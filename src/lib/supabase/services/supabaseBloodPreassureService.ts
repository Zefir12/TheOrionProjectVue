import { supabase } from "../supabase/supabase";
import { Tables } from "../supabase/supabaseSchemas/supaDatabase";

export async function getBloodPreassures() {
    const { error, data } = await supabase.from("bloodpressure").select("*").returns<Tables<"bloodpressure">[]>();
    if (error) {
        console.log(error);
        throw new Error();
    } else {
        return data;
    }
}

export async function getBloodPreassuresBetween(minDate: Date, maxDate: Date) {
    const { error, data } = await supabase
        .from("bloodpressure")
        .select("*")
        .gt("created_at", new Date(minDate).toISOString().slice(0, -1))
        .lt("created_at", new Date(maxDate).toISOString().slice(0, -1))
        .returns<Tables<"bloodpressure">[]>();
    if (error) {
        console.log(error);
        throw new Error();
    } else {
        return data;
    }
}
