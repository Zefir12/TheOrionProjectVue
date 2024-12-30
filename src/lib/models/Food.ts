//import { TablesInsert } from "../supabase/supabase/supabaseSchemas/supaDatabase";
//import { Tables } from "../supabase/supabase/supabaseSchemas/supaDatabaseExtensions";

//export type FoodInsertItemCombined = TablesInsert<"food"> & Tables<"food_types">;
export type FoodInsertItemCombined = {
    id: number;
    name: string;
    description: string;
    calories: number;
    protein: number;
    fat: number;
    carbohydrates: number;
    multiplier: number;
    created_at: Date;
    updated_at: Date;
};

export type FoodType = {
    carbs: number;
    created_at: string | null;
    fat: number;
    fat_saturated: number;
    fibre: number;
    id: number;
    kcal: number;
    name: string | null;
    nova_score: number | null;
    nutri_score: number | null;
    portion_weigth: number;
    protein: number;
    prototype: boolean;
    salt: number;
    servings: string | null;
    sugar: number;
    tags: string | null;
    user_id: string | null;
    water_percentage: number;
};

export type MealItem = {
    food: FoodInsertItemCombined;
    food_type: FoodType;
};
