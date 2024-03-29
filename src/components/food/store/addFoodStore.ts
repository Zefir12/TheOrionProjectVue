import { defineStore } from "pinia";
import { onMounted, watch } from "vue";
import { supabase } from "../../../lib/supabase/supabase/supabase";
import { useToast } from "primevue/usetoast";
import { Tables } from "../../../lib/supabase/supabase/supabaseSchemas/supaDatabase";
import { ref } from "vue";

export const useAddFoodStore = defineStore("addFoodStore", () => {
    const toast = useToast();

    const foodTypes = ref([] as Tables<"food_types">[]);
    const selectedFoodTypes = ref([] as Tables<"food_types">[]);
    const time = ref(new Date(Date.now()));
    const query = ref("");

    function clearFoods() {
        foodTypes.value.push(...selectedFoodTypes.value);
        selectedFoodTypes.value = [];
        sortFoods();
    }

    function sortFoods() {
        if (query.value !== "") {
            foodTypes.value.sort((a, b) => {
                const includesA = a.name?.toLowerCase().includes(query.value.toLowerCase());
                const includesB = b.name?.toLowerCase().includes(query.value.toLowerCase());

                // Sort based on whether the substring is included
                if (includesA && !includesB) return -1;
                if (!includesA && includesB) return 1;
                return 0; // If both include or both don't include, maintain the order
            });
        } else {
            foodTypes.value.sort((a, b) => a.id - b.id);
        }
    }

    watch(query, () => {
        sortFoods();
    });

    function selectItem(item: Tables<"food_types">) {
        const index = foodTypes.value.findIndex((i) => i === item);
        if (index !== -1) {
            const removedItem = foodTypes.value.splice(index, 1)[0];
            selectedFoodTypes.value.push(removedItem);
        }
    }

    function deselectItem(item: Tables<"food_types">) {
        const index = selectedFoodTypes.value.findIndex((i) => i === item);
        if (index !== -1) {
            const removedItem = selectedFoodTypes.value.splice(index, 1)[0];
            foodTypes.value.push(removedItem);
            sortFoods();
        }
    }

    onMounted(async () => {
        const { data, error } = await supabase.from("food_types").select("*").returns<Tables<"food_types">[]>();

        if (error) {
            toast.add({ severity: "error", summary: "Error", detail: JSON.stringify(error) });
        } else {
            foodTypes.value = data;
            sortFoods();
        }
    });

    return { foodTypes, selectedFoodTypes, time, query, selectItem, deselectItem, clearFoods };
});
