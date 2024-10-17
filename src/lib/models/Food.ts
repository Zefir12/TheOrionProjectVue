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
