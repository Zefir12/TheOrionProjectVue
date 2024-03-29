<script setup lang="ts">
import Group from "../../global/containers/Group.vue";
import Stack from "../../global/containers/Stack.vue";
import StyledButton from "../../global/StyledButton.vue";
import CardInput from "../components/CardInput.vue";
import ScrollableStack from "../../global/containers/ScrollableStack.vue";
import Calendar from "primevue/calendar";
import { useAddFoodStore } from "../store/addFoodStore";
import FoodTypeCard from "../components/FoodTypeCard.vue";

const addFoodStore = useAddFoodStore();
</script>
<template>
    <Group ml="10rem" mr="10rem">
        <Stack align="flex-end">
            <Calendar id="calendar-24h" v-model="addFoodStore.time" showTime hourFormat="24" showIcon iconDisplay="input" />
        </Stack>
        <Stack gap="xs" align="stretch">
            <Group>
                <StyledButton name="Add to Database" />
                <StyledButton width="10rem" @click="addFoodStore.clearFoods" name="Clear" />
            </Group>

            <ScrollableStack height="80vh">
                <StyledButton
                    @click="addFoodStore.deselectItem(foodtype)"
                    :name="foodtype.name?.toString()"
                    v-for="foodtype in addFoodStore.selectedFoodTypes"
                />
            </ScrollableStack>
        </Stack>
        <Stack gap="xs" align="flex-start">
            <CardInput v-model="addFoodStore.query" />
            <div class="zefir-foodtypes-container">
                <FoodTypeCard
                    @click="addFoodStore.selectItem(foodtype)"
                    :visible="foodtype.name?.toLowerCase().includes(addFoodStore.query.toLowerCase())"
                    :name="foodtype.name?.toString()"
                    v-for="foodtype in addFoodStore.foodTypes"
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
