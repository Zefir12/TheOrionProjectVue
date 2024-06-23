import { supabase } from "../supabase/supabase";
import { TablesInsert } from "../supabase/supabaseSchemas/supaDatabase";

export async function getItems() {
    throw new Error("not implemented");
}

export async function addItemType(item: TablesInsert<"bought_items_types">) {
    return await supabase.from("bought_items_types").insert(item);
}
