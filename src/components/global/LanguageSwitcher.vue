<template>
    <select v-model="selectedLanguage">
        <option v-for="(language, index) in availableLanguages" :key="index" :value="language">{{ language }}</option>
    </select>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { availableLanguages } from "@/lib/localization/i18n";

const { locale } = useI18n();
const selectedLanguage = ref(locale.value);

watch(selectedLanguage, (newLanguage) => {
    locale.value = newLanguage;
});
</script>
