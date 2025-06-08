<template>
    <div class="page-container">
        <Group :style="{ padding: '1rem', justifyContent: 'flex-end' }">
            <StyledButton :style="{ width: '8rem' }" name="Add as new" @click="store.addNewFoodToDatabase()"></StyledButton>
            <StyledButton :disabled="store.id == null" :style="{ width: '12rem' }" name="Save changes" @click="store.updateFoodInDatabase()"></StyledButton>
            <StyledButton :style="{ width: '5rem' }" name="Clear" @click="store.clear()"></StyledButton>
        </Group>
        <Group ml="10rem" mr="10rem">
            <CreateNewFoodComponent v-model="store.foodModel" style="max-width: 39.5rem" />
            <Stack gap="xs" align="stretch" :style="{ width: '27rem' }">
                <CardInput :style="{ marginLeft: '2px', marginRight: '2px', marginTop: '-2px' }" v-model="store.query" />
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
import StyledButton from "@/components/global/StyledButton.vue";

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
    max-width: 26rem;
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
