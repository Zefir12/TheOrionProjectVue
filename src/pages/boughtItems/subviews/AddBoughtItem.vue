<template>
    <div class="container">
        <Stack class="column" align="stretch">
            <Card>
                <template #content></template>
            </Card>
        </Stack>
        <Stack class="column" align="stretch">
            <DatePicker :label="i18n.t('AddBoughtItem.purchaseDate')" v-model="boughtStore.purchaseDate" />
            <Select :label="i18n.t('AddBoughtItem.selectSeller')" :options="boughtStore.itemSellers" v-model="boughtStore.selectedItemSeller" />
            <Card class="card">
                <template #title>{{ i18n.t("AddBoughtItem.newItem") }}</template>
                <template #content>
                    <Stack gap="0.5rem">
                        <Select :label="i18n.t('AddBoughtItem.selectTemplate')" :options="boughtStore.itemTemplates" />
                        <StyledNumberInput :label="i18n.t('AddBoughtItem.price')" />
                        <DatePicker :label="i18n.t('AddBoughtItem.expirationDate')" v-model="boughtStore.expirationDate" />
                        <StyledButton :name="i18n.t('common.add')" />
                    </Stack>
                </template>
            </Card>
        </Stack>
        <Stack class="column" align="stretch">
            <Card>
                <template #content></template>
            </Card>
        </Stack>
    </div>
</template>
<script setup lang="ts">
import Select from "@/components/global/Select.vue";
import Card from "primevue/card";
import { i18n } from "@/lib/localization/i18n";
import StyledNumberInput from "@/components/global/StyledNumberInput.vue";
import Stack from "@/components/global/containers/Stack.vue";
import DatePicker from "@/components/global/DatePicker.vue";
import StyledButton from "@/components/global/StyledButton.vue";
import { useBoughtItemsStore } from "../store/boughtItemsStore";

const boughtStore = useBoughtItemsStore();
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    height: 100%;
    gap: 10px;
}

.card {
    height: 400px;
}

.column {
    width: 300px;
}
</style>
