import { supabase } from "../supabase/supabase";
import { TablesInsert } from "../supabase/supabaseSchemas/supaDatabase";

export async function getActiveActivities(user_id: string) {
    const { data, error } = await supabase.from("activity").select("*").eq("user_id", user_id).eq("active", true);
    if (error) {
        throw error;
    }
    return data;
}

export async function createActivity(item: TablesInsert<"activity">) {
    return await supabase.from("activity").insert(item);
}

export async function finishActivity(id: number, date: Date) {
    return await supabase.from("activity").update({ finished_at: date.toUTCString(), active: false }).eq("id", id);
}

export async function getExercisesForActivity(activity_id: number) {
    const { data, error } = await supabase
        .from("gym_exercises")
        .select("*, gym_exercise_sets(*)")
        .eq("activity_id", activity_id)
        .order("created_at", { ascending: true })
        .order("set_number", { referencedTable: "gym_exercise_sets", ascending: true });
    if (error) {
        throw error;
    }
    return data;
}

export async function addSetToExercise(exercise_id: number, reps: number, rir: number | null, weight: number, is_warmup: boolean, set_number: number, exercise_type_id: number) {
    return await supabase.from("gym_exercise_sets").insert({ exercise_id, rir, reps, weight, is_warmup, set_number, exercise_type_id });
}

export async function addExerciseToActivity(exercise_type_id: number, activity_id: number) {
    return await supabase.from("gym_exercises").insert({ exercise_type_id, activity_id });
}

export async function getGymExercises() {
    const { data, error } = await supabase.from("gym_exercise_types").select("*");
    if (error) {
        throw error;
    }
    return data;
}
