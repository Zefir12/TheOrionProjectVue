<script setup lang="ts">
import Group from "../../global/containers/Group.vue";
import Stack from "../../global/containers/Stack.vue";
import StyledButton from "../../global/StyledButton.vue";
import CardInput from "../components/CardInput.vue";
import ScrollableStack from "../../global/containers/ScrollableStack.vue";
import { useAddFoodStore } from "../store/addFoodStore";

const addFoodStore = useAddFoodStore();
</script>
<template>
    <Group ml="10rem" mr="10rem">
        <Stack justify="flex-end">
            <StyledButton />
            <StyledButton />
            <StyledButton />
        </Stack>
        <Stack gap="xs" align="stretch">
            <ScrollableStack height="80vh">
                <StyledButton @click="addFoodStore.deselectItem(foodtype)" :name="foodtype.name?.toString()" v-for="foodtype in addFoodStore.selectedFoodTypes" />
            </ScrollableStack>
        </Stack>
        <Stack gap="xs" align="stretch">
            <CardInput />
            <ScrollableStack>
                <StyledButton @click="addFoodStore.selectItem(foodtype)" :name="foodtype.name?.toString()" v-for="foodtype in addFoodStore.foodTypes" />
            </ScrollableStack>
        </Stack>
    </Group>
</template>

