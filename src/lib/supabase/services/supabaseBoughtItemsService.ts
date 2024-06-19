import { supabase } from "../supabase/supabase";
import { Tables, TablesInsert } from "../supabase/supabaseSchemas/supaDatabase";

export async function getItems() {
    throw new Error("not implemented");
}

export async function addItemType(item: TablesInsert<"bought_items_types">) {
    const { error } = await supabase.from("bought_items_types").insert(item);
    if (error) {
        console.log(error);
        throw new Error();
    }
}
