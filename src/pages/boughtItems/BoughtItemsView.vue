<template>
    <Stack>
        <StyledNumberInput />
        <span>pog</span>
        <span>pog</span>
        <span>pog</span>
    </Stack>
</template>
<script setup lang="ts">
import { useBoughtItemsStore } from "./store/boughtItemsStore";
import Stack from "@/components/global/containers/Stack.vue";
import StyledNumberInput from "@/components/global/StyledNumberInput.vue";
import { ref } from "vue";

const boughtItemsStore = useBoughtItemsStore();
</script>
