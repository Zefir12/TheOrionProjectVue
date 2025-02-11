<script setup lang="ts">
import Card from "primevue/card";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import FloatLabel from "primevue/floatlabel";
import StyledButton from "@/components/global/StyledButton.vue";
import { useLoginStore } from "./store/loginStore";
import { i18n } from "@/lib/localization/i18n";
const store = useLoginStore();

async function loginSubmit() {
    await store.loginUser();
}
</script>

<template>
    <Card class="t">
        <template #content>
            <div class="container">
                <FloatLabel class="container-item">
                    <InputText v-model="store.email" />
                    <label>{{ i18n.t("common.email") }}</label>
                </FloatLabel>
                <FloatLabel class="container-item">
                    <Password v-model="store.password" :feedback="false" />
                    <label>{{ i18n.t("common.password") }}</label>
                </FloatLabel>
                <StyledButton :loading="store.loading" class="login-button" :name="i18n.t('common.login')" @click="loginSubmit" />
                <img class="google" src="@/assets/logos/google_logo.svg" alt="logo" @click="store.googleLogin" />
            </div>
        </template>
    </Card>
</template>

<style scoped>
.t {
    width: 15rem;
    margin: auto;
}
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 12rem;
}

.container-item {
    margin-top: 12px;
    margin-bottom: 12px;
}

.google {
    height: 44px;
}

.google:hover {
    cursor: pointer;
}

.login-button {
    margin-top: 12px;
    margin-bottom: 12px;
    width: 10.8rem;
}
</style>
