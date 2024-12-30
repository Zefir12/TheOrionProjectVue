import { supabase } from "@/lib/supabase/supabase/supabase";
import { Tables } from "@/lib/supabase/supabase/supabaseSchemas/supaDatabase";
import { useQuery } from "@tanstack/vue-query";
import { defineStore } from "pinia";
import { onBeforeMount, ref } from "vue";

const get = async () => {
    const { data } = await supabase.from("food_types").select("*").returns<Tables<"food_types">[]>();
    return data;
};

export const useDictionaryStore = defineStore("DictionaryStore", () => {
    const foodTypes = ref<Tables<"food_types">[]>([]);

    onBeforeMount(async () => {
        const result = useQuery({
            queryKey: ["foodTypes"],
            queryFn: get
        });
        if (result.isSuccess && result.data.value) {
            foodTypes.value = result.data.value;
        }
    });

    return {
        foodTypes
    };
});
