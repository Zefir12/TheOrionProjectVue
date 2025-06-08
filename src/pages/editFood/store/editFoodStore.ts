import { defineStore } from "pinia";
import { onBeforeMount, reactive, ref } from "vue";
import { supabase } from "../../../lib/supabase/supabase/supabase";
import { useToast } from "primevue/usetoast";
import { FoodTypeInfo } from "@/components/food/CreateNewFoodComponent.vue";
import { FoodInsertItemCombined, Serving } from "@/lib/models/Food";
import { ShelfFoodItem } from "@/lib/models/TimeShelfs/TimeShelf";
import { Tables } from "@/lib/supabase/supabase/supabaseSchemas/supaDatabaseExtensions";
import { FoodHelpers } from "@/common/helpers";

export const useEditFoodStore = defineStore("editFoodStore", () => {
    const tost = useToast();
    const id = ref<number | null>(null);
    const foodTypes = ref<(FoodInsertItemCombined & { servings: string })[]>([]);
    const query = ref("");

    onBeforeMount(async () => {
        await fetchFoodTypesData();
    });

    async function fetchFoodTypesData() {
        const { data, error } = await supabase.from("food_types").select("*").returns<Tables<"food_types">[]>();
        if (error) {
            console.log(error);
        } else {
            foodTypes.value = data as unknown as (FoodInsertItemCombined & { servings: string })[];
        }
    }

    function selectItem(item: FoodInsertItemCombined & { servings: string }) {
        const food = { ...item, multiplier: 1, option: { name: "Standard", value: 100 }, food_id: item.id, servings: FoodHelpers.Unstringify(item.servings) } as unknown as ShelfFoodItem;
        loadFoodFromList(food);
    }

    const loadFoodFromList = async (food: ShelfFoodItem) => {
        const { data, error } = await supabase.from("food_types").select("*").eq("id", food.id).single();

        if (error) {
            console.error("Error loading food:", error.message);
            return null;
        }
        id.value = data.id;
        foodModel.fats = data.fat;
        foodModel.saturatedFats = data.fat_saturated;
        foodModel.carbs = data.carbs;
        foodModel.sugar = data.sugar;
        foodModel.kcal = data.kcal;
        foodModel.protein = data.protein;
        foodModel.fibre = data.fibre;
        foodModel.salt = data.salt;
        foodModel.tags = data.tags
            ? JSON.parse(data.tags as string)
            : {
                  brand: "",
                  flavour: "",
                  shop: "",
                  type: ""
              };
        foodModel.servings = data.servings
            ? (JSON.parse(data.servings) as Serving[])
            : [
                  { name: "Standard", value: 100 },
                  { name: "Gram", value: 1 }
              ];
        foodModel.name = data.name as string;
        foodModel.waterPercentage = data.water_percentage;
        foodModel.nutriScore = data.nutri_score ?? undefined;
        foodModel.novaScore = data.nova_score ?? undefined;
    };

    const foodModel = reactive<FoodTypeInfo>({
        name: "",
        kcal: 0,
        carbs: 0,
        fats: 0,
        protein: 0,
        sugar: 0,
        salt: 0,
        fibre: 0,
        saturatedFats: 0,
        waterPercentage: 0,
        tags: {
            brand: "",
            flavour: "",
            shop: "",
            type: ""
        },
        nutriScore: undefined,
        novaScore: undefined,
        servings: [
            { name: "Standard", value: 100 },
            { name: "Gram", value: 1 }
        ],
        id: 0
    });

    const showSuccess = () => {
        tost.add({ severity: "success", summary: "Succes", detail: "Succesfully added new food", life: 3000 });
    };

    const showError = (error: string) => {
        tost.add({ severity: "error", summary: "Error", detail: error });
    };

    const clear = () => {
        id.value = null;
        foodModel.fats = 0;
        foodModel.saturatedFats = 0;
        foodModel.carbs = 0;
        foodModel.sugar = 0;
        foodModel.kcal = 0;
        foodModel.protein = 0;
        foodModel.fibre = 0;
        foodModel.salt = 0;
        foodModel.tags = {
            brand: "",
            flavour: "",
            shop: "",
            type: ""
        };
        foodModel.servings = [
            { name: "Standard", value: 100 },
            { name: "Gram", value: 1 }
        ];
        foodModel.name = "";
        foodModel.waterPercentage = 0;
        foodModel.nutriScore = undefined;
        foodModel.novaScore = undefined;
    };

    async function updateFoodInDatabase() {
        const { error } = await supabase
            .from("food_types")
            .update({
                carbs: foodModel.carbs,
                fat: foodModel.fats,
                fat_saturated: foodModel.saturatedFats,
                sugar: foodModel.sugar,
                kcal: foodModel.kcal,
                fibre: foodModel.fibre,
                salt: foodModel.salt,
                protein: foodModel.protein,
                name: foodModel.name,
                servings: JSON.stringify(foodModel.servings),
                water_percentage: foodModel.waterPercentage,
                portion_weigth: 100,
                nova_score: foodModel.novaScore,
                nutri_score: foodModel.nutriScore,
                tags: JSON.stringify(foodModel.tags)
            })
            .eq("id", id.value as number);

        if (error) {
            showError(JSON.stringify(error));
        } else {
            showSuccess();
            clear();
        }
    }

    async function addNewFoodToDatabase() {
        const { error } = await supabase.from("food_types").insert({
            carbs: foodModel.carbs,
            fat: foodModel.fats,
            fat_saturated: foodModel.saturatedFats,
            sugar: foodModel.sugar,
            kcal: foodModel.kcal,
            fibre: foodModel.fibre,
            salt: foodModel.salt,
            protein: foodModel.protein,
            name: foodModel.name,
            servings: JSON.stringify(foodModel.servings),
            water_percentage: foodModel.waterPercentage,
            portion_weigth: 100,
            nova_score: foodModel.novaScore,
            nutri_score: foodModel.nutriScore,
            tags: JSON.stringify(foodModel.tags)
        });
        if (error) {
            showError(JSON.stringify(error));
        } else {
            showSuccess();
            clear();
        }
    }

    return {
        foodModel,
        addNewFoodToDatabase,
        updateFoodInDatabase,
        foodTypes,
        query,
        selectItem,
        id,
        clear
    };
});
