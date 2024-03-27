<script setup lang="ts">
import MySidebar from "./components/sidebar/MySidebar.vue";
import Toast from "primevue/toast";
</script>

<template>
    <Toast />
    <MySidebar />
    <RouterView />
</template>
