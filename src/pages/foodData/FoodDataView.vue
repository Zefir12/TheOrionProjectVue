<template>
    <div class="container">
        <div class="data-table-container">
            <!-- <DataTable :headers="headers" :items="items">
                <template #protein="prop">
                    <div class="item-div">{{ prop.slotItem }}</div>
                </template>
                <template #name="prop">
                    <a class="url" @click="console.log(prop.slotItem)">{{ prop.slotItem }}</a>
                </template>
            </DataTable> -->
            <FoodDataTable />
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { supabase } from "../../lib/supabase/supabase/supabase";
import { Tables } from "../../lib/supabase/supabase/supabaseSchemas/supaDatabase";
import FoodDataTable from "./subviews/FoodDataTable.vue";

// const headers = [
//     { key: "id", name: "Id" },
//     { key: "name", name: "Name" },
//     { key: "carbs", name: "Carbs" },
//     { key: "protein", name: "Proteins" },
//     { key: "portion_weigth", name: "Portion Weigth" },
//     { key: "kcal", name: "Kcals" }
// ];
const items = ref([] as Tables<"food_types">[]);

onMounted(async () => {
    const { data, error } = await supabase.from("food_types").select("*").order("portion_weigth", { ascending: false }).returns<Tables<"food_types">[]>();
    if (error) {
        console.log(error);
    }
    data?.forEach((item) => {
        items.value.push(item);
    });
});
</script>

<style scoped>
.container {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
.data-table-container {
    width: 80%;
    height: 80%;
    /* overflow: scroll; */
    overflow-y: auto;
}

.item-div {
    height: 40px;
    width: 100%;
    padding: 10px;
    /* background-color: rgba(0, 0, 0, 0.205); */
}

.url {
    cursor: pointer;
    font-weight: 500;
    color: rgba(169, 103, 255, 0.562);
}
</style>
