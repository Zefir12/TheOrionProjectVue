<template>
    <SettingsModal v-model="settingsOpen" />
    <div class="main">
        <div class="top-layer">
            <h1 @click="router.push({ name: 'dashboard' })" :style="{ marginLeft: '30px', cursor: 'pointer' }">Orion</h1>
            <IconSettingsFilled @click="openSettings" :style="{ marginRight: '30px', cursor: 'pointer' }" size="32" stroke-width="2" />
        </div>
        <div class="bottom-layer">
            <ButtonIcon @click="router.push({ name: 'food' })" :icon="IconMeat" />
            <ButtonIcon @click="router.push({ name: 'activity' })" :icon="IconGymnastics" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { IconSettingsFilled, IconGymnastics, IconMeat } from "@tabler/icons-vue";
import SettingsModal from "./SettingsModal.vue";
import { ref } from "vue";
import ButtonIcon from "./ButtonIcon.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const settingsOpen = ref(false);

const openSettings = () => {
    settingsOpen.value = true;
};
</script>

<style scoped>
.main {
    width: 100%;
    height: 70px;
    display: flex;
    position: relative;
    background-color: #1f1c1c;
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
