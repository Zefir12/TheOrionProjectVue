import { defineStore } from "pinia";
import { TablesInsert } from "@/lib/supabase/supabase/supabaseSchemas/supaDatabaseExtensions";
import { ref } from "vue";
import { addItemType } from "@/lib/supabase/services/supabaseBoughtItemsService";
import { useToast } from "primevue/usetoast";

export const useBoughtItemsStore = defineStore("BoughtItemsStore", () => {
    const name = ref("");
    const amount = ref(0);
    const tags = ref<string>("");
    const toast = useToast();

    const purifyTags = (tags: string) => {
        tags = tags.toLowerCase();
        tags.replace(" ", "");
        const tagsArray = tags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag !== "");
        return tagsArray.join(", ");
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
        insertItem,
        clearItem
    };
});
