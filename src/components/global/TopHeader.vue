<template>
    <SettingsModal v-model="settingsOpen" />
    <div class="main">
        <h1 :style="{ marginLeft: '30px' }">Orion</h1>
        <IconSettingsFilled @click="openSettings" :style="{ marginRight: '30px', cursor: 'pointer' }" size="32" stroke-width="2" />
    </div>
</template>

<script setup lang="ts">
import { IconSettingsFilled } from "@tabler/icons-vue";
import SettingsModal from "./SettingsModal.vue";
import { ref } from "vue";

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
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: #1f1c1c;
}
</style>
