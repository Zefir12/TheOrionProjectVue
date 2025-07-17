<template>
    <div class="modal" v-if="model">
        <div class="modal-content">
            <IconX @click="model = false" class="icon-x" :size="32" :stroke-width="3" />
            <div>p</div>
            <LanguageSwitcher class="logout_buton" />
            <StyledButton :disabled="!loginStore.userLogged" :name="i18n.t('MySidebar.logout')" @click="logout" />
            <div class="sidebar-content">
                <StyledButton :disabled="!loginStore.userLogged" :name="i18n.t('MySidebar.dashboard')" @click="goto('dashboard')" />
                <StyledButton :disabled="!loginStore.userLogged" :name="i18n.t('MySidebar.food')" @click="goto('food')" />
                <StyledButton :disabled="!loginStore.userLogged" :name="i18n.t('MySidebar.weight')" @click="goto('weight')" />
                <StyledButton :disabled="!loginStore.userLogged" :name="i18n.t('MySidebar.bloodPreassure')" @click="goto('bloodpreassure')" />
                <StyledButton :disabled="!loginStore.userLogged" :name="i18n.t('MySidebar.foodData')" @click="goto('foodData')" />
                <StyledButton :disabled="!loginStore.userLogged" :name="i18n.t('MySidebar.editFood')" @click="goto('editFood')" />
                <StyledButton :disabled="!loginStore.userLogged" :name="i18n.t('MySidebar.boughtItems')" @click="goto('boughtItems')" />
                <StyledButton :disabled="!loginStore.userLogged" :name="i18n.t('MySidebar.test')" @click="goto('test')" />
                <StyledButton :disabled="!loginStore.userLogged" :name="i18n.t('MySidebar.test2')" @click="goto('test2')" />
                <StyledButton :disabled="!loginStore.userLogged" :name="i18n.t('MySidebar.fitbit')" @click="goto('fitbit')" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { IconX } from "@tabler/icons-vue";

import LanguageSwitcher from "./LanguageSwitcher.vue";
import StyledButton from "./StyledButton.vue";
import { useLoginStore } from "@/pages/login/store/loginStore";
import { useRouter } from "vue-router";
import { i18n } from "@/lib/localization/i18n";

const router = useRouter();

const loginStore = useLoginStore();
const model = defineModel();

const logout = () => {
    loginStore.logutUser();
    model.value = false;
};

const goto = (path: string) => {
    router.push({ name: path });
    model.value = false;
};
</script>

<style scoped>
.modal {
    position: fixed; /* Stay in place */
    z-index: 10000; /* Sit on top */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0, 0, 0); /* Fallback color */
    background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
    display: flex;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(5px);
}

.icon-x {
    position: absolute;
    top: 0.8rem;
    right: 1rem;
    cursor: pointer;
}

.modal-content {
    background-color: #312e2e;
    padding: 0.5rem;
    border-radius: 0.5rem;
    height: 50rem;
    width: 50rem;
    position: relative;
}
</style>
