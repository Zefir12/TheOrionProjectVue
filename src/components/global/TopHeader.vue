<template>
    <SettingsModal v-model="settingsOpen" />
    <div class="main">
        <div class="top-layer">
            <h1 @click="router.push({ name: 'dashboard' })" class="no-select" :style="{ marginLeft: '30px', cursor: 'pointer' }">Orion</h1>
            <IconSettingsFilled class="no-select" @click="openSettings" :style="{ marginRight: '30px', cursor: 'pointer' }" size="32" stroke-width="2" />
        </div>
        <div class="bottom-layer">
            <ButtonIcon class="no-select" @click="router.push({ name: 'food' })" :icon="IconMeat" />
            <ButtonIcon class="no-select" @click="router.push({ name: 'activity' })" :icon="IconGymnastics" />
            <ButtonIcon class="no-select" @click="cycleTheme" :icon="IconPalette" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { IconSettingsFilled, IconGymnastics, IconMeat, IconPalette } from "@tabler/icons-vue";
import SettingsModal from "./SettingsModal.vue";
import { ref } from "vue";
import ButtonIcon from "./ButtonIcon.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const settingsOpen = ref(false);

const openSettings = () => {
    settingsOpen.value = true;
};

const themes = ["dark-original", "dark", "light", "communist-red"];
let currentTheme = 0;

const loadTheme = () => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme && themes.includes(savedTheme)) {
        currentTheme = themes.indexOf(savedTheme);
        document.documentElement.setAttribute("data-theme", savedTheme);
    } else {
        document.documentElement.setAttribute("data-theme", themes[currentTheme]);
    }
};

const cycleTheme = () => {
    currentTheme = (currentTheme + 1) % themes.length;

    const theme = themes[currentTheme];

    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);

    document.documentElement.dispatchEvent(new Event("themeChanged"));
};

loadTheme();
</script>
<style scoped>
.main {
    width: 100%;
    height: 70px;
    min-height: 70px;
    display: flex;
    position: relative;
    background-color: var(--color-dark-border);
}

.top-layer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    position: absolute;
    pointer-events: none;
}

.top-layer > * {
    pointer-events: auto; /* Re-enable events for children */
}

.bottom-layer {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;
    height: 100%;
    width: 100%;
}
</style>
