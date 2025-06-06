<template>
    <DataTable
        v-model:filters="filters"
        :value="foodTypes"
        removableSort
        paginator
        :showGridlines="false"
        :rows="18"
        dataKey="id"
        filterDisplay="menu"
        :loading="loading"
        :globalFilterFields="['name', 'created_at']"
    >
        <!--         stateStorage="session"
        stateKey="dt-primevue-food-types" -->
        <template #header>
            <div class="header">
                <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined @click="clearFilter()" />

                <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
            </div>
        </template>
        <template #empty> No items found. </template>
        <template #loading> Loading item data. Please wait. </template>
        <Column field="name" sortable header="Name" style="width: 100%">
            <template #body="{ data }">
                {{ data.name }}
            </template>
            <template #filter="{ filterModel }">
                <InputText v-model="filterModel.value" type="text" placeholder="Search by name" />
            </template>
        </Column>
        <Column field="kcal" sortable header="kcal" dataType="numeric" style="min-width: 6rem">
            <template #body="{ data }">
                {{ data.kcal }}
            </template>
            <template #filter="{ filterModel }">
                <InputText v-model="filterModel.value" type="number" placeholder="Search by name" />
            </template>
        </Column>
        <Column field="protein" sortable header="protein" dataType="numeric" style="min-width: 6rem">
            <template #body="{ data }">
                {{ data.protein }}
            </template>
            <template #filter="{ filterModel }">
                <InputText v-model="filterModel.value" type="number" placeholder="Search by name" />
            </template>
        </Column>
        <Column field="fat" header="fat" sortable dataType="numeric" style="min-width: 6rem">
            <template #body="{ data }">
                {{ data.fat }}
            </template>
            <template #filter="{ filterModel }">
                <InputText v-model="filterModel.value" type="number" placeholder="Search by name" />
            </template>
        </Column>
        <Column field="carbs" sortable header="carbs" dataType="numeric" style="min-width: 6rem">
            <template #body="{ data }">
                {{ data.carbs }}
            </template>
            <template #filter="{ filterModel }">
                <InputText v-model="filterModel.value" type="number" placeholder="Search by name" />
            </template>
        </Column>
        <Column field="Date created" sortable sortField="created_at" header="date" dataType="date" style="min-width: 8rem">
            <template #body="{ data }">
                {{ formatDate(data.date) }}
            </template>
            <!-- <template #filter="{ filterModel }">
                <InputText v-model="filterModel.value" type="date" placeholder="Search by name" />
            </template> -->
        </Column>
        <Column field="portion_weigth" sortable header="Portion grams" dataType="numeric" style="min-width: 6rem">
            <template #body="{ data }">
                {{ data.portion_weigth }}
            </template>
            <template #filter="{ filterModel }">
                <Slider v-model="filterModel.value" :max="2000" range class="m-4"></Slider>
                <div class="slider">
                    <span>{{ filterModel.value ? filterModel.value[0] : 0 }}</span>
                    <span>{{ filterModel.value ? filterModel.value[1] : 2000 }}</span>
                </div>
            </template>
        </Column>
    </DataTable>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { FilterMatchMode, FilterOperator } from "@primevue/core/api";
import { Tables } from "@/lib/supabase/supabase/supabaseSchemas/supaDatabase";
import { supabase } from "@/lib/supabase/supabase/supabase";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Slider from "primevue/slider";
import DatePicker from "@/components/global/DatePicker.vue";

const foodTypes = ref<any[]>();
const filters = ref();
const loading = ref(true);

onMounted(async () => {
    const { data } = await supabase.from("food_types").select("*");
    foodTypes.value = changeDates(data as unknown as (Tables<"food_types"> & { date: Date | null })[]);
    loading.value = false;
});

const initFilters = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        protein: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.GREATER_THAN }] },
        kcal: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.GREATER_THAN }] },
        fat: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.GREATER_THAN }] },
        carbs: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.GREATER_THAN }] },
        date: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
        portion_weigth: { value: [0, 2000], matchMode: FilterMatchMode.BETWEEN }
    };
};
initFilters();

const formatDate = (value: { toLocaleDateString: (arg0: string, arg1: { day: string; month: string; year: string }) => any }) => {
    return value.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    });
};

const changeDates = (data: (Tables<"food_types"> & { date: Date | null })[]): (Tables<"food_types"> & { date: Date | null })[] => {
    return [...(data || [])].map((d) => {
        d.date = d.created_at !== null ? new Date(d.created_at) : null;
        return d;
    });
};

const clearFilter = () => {
    initFilters();
};
</script>

<style scoped>
.header {
    display: flex;
    justify-content: space-between;
}
.slider {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
}
</style>
