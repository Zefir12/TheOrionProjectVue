<script setup lang="ts">
import MySidebar from "./components/sidebar/MySidebar.vue"
import Toast from "primevue/toast"
</script>

<!--
    https://primevue.org/       for components
    https://vuejs.org/          for vue
    https://vueschool.io/articles/vuejs-tutorials/eslint-and-prettier-with-vite-and-vue-js-3/   fro setting up linter, maybe setting up linter errors in browser later
    used this to migrating from npm to pnpm ->  https://britishgeologicalsurvey.github.io/development/migrating-from-npm-to-pnpm/
-->

<template>
    <Toast />
    <MySidebar />
    <RouterView />
</template>
