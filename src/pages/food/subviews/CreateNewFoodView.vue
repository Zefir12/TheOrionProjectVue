<script setup lang="ts">
import { useNewFoodStore } from "../../../pages/food/store/newFoodStore";
import CreateNewFoodComponent from "@/components/food/CreateNewFoodComponent.vue";

const newFoodStore = useNewFoodStore();
</script>
<template>
    <CreateNewFoodComponent v-model="newFoodStore.foodModel" />
</template>
<style scoped>
.small-group {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 0;
    gap: 15px;
}

.inner-group {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 0;
    align-items: flex-end;
    height: 100%;
    width: 100%;
    gap: 15px;
}

.inner-wrap {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}

.inner-stack {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
}

.group {
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding-top: 30px;
    margin: 0;
    height: 100%;
    width: 100%;
    gap: 20px;
}

.content-stack {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.content-tight-stack {
    display: flex;
    flex-direction: column;
    gap: 3px;
}

.stack {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 300px;
}
</style>
