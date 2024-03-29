<script setup lang="ts">
import MySidebar from "./components/sidebar/MySidebar.vue";
import Toast from "primevue/toast";
</script>

<!-- 
    https://primevue.org/       for components
    https://vuejs.org/          for vue
-->

<template>
    <Toast />
    <MySidebar />
    <RouterView />
</template>
