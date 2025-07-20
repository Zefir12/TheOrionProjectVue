import { finishActivity, getActiveActivities, getGymExercises, GymExerciseWithSets } from "@/lib/supabase/services/supabaseActivityService.ts";
import { defineStore } from "pinia";
import { GetUser } from "@/common/helpers";
import { ref } from "vue";
import { Tables } from "@/lib/supabase/supabase/supabaseSchemas/supaDatabaseExtensions";

export const useActivityStore = defineStore("ActivityStore", () => {
    const activities = ref<Tables<"activity">[]>();
    const gymExerciseTypes = ref<Tables<"gym_exercise_types">[] | null>(null);
    const currentSession = ref<Tables<"activity"> | null>();
    const currentExercise = ref<GymExerciseWithSets | null>();
    const currentSet = ref<Tables<"gym_exercise_sets"> | null>();

    const setCurrentSession = (id: number) => {
        currentSession.value = activities.value?.find((x) => x.id == id);
    };

    const finishCurrentSession = async (date: Date) => {
        await finishActivity(currentSession.value?.id as number, date);
    };

    const fetchActivities = async () => {
        const result = await getActiveActivities((await GetUser()).id);
        activities.value = result;
    };

    const fetchGymExercises = async () => {
        const result = await getGymExercises();
        gymExerciseTypes.value = result;
    };

    const FetchData = async () => {
        await fetchActivities();
        await fetchGymExercises();
    };

    const RefreshData = async () => {
        await FetchData();
    };

    const GetExerciseNameById = (id: number): string => {
        return gymExerciseTypes.value?.find((x) => x.id == id)?.name ?? "";
    };

    return { RefreshData, GetExerciseNameById, activities, currentSession, gymExerciseTypes, FetchData, setCurrentSession, finishCurrentSession, currentExercise, currentSet };
});
