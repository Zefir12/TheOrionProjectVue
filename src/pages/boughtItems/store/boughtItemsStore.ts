import { defineStore } from "pinia";
import { Tables, TablesInsert } from "@/lib/supabase/supabase/supabaseSchemas/supaDatabaseExtensions";
import { onBeforeMount, ref } from "vue";
import { addItemType } from "@/lib/supabase/services/supabaseBoughtItemsService";
import { useToast } from "primevue/usetoast";
import { supabase } from "@/lib/supabase/supabase/supabase";

export const useBoughtItemsStore = defineStore("BoughtItemsStore", () => {
    const name = ref("");
    const amount = ref(0);
    const tags = ref<string>("");
    const toast = useToast();
    const itemSellers = ref<{ name: string; value: Tables<"item_sellers"> }[]>([]);
    const itemTemplates = ref<{ name: string; value: Tables<"bought_items_types"> }[]>([]);
    const selectedItemSeller = ref<Tables<"item_sellers">[]>([]);
    const purchaseDate = ref(new Date(Date.now()));
    const expirationDate = ref(new Date(Date.now()));

    const purifyTags = (tags: string) => {
        tags = tags.toLowerCase();
        tags.replace(" ", "");
        const tagsArray = tags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag !== "");
        return tagsArray.join(", ");
    };

    onBeforeMount(() => {
        fetchItemSellers();
        fetchItemTemplates();
    });

    const fetchItemSellers = async () => {
        const { data, error } = await supabase.from("item_sellers").select("*").returns<Tables<"item_sellers">[]>();
        if (error) {
            toast.add({ severity: "error", summary: "Error", detail: JSON.stringify(error) });
        } else {
            if (data) {
                itemSellers.value = data.map((item) => ({
                    name: item.name as string,
                    value: item
                }));
            }
        }
    };

    const fetchItemTemplates = async () => {
        const { data, error } = await supabase.from("bought_items_types").select("*").returns<Tables<"bought_items_types">[]>();
        if (error) {
            toast.add({ severity: "error", summary: "Error", detail: JSON.stringify(error) });
        } else {
            if (data) {
                itemTemplates.value = data.map((item) => ({
                    name: item.name as string,
                    value: item
                }));
            }
        }
    };

    const insertItem = async () => {
        const item: TablesInsert<"bought_items_types"> = {
            name: name.value,
            content_amount: amount.value,
            tags: purifyTags(tags.value)
        };
        const { error } = await addItemType(item);
        if (error) {
            toast.add({ severity: "error", summary: "Error", detail: JSON.stringify(error) });
        } else {
            toast.add({ severity: "success", summary: "Succes", detail: "Succesfully added item", life: 3000 });
            clearItem();
        }
    };

    const clearItem = () => {
        name.value = "";
        amount.value = 0;
        tags.value = "";
    };

    return {
        amount,
        name,
        tags,
        itemSellers,
        itemTemplates,
        purchaseDate,
        expirationDate,
        selectedItemSeller,
        insertItem,
        clearItem
    };
});
