import { defineStore } from "pinia";
import { computed, onMounted, watch } from "vue";
import { supabase } from "../../../lib/supabase/supabase/supabase";
import { useToast } from "primevue/usetoast";
import { Tables, TablesInsert } from "../../../lib/supabase/supabase/supabaseSchemas/supaDatabase";
import { ref } from "vue";
import { addFood } from "@/lib/supabase/services/supabaseFoodService";
export type FoodInsertItemCombined = TablesInsert<"food"> & Tables<"food_types">;

export const useAddFoodStore = defineStore("addFoodStore", () => {
    const toast = useToast();

    const foodTypes = ref([] as FoodInsertItemCombined[]);
    const selectedFoodTypes = ref([] as FoodInsertItemCombined[]);
    const time = ref(new Date(Date.now()));
    const query = ref("");

    function clearFoods() {
        foodTypes.value.push(...selectedFoodTypes.value);
        selectedFoodTypes.value = [];
        sortFoods();
    }

    const combinedVariables = computed(() => {
        return `${time.value}_${selectedFoodTypes.value.length}`;
    });

    watch(
        combinedVariables,
        () => {
            selectedFoodTypes.value.forEach((item) => {
                item.time_of_intake = time.value.toISOString();
            });
        },
        { immediate: true }
    );

    async function addToDatabase() {
        const foodsToAdd = [] as TablesInsert<"food">[];
        selectedFoodTypes.value.forEach((item) => {
            foodsToAdd.push({
                food_amount: item.food_amount,
                food_id: item.id,
                time_of_intake: item.time_of_intake
            });
        });
        await addFood(foodsToAdd);
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
            foodTypes.value = data as FoodInsertItemCombined[];
            sortFoods();
        }
    });

    return { foodTypes, selectedFoodTypes, time, query, selectItem, deselectItem, clearFoods, addToDatabase };
});
