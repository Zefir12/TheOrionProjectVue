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

export async function addNewWeightToDb(weight: number, date: Date) {
    const { error } = await supabase.from("weight").insert({
        weight: weight,
        created_at: date.toISOString().slice(0, -1)
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

export async function getWeightForSevenDaysWithAnchor() {
    const today = new Date();
    today.setHours(23, 59, 59, 999); // End of today

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setHours(0, 0, 0, 0); // Start of today
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 13); // 6 days back (inclusive today)

    // Get weights in the 7-day range
    const { data: recentWeights, error: recentError } = await supabase
        .from("weight")
        .select("*")
        .gte("created_at", sevenDaysAgo.toISOString())
        .lte("created_at", today.toISOString())
        .order("created_at", { ascending: false })
        .returns<Tables<"weight">[]>();

    if (recentError) {
        console.error("Error fetching recent weights:", recentError);
        return [];
    }

    // Get ONE latest weight before the 7-day window
    const { data: anchorWeight, error: anchorError } = await supabase
        .from("weight")
        .select("*")
        .lt("created_at", sevenDaysAgo.toISOString())
        .order("created_at", { ascending: false })
        .limit(1)
        .returns<Tables<"weight">[]>();

    if (anchorError) {
        console.error("Error fetching anchor weight:", anchorError);
        return recentWeights; // fallback to recentWeights only
    }

    // Combine anchorWeight (if exists) with recentWeights
    const combinedWeights = recentWeights.concat(anchorWeight);

    return combinedWeights;
}
