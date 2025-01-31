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

    const getFoodTypes = async () => {
        const result = await queryClient.fetchQuery({ queryKey: ["foodTypes"], queryFn: fetchFoodTypes });
        return result;
    };

    const fetchFoodTypes = async () => {
        const data = await supabase.from("food_types").select("*").returns<Tables<"food_types">[]>();
        return data.data as unknown as Tables<"food_types">[];
    };

    return {
        getFoodTypes
    };
});
