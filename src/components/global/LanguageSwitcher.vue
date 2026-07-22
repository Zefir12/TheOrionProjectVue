<template>
    <div class="language-selector">
        <select v-model="selectedLanguage">
            <option v-for="(language, index) in availableLanguages" :key="index" :value="language">
                {{ language }}
            </option>
        </select>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { i18n, availableLanguages } from "@/lib/localization/i18n";
import { setLanguage } from "@/lib/localStorage/settings";

const selectedLanguage = ref(i18n.locale.value);

watch(selectedLanguage, (newLanguage) => {
    i18n.locale.value = newLanguage;
    setLanguage(newLanguage);
});
</script>

<style scoped>
.language-selector {
    position: relative;
    overflow: hidden;
    width: 40px;
}

select {
    appearance: none;

    width: 40px;
    height: 40px;

    border: 1px solid #0f0f0f;
    border-radius: 4px;
    background: #181818;
    color: #f5f5f5;

    font-size: 14px;
    font-weight: 700;

    cursor: pointer;

    text-align: center;
    text-transform: uppercase;
    transition: 0.15s ease;
}

select:hover {
    background: #222;
}

select:focus {
    outline: none;
}

.language-selector::after {
    content: "";

    position: absolute;
    right: 8px;
    top: 50%;

    transform: translateY(-55%);

    color: #aaa;
    font-size: 12px;

    pointer-events: none;
}
</style>
