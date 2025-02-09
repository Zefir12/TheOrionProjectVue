import { supabase } from "@/lib/supabase/supabase/supabase";
import { Tables } from "@/lib/supabase/supabase/supabaseSchemas/supaDatabase";
import { QueryClient } from "@tanstack/vue-query";
import { defineStore } from "pinia";

export const useDictionaryStore = defineStore("DictionaryStore", () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: Infinity
            }
        }
    });

    const getFoodTypes = async (): Promise<Tables<"food_types">[]> => {
        const result = await queryClient.fetchQuery({ queryKey: ["foodTypes"], queryFn: fetchFoodTypes });
        return result;
    };

    const fetchFoodTypes = async () => {
        const data = await supabase.from("food_types").select("*").returns<Tables<"food_types">[]>();
        return data.data as unknown as Tables<"food_types">[];
    };

    const getMealTypes = async (): Promise<Tables<"food_combos">[]> => {
        const result = await queryClient.fetchQuery({ queryKey: ["mealTypes"], queryFn: fetchMealTypes });
        return result;
    };

    const fetchMealTypes = async () => {
        const data = await supabase.from("food_combos").select("*").returns<Tables<"food_combos">[]>();
        return data.data as unknown as Tables<"food_combos">[];
    };

    return {
        getFoodTypes,
        getMealTypes
    };
});
