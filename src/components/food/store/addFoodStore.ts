import { defineStore } from "pinia";
import { onMounted } from "vue";
import { supabase } from "../../../lib/supabase/supabase/supabase";
import { useToast } from "primevue/usetoast";
import { Tables } from "../../../lib/supabase/supabase/supabaseSchemas/supaDatabase";
import { ref } from "vue";

export const useAddFoodStore = defineStore("addFoodStore", () => {
    const toast = useToast();

    const foodTypes = ref([] as Tables<"food_types">[]);
    const selectedFoodTypes = ref([] as Tables<"food_types">[]);

    function selectItem(item: Tables<"food_types">) {
        const index = foodTypes.value.findIndex(i => i === item);
        if (index !== -1) {
            const removedItem = foodTypes.value.splice(index, 1)[0];
            selectedFoodTypes.value.push(removedItem);
        }
    }

    function deselectItem(item: Tables<"food_types">) {
        const index = selectedFoodTypes.value.findIndex(i => i === item);
        if (index !== -1) {
            const removedItem = selectedFoodTypes.value.splice(index, 1)[0];
            foodTypes.value.push(removedItem);
        }
    }


    onMounted(async () => {
        const { data, error } = await supabase.from("food_types").select("*").returns<Tables<"food_types">[]>();

        if (error) {
            toast.add({ severity: "error", summary: "Error", detail: JSON.stringify(error) });
        } else {
            foodTypes.value = data;
        }
    });

    return { foodTypes, selectedFoodTypes, selectItem, deselectItem };
});
