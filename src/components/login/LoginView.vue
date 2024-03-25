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
    <Card>
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
                <StyledButton @click="loginSubmit" class="button" name="Login"/>
            </div>
        </template>
    </Card>
</template>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
}

.container-item {
    margin: 14px;
}

.button {
    margin: 14px;
}
</style>
