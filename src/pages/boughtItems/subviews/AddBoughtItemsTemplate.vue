<template>
    <Stack>
        <StyledNumberInput :label="i18n.t('BoughtItemsView.amount')" v-model="boughtItemsStore.amount" />
        <CardInput :label="i18n.t('common.name')" v-model="boughtItemsStore.name" />
        <CardInput :label="i18n.t('common.tags')" v-model="boughtItemsStore.tags" />
        <StyledButton @click="boughtItemsStore.insertItem" :name="i18n.t('common.submit')" :width="'auto'" />
    </Stack>
</template>

<script setup lang="ts">
import { useBoughtItemsStore } from "../store/boughtItemsStore";
import Stack from "@/components/global/containers/Stack.vue";
import StyledNumberInput from "@/components/global/StyledNumberInput.vue";
import { i18n } from "@/lib/localization/i18n";
import CardInput from "@/components/food/CardInput.vue";
import StyledButton from "@/components/global/StyledButton.vue";

const boughtItemsStore = useBoughtItemsStore();
</script>
