<template>
    <a :href="url"> test </a>
    <span>{{ url }}</span>
    <button @click="clearCodes">clear codes</button>
</template>

<script setup lang="ts">
import { getFitbitAuthCodes, clearFitbitAuthCodes } from "@/lib/localStorage/settings";
import fitbitAuthService from "@/lib/services/fitbit/fitbitAuthService";
import { onBeforeMount, ref } from "vue";

const url = ref("");

const setUrl = () => {
    url.value = fitbitAuthService.AuthorizeUrl();
};

const clearCodes = () => {
    clearFitbitAuthCodes();
    url.value = "";
};

onBeforeMount(async () => {
    if (getFitbitAuthCodes() == null) {
        await fitbitAuthService.GenerateAndStoreCodes();
    }
    setUrl();
});
</script>

<style scoped></style>
