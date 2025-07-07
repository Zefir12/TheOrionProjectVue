<template>
    <Group ml="10rem" mr="10rem">
        <Stack gap="xs" align="stretch" :style="{ maxWidth: '20.5rem' }">
            <FoodInfoChart
                :kcal="createFoodComboStore.getMealValue().kcal"
                :proteins="createFoodComboStore.getMealValue().proteins"
                :fats="createFoodComboStore.getMealValue().fats"
                :carbohydrates="createFoodComboStore.getMealValue().carbohydrates"
            />
        </Stack>
        <Stack align="stretch" :style="{ maxWidth: '25.5rem' }">
            <Card :style="{ height: '75vh', maxWidth: '25.5rem' }">
                <template #content>
                    <Stack gap="0.5rem">
                        <StyledButton @click="createFoodComboStore.addToDatabase()" :name="i18n.t('AddFoodView.addToDatabase')" />
                        <Group>
                            <StyledTextInput v-model="createFoodComboStore.name" :label="'Name'" />
                        </Group>

                        <ScrollableStack height="80vh">
                            <BulkFoodItem
                                v-for="foodtype in createFoodComboStore.selectedFoodItems"
                                :food-item="foodtype"
                                :name="foodtype.name?.toString()"
                                @submit="createFoodComboStore.deselectItem(foodtype)"
                            />
                        </ScrollableStack>
                    </Stack>
                </template>
            </Card>
        </Stack>
        <Stack gap="xs" align="stretch" :style="{ maxWidth: '25.5rem' }">
            <CardInput v-model="createFoodComboStore.query" />
            <div class="zefir-foodtypes-container">
                <FoodTypeCard
                    v-for="foodtype in createFoodComboStore.foodTypes"
                    :key="foodtype.id"
                    :disabled="createFoodComboStore.checkForAlreadyAdded(foodtype.id)"
                    :visible="foodtype.name?.toLowerCase().includes(createFoodComboStore.query.toLowerCase())"
                    :name="foodtype.name?.toString()"
                    @click="createFoodComboStore.selectItem(foodtype)"
                />
            </div>
        </Stack>
    </Group>
</template>

<script setup lang="ts">
import { useCreateFoodComboStore } from "../store/createFoodComboStore";
import { i18n } from "@/lib/localization/i18n";
import Group from "@/components/global/containers/Group.vue";
import Stack from "@/components/global/containers/Stack.vue";
import ScrollableStack from "@/components/global/containers/ScrollableStack.vue";
import StyledTextInput from "@/components/global/StyledTextInput.vue";
import FoodTypeCard from "@/components/food/FoodTypeCard.vue";
import BulkFoodItem from "@/components/food/BulkFoodItem.vue";
import CardInput from "@/components/food/CardInput.vue";
import Card from "primevue/card";
import StyledButton from "@/components/global/StyledButton.vue";
import FoodInfoChart from "@/pages/dashboard/components/FoodInfoChart.vue";

const createFoodComboStore = useCreateFoodComboStore();
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
</style>
