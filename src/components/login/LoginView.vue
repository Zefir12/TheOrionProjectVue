<script setup lang="ts">
import Card from "primevue/card";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import FloatLabel from "primevue/floatlabel";
import StyledButton from "../global/StyledButton.vue";
import { useLoginStore } from "./store/loginStore";

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
                    <label>Email</label>
                </FloatLabel>
                <FloatLabel class="container-item">
                    <Password v-model="store.password" :feedback="false" />
                    <label>Password</label>
                </FloatLabel>
                <StyledButton class="login-button" name="Login" @click="loginSubmit" />
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

.login-button {
    margin-top: 12px;
    margin-bottom: 12px;
    width: 10.8rem;
}
</style>
