<template>
    <Stack>
        <StyledNumberInput />
        <span>{{ i18n.t("common.test") }}</span>
        <span>pog</span>
        <span>pog</span>
    </Stack>
</template>

<script setup lang="ts">
//import { useBoughtItemsStore } from "./store/boughtItemsStore";
import Stack from "@/components/global/containers/Stack.vue";
import StyledNumberInput from "@/components/global/StyledNumberInput.vue";
import { i18n } from "@/lib/localization/i18n";

//const boughtItemsStore = useBoughtItemsStore();
</script>
