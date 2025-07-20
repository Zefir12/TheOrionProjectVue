<script setup lang="ts">
import Toast from "primevue/toast";
import TopHeader from "./components/global/TopHeader.vue";
import { useUserStore } from "./stores/userStore";
import { onBeforeMount } from "vue";
import { useActivityStore } from "./stores/activityStore";
const userStore = useUserStore();
const activityStore = useActivityStore();

onBeforeMount(async () => {
    await userStore.fetchUserData();
    activityStore.FetchData();
});
</script>

<!--
    https://primevue.org/       for components
    https://vuejs.org/          for vue
    https://vueschool.io/articles/vuejs-tutorials/eslint-and-prettier-with-vite-and-vue-js-3/   fro setting up linter, maybe setting up linter errors in browser later
    used this to migrating from npm to pnpm ->  https://britishgeologicalsurvey.github.io/development/migrating-from-npm-to-pnpm/
-->

<template>
    <Toast position="bottom-right" />
    <div :style="{ display: 'flex', flexDirection: 'column', height: '100%' }">
        <TopHeader />
        <RouterView />
    </div>
</template>
