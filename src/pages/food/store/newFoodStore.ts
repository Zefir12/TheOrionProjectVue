import { defineStore } from "pinia";
import { ref } from "vue";
import { supabase } from "../../../lib/supabase/supabase/supabase";

import { useToast } from "primevue/usetoast";

interface Serving {
    value: number;
    name: string;
}

export const useNewFoodStore = defineStore("newFoodStore", () => {
    const tost = useToast();

    const fats = ref(0);
    const saturatedFats = ref(0);
    const carbs = ref(0);
    const sugar = ref(0);
    const kcal = ref(0);
    const protein = ref(0);
    const fibre = ref(0);
    const salt = ref(0);

    const tags = ref({
        brand: "",
        flavour: "",
        shop: "",
        type: ""
    });

    const name = ref("");
    const waterPercentage = ref(0);

    const nutriScore = ref(undefined);
    const novaScore = ref(undefined);

    const temporaryServingValue = ref(0);
    const temporaryServingName = ref("");

    const servings = ref([
        { name: "Standard", value: 100 },
        { name: "Gram", value: 1 }
    ] as Serving[]);

    const showSuccess = () => {
        tost.add({ severity: "success", summary: "Succes", detail: "Succesfully added new food", life: 3000 });
    };

    const showError = (error: string) => {
        tost.add({ severity: "error", summary: "Error", detail: error });
    };

    const clear = () => {
        fats.value = 0;
        saturatedFats.value = 0;
        carbs.value = 0;
        sugar.value = 0;
        kcal.value = 0;
        protein.value = 0;
        fibre.value = 0;
        salt.value = 0;
        tags.value = {
            brand: "",
            flavour: "",
            shop: "",
            type: ""
        };
        servings.value = [
            { name: "Standard", value: 100 },
            { name: "Gram", value: 1 }
        ];
        name.value = "";
        waterPercentage.value = 0;
        nutriScore.value = undefined;
        novaScore.value = undefined;
        temporaryServingValue.value = 0;
        temporaryServingName.value = "";
    };

    async function addNewFoodToDatabase() {
        const { error } = await supabase.from("food_types").insert({
            carbs: carbs.value,
            fat: fats.value,
            fat_saturated: saturatedFats.value,
            sugar: sugar.value,
            kcal: kcal.value,
            fibre: fibre.value,
            salt: salt.value,
            protein: protein.value,
            name: name.value,
            servings: JSON.stringify(servings.value),
            water_percentage: waterPercentage.value,
            portion_weigth: 100,
            nova_score: novaScore.value,
            nutri_score: nutriScore.value,
            tags: JSON.stringify(tags.value)
        });
        if (error) {
            showError(JSON.stringify(error));
        } else {
            showSuccess();
            clear();
        }
    }

    function removeServing(serving: Serving) {
        servings.value = servings.value.filter((item) => item !== serving);
    }

    function addNewServing() {
        servings.value.push({ name: temporaryServingName.value, value: temporaryServingValue.value });
    }

    return {
        fats,
        saturatedFats,
        fibre,
        kcal,
        protein,
        sugar,
        carbs,
        salt,
        nutriScore,
        novaScore,
        servings,
        temporaryServingValue,
        temporaryServingName,
        name,
        waterPercentage,
        tags,
        addNewServing,
        removeServing,
        addNewFoodToDatabase
    };
});
