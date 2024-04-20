<script setup lang="ts">
import Group from "@/components/global/containers/Group.vue";
import Stack from "@/components/global/containers/Stack.vue";
import StyledButton from "@/components/global/StyledButton.vue";
import CardInput from "@/components/food/CardInput.vue";
import ScrollableStack from "@/components/global/containers/ScrollableStack.vue";
import Calendar from "primevue/calendar";
import { useAddFoodStore } from "../../../pages/food/store/addFoodStore";
import FoodTypeCard from "@/components/food/FoodTypeCard.vue";
import FoodItem from "@/components/food/FoodItem.vue";

const addFoodStore = useAddFoodStore();
</script>
<template>
    <Group ml="10rem" mr="10rem">
        <Stack align="flex-end">
            <Calendar id="calendar-24h" v-model="addFoodStore.time" show-time hour-format="24" show-icon icon-display="input" />
        </Stack>
        <Stack gap="xs" align="stretch">
            <Group>
                <StyledButton @click="addFoodStore.addToDatabase()" name="Add to Database" />
                <StyledButton width="10rem" name="Clear" @click="addFoodStore.clearFoods" />
            </Group>

            <ScrollableStack height="80vh">
                <FoodItem v-for="foodtype in addFoodStore.selectedFoodTypes" :food-item="foodtype" :name="foodtype.name?.toString()" @submit="addFoodStore.deselectItem(foodtype)" />
            </ScrollableStack>
        </Stack>
        <Stack gap="xs" align="flex-start">
            <CardInput v-model="addFoodStore.query" />
            <div class="zefir-foodtypes-container">
                <FoodTypeCard
                    v-for="foodtype in addFoodStore.foodTypes"
                    :visible="foodtype.name?.toLowerCase().includes(addFoodStore.query.toLowerCase())"
                    :name="foodtype.name?.toString()"
                    @click="addFoodStore.selectItem(foodtype)"
                />
            </div>
        </Stack>
    </Group>
</template>

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
</style>
