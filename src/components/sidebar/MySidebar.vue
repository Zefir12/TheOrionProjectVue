<script setup lang="ts">
import { useRouter } from "vue-router";
import { useLoginStore } from "../login/store/loginStore";
import { useSidebarStore } from "./sidebarStore";
import Button from "primevue/button";
import StyledButton from "../global/StyledButton.vue";
import { IconX } from "@tabler/icons-vue";

const router = useRouter()

const sidebarStore = useSidebarStore();

const loginStore = useLoginStore();

function goToDashboard() {
    router.push({ name: "dashboard" });
}

function goToFood() {
    router.push({ name: "food" });
}

async function logoutUser() {
    await loginStore.logutUser();
}
</script>

<template>
    <div class="sidebar" :class="{ 'sidebar-hidden': !sidebarStore.sidebarVisible }">
        <div class="sidebar-head" :class="{ 'sidebar-head-closed': !sidebarStore.sidebarVisible }">
            <div v-if="sidebarStore.sidebarVisible">MENU</div>
            <Button text raised @click="sidebarStore.toggleVisible()" severity="secondary"><IconX size="22" stroke-width="2" color="#7048e8"/> </Button>
            
        </div>
        <div class="sidebar-content">
            <StyledButton :disabled="!loginStore.userLogged" @click="goToDashboard" name="Dashboard"/>
            <StyledButton :disabled="!loginStore.userLogged" @click="goToFood" name="Food"/>
            <StyledButton class="logout_buton" :disabled="!loginStore.userLogged" @click="logoutUser" name="Logout"/>
        </div>
    </div>
</template>

<style scoped>
.logout_buton {
    margin-top: auto;
}

.sidebar {
    z-index: 1000;
    display: flex;
    flex-direction: column;
    padding: 5px;
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
    margin: 15px;
    gap: 5px;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
}
.sidebar-head {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 15px;
    margin-top: 10px;
    align-items: center;
    height: 50px;
    font-weight: bold;
}
.sidebar-head-closed {
    flex-direction: row-reverse;
}
</style>
