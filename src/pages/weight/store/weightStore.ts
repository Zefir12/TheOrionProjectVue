import { defineStore } from "pinia";
import { ref } from "vue";
import { addNewWeightToDb } from "../../../lib/supabase/services/supabaseWeightService";
import { useToast } from "primevue/usetoast";

export const useWeightStore = defineStore("weightStore", () => {
    const toast = useToast();
    const weightToAdd = ref(70.1);

    async function addNewWeight() {
        await addNewWeightToDb(weightToAdd.value);
        toast.add({ severity: "success", summary: "Succes", detail: "Succesfully added new weight", life: 3000 });
    }

    return { weightToAdd, addNewWeight };
});
