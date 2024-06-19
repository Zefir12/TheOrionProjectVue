import { defineStore } from "pinia";
import { TablesInsert } from "@/lib/supabase/supabase/supabaseSchemas/supaDatabaseExtensions";
import { ref } from "vue";
import { supabase } from "@/lib/supabase/supabase/supabase";
import { addItemType } from "@/lib/supabase/services/supabaseBoughtItemsService";

export const useBoughtItemsStore = defineStore("BoughtItemsStore", () => {
    const name = ref("");
    const amount = ref(0);
    const tags = ref<string[]>([]);
    const seller = ref(null);
    const price = ref(0);

    const insertItem = async () => {
        const item: TablesInsert<"bought_items_types"> = {
            name: name.value,
            created_at: new Date(Date.now()).toISOString(),
            content_amount: amount.value,
            price: price.value,
            tags: tags.value.toString(),
            seller_id: seller.value
        };
        await addItemType(item);
        const { error } = await supabase.from("bought_items_types").insert(item);
        if (error) {
            console.log(error);
        }
    };

    return {
        amount,
        name,
        insertItem
    };
});
