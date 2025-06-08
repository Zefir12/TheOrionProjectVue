import { defineStore } from "pinia";
import { FoodInsertItemCombined } from "@/lib/models/Food";
import { supabase } from "@/lib/supabase/supabase/supabase";
import { ref } from "vue";
import { onBeforeMount } from "vue";
import { watch } from "vue";
import { Tables, TablesInsert } from "@/lib/supabase/supabase/supabaseSchemas/supaDatabaseExtensions";
import { ShelfFoodItem } from "@/lib/models/TimeShelfs/TimeShelf";
import { addFoodCombo } from "@/lib/supabase/services/supabaseFoodService";
import { useToast } from "primevue/usetoast";
import { Serving } from "@/lib/models/Food";

export const useCreateFoodComboStore = defineStore("createFoodComboStore", () => {
    const query = ref("");
    const name = ref("");
    const toast = useToast();
    const foodTypes = ref<(FoodInsertItemCombined & { servings: string })[]>([]);
    const selectedFoodItems = ref<ShelfFoodItem[]>([]);

    onBeforeMount(async () => {
        await fetchFoodTypesData();
    });

    async function fetchFoodTypesData() {
        const { data, error } = await supabase.from("food_types").select("*").returns<Tables<"food_types">[]>();

        if (error) {
            console.log(error);
        } else {
            foodTypes.value = data as unknown as (FoodInsertItemCombined & { servings: string })[];
            sortFoods();
        }
    }

    watch(query, () => {
        sortFoods();
    });

    function clearFoods() {
        selectedFoodItems.value = [];
    }

    const showSuccess = () => {
        toast.add({ severity: "success", summary: "Succes", detail: "Succesfully added food", life: 3000 });
    };

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

    async function addToDatabase() {
        if (selectedFoodItems.value.length != 0) {
            const item = {
                name: name.value,
                content: selectedFoodItems.value.map((item) => ({ id: item.id, amount: item.multiplier, option: item.option }))
            } as TablesInsert<"food_combos">;
            await addFoodCombo(item);
            clearFoods();
            showSuccess();
        }
    }

    const checkForAlreadyAdded = (id: number) => {
        return selectedFoodItems.value.some((i) => i.id == id);
    };

    function unstringify(data: string | null): Serving[] {
        if (data) {
            return JSON.parse(data);
        }
        return [
            { name: "Standard", value: 100 },
            { name: "Gram", value: 1 }
        ];
    }

    function selectItem(item: FoodInsertItemCombined & { servings: string }) {
        const food = { ...item, multiplier: 1, option: { name: "Standard", value: 100 }, food_id: item.id, servings: unstringify(item.servings) } as unknown as ShelfFoodItem;
        selectedFoodItems.value.push(food);
    }

    function deselectItem(item: ShelfFoodItem) {
        const index = selectedFoodItems.value.findIndex((i) => i.id === item.id);
        if (index != -1) {
            selectedFoodItems.value.splice(index, 1);
        }
    }

    return {
        query,
        foodTypes,
        name,
        selectItem,
        deselectItem,
        addToDatabase,
        checkForAlreadyAdded,
        selectedFoodItems
    };
});
