<template>
    <div class="page-container">
        <Group>ttest</Group>
        <Group ml="10rem" mr="10rem">
            <CreateNewFoodComponent @add-new-food="store.addNewFoodToDatabase" v-model="store.foodModel" style="max-width: 39.5rem" />
            <Stack gap="xs" align="stretch" :style="{ maxWidth: '25.5rem' }">
                <CardInput v-model="store.query" />
                <div class="zefir-foodtypes-container">
                    <FoodTypeCard
                        v-for="foodtype in store.foodTypes"
                        :key="foodtype.id"
                        :visible="foodtype.name?.toLowerCase().includes(store.query.toLowerCase())"
                        :name="foodtype.name?.toString()"
                        @click="store.selectItem(foodtype)"
                    />
                </div>
            </Stack>
        </Group>
    </div>
</template>

<script setup lang="ts">
import { useEditFoodStore } from "./store/editFoodStore";
import CreateNewFoodComponent from "@/components/food/CreateNewFoodComponent.vue";
import Group from "@/components/global/containers/Group.vue";
import Stack from "@/components/global/containers/Stack.vue";
import FoodTypeCard from "@/components/food/FoodTypeCard.vue";
import CardInput from "@/components/food/CardInput.vue";

const store = useEditFoodStore();
</script>

<style scoped>
.zefir-foodtypes-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    overflow-y: auto;
    max-height: 70vh;
    align-items: stretch;
    max-width: 25.5rem;
}

.page-container {
    flex-direction: column;
    display: flex;
    height: 100vh;
    width: 100vw;
    overflow: scroll;
    align-items: center;
}
</style>
