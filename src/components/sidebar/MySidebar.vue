<script setup lang="ts">
import { useRouter } from "vue-router";
import { useLoginStore } from "../../pages/login/store/loginStore";
import { useSidebarStore } from "./sidebarStore";
import StyledButton from "../global/StyledButton.vue";
import { IconMenu2 } from "@tabler/icons-vue";
import { i18n } from "@/lib/localization/i18n";
import LanguageSwitcher from "../global/LanguageSwitcher.vue";

const router = useRouter();

const sidebarStore = useSidebarStore();

const loginStore = useLoginStore();

async function logoutUser() {
    await loginStore.logutUser();
}
</script>

<template>
    <div class="sidebar" :class="{ 'sidebar-hidden': !sidebarStore.sidebarVisible }">
        <div class="sidebar-head" :class="{ 'sidebar-head-closed': !sidebarStore.sidebarVisible }">
            <div v-if="sidebarStore.sidebarVisible" class="menu-text">{{ i18n.t("MySidebar.menu").toUpperCase() }}</div>
            <div class="close-sidebar-buton" @click="sidebarStore.toggleVisible()">
                <IconMenu2 size="34" stroke-width="1.25" />
            </div>
        </div>
        <div class="sidebar-content">
            <StyledButton :disabled="!loginStore.userLogged" :name="i18n.t('MySidebar.dashboard')" @click="router.push({ name: 'dashboard' })" />
            <StyledButton :disabled="!loginStore.userLogged" :name="i18n.t('MySidebar.food')" @click="router.push({ name: 'food' })" />
            <StyledButton :disabled="!loginStore.userLogged" :name="i18n.t('MySidebar.weight')" @click="router.push({ name: 'weight' })" />
            <StyledButton :disabled="!loginStore.userLogged" :name="i18n.t('MySidebar.bloodPreassure')" @click="router.push({ name: 'bloodpreassure' })" />
            <StyledButton :disabled="!loginStore.userLogged" :name="i18n.t('MySidebar.foodData')" @click="router.push({ name: 'foodData' })" />
            <StyledButton :disabled="!loginStore.userLogged" :name="i18n.t('MySidebar.boughtItems')" @click="router.push({ name: 'boughtItems' })" />
            <StyledButton :disabled="!loginStore.userLogged" :name="i18n.t('MySidebar.test')" @click="router.push({ name: 'test' })" />
            <LanguageSwitcher class="logout_buton" />
            <StyledButton :disabled="!loginStore.userLogged" :name="i18n.t('MySidebar.logout')" @click="logoutUser" />
        </div>
    </div>
</template>

<style scoped>
.menu-text {
    font-family:
        -apple-system,
        BlinkMacSystemFont,
        Segoe UI,
        Roboto,
        Helvetica,
        Arial,
        sans-serif,
        Apple Color Emoji,
        Segoe UI Emoji;
    color: #c9c9c9;
}

.close-sidebar-buton {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    width: 100%;
    height: 34px;
    overflow: hidden;
    color: rgb(103, 65, 217);
}

.close-sidebar-buton:hover {
    cursor: pointer;
}

.logout_buton {
    margin-top: auto;
}

.sidebar {
    z-index: 1000;
    padding: 10px;
    display: flex;
    flex-direction: column;
    position: fixed;
    left: 0;
    top: 0;
    width: 260px;
    height: 100vh;
    background-color: #1f1c1c;
    transition: 500ms;
}
.sidebar-hidden {
    width: 80px;
}
.sidebar-content {
    display: flex;
    padding: 12px;
    gap: 5px;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
}
.sidebar-head {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-right: 15px;
    padding-left: 15px;
    align-items: center;
    height: 48px;
    font-weight: bold;
}
.sidebar-head-closed {
    flex-direction: row-reverse;
}
</style>
