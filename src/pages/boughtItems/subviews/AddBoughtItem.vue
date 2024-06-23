<template>
    <div class="container">
        <Card class="card">
            <template #content>
                <Stack>
                    <Select :label="i18n.t('AddBoughtItem.selectSeller')" :width="'200px'" :options="[{ name: 'seller', value: 'seller' }]" />
                    <Select :label="i18n.t('AddBoughtItem.selectTemplate')" :width="'200px'" :options="[]" />
                    <StyledNumberInput :label="i18n.t('AddBoughtItem.price')" />
                    <DatePicker :label="i18n.t('AddBoughtItem.expirationDate')" />
                    <DatePicker :label="i18n.t('AddBoughtItem.purchaseDate')" />
                </Stack>
            </template>
        </Card>
    </div>
</template>
<script setup lang="ts">
import Select from "@/components/global/Select.vue";
import Card from "primevue/card";
import { i18n } from "@/lib/localization/i18n";
import StyledNumberInput from "@/components/global/StyledNumberInput.vue";
import Stack from "@/components/global/containers/Stack.vue";
import DatePicker from "@/components/global/DatePicker.vue";
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    height: 100%;
}

.card {
    width: 300px;
    height: 400px;
}
</style>
