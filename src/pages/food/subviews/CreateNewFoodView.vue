<script setup lang="ts">
import Card from "primevue/card";
import CardInput from "@/components/food/CardInput.vue";
import StyledButton from "@/components/global/StyledButton.vue";
import StyledNumberInput from "@/components/global/StyledNumberInput.vue";
import { useNewFoodStore } from "../../../pages/food/store/newFoodStore";
import Rating from "primevue/rating";
import IconButton from "@/components/global/IconButton.vue";
import StyledTextInput from "@/components/global/StyledTextInput.vue";
import { useAddFoodBulkStore } from "../store/addFoodBulkStore";

const newFoodStore = useNewFoodStore();
const addBulkFoodStore = useAddFoodBulkStore();

const addNewFoodToDatabase = async () => {
    await newFoodStore.addNewFoodToDatabase();
    await addBulkFoodStore.fetchFoodTypesData();
};
</script>
<template>
    <div class="group">
        <div class="stack">
            <Card>
                <template #content>
                    <div class="content-stack">
                        <CardInput v-model="newFoodStore.name" label="Name" />
                        <StyledNumberInput v-model="newFoodStore.waterPercentage" label="Water Percentage" />
                        <div class="small-group">
                            <StyledTextInput v-model="newFoodStore.tags.brand" label="Marka" />
                            <StyledTextInput v-model="newFoodStore.tags.flavour" label="Smak" />
                        </div>
                        <div class="small-group">
                            <StyledTextInput v-model="newFoodStore.tags.type" label="Rodzaj" />
                            <StyledTextInput v-model="newFoodStore.tags.shop" label="Sklep" />
                        </div>
                        <StyledButton name="Add" @click="addNewFoodToDatabase()" />
                    </div>
                </template>
            </Card>
            <Card>
                <template #title>Porcje</template>
                <template #content>
                    <div class="inner-stack">
                        <div class="inner-group">
                            <CardInput v-model="newFoodStore.temporaryServingName" label="Name" />
                            <StyledNumberInput v-model="newFoodStore.temporaryServingValue" label="Value" />
                            <IconButton @click="newFoodStore.addNewServing"></IconButton>
                        </div>
                        <div class="inner-wrap">
                            <StyledButton v-for="serving in newFoodStore.servings" :name="serving.name + ' - ' + serving.value + 'g'" @click="newFoodStore.removeServing(serving)" />
                        </div>
                    </div>
                </template>
            </Card>
        </div>
        <div class="stack">
            <Card>
                <template #title>Wartości Odżywcze</template>
                <template #content>
                    <div class="content-tight-stack">
                        <StyledNumberInput v-model="newFoodStore.kcal" label="Kcal" />
                        <div class="small-group">
                            <StyledNumberInput v-model="newFoodStore.fats" label="Fats" />
                            <StyledNumberInput v-model="newFoodStore.saturatedFats" label="Saturated Fats" />
                        </div>
                        <div class="small-group">
                            <StyledNumberInput v-model="newFoodStore.carbs" label="Carbs" />
                            <StyledNumberInput v-model="newFoodStore.sugar" label="Sugar" />
                        </div>
                        <StyledNumberInput v-model="newFoodStore.protein" label="Protein" />
                        <StyledNumberInput v-model="newFoodStore.salt" label="Salt" />
                        <StyledNumberInput v-model="newFoodStore.fibre" label="Fibre" />
                    </div>
                </template>
            </Card>
            <Card>
                <template #content>
                    <div class="inner-stack">
                        <div class="inner-group">
                            <a href="https://danone.pl/nutri-score/" target="_blank" rel="noopener noreferrer">Nutri Score</a>
                            <Rating v-model="newFoodStore.nutriScore" />
                        </div>
                        <div class="inner-group">
                            <a href="https://world.openfoodfacts.org/nova" target="_blank" rel="noopener noreferrer">Nova Score</a>
                            <Rating v-model="newFoodStore.novaScore" :stars="4" />
                        </div>
                    </div>
                </template>
            </Card>
        </div>
    </div>
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
