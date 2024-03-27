<script setup lang="ts">
import Card from "primevue/card";
import CardInput from "../components/CardInput.vue";
import StyledButton from "../../global/StyledButton.vue";
import StyledNumberInput from "../../global/StyledNumberInput.vue";
import { useNewFoodStore } from "../store/newFoodStore";
import Rating from "primevue/rating";
import IconButton from "../../global/IconButton.vue";
const newFoodStore = useNewFoodStore();
</script>
<template>
    <div class="group">
        <div class="stack">
            <Card>
                <template #content>
                    <div class="content-stack">
                        <CardInput v-model="newFoodStore.name" label="Name" />
                        <StyledNumberInput v-model="newFoodStore.waterPercentage" label="Water Percentage" />
                        <StyledButton @click="newFoodStore.addNewFoodToDatabase" name="Add" />
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
                            <button @click="newFoodStore.removeServing(serving)" v-for="serving in newFoodStore.servings">
                                {{ serving.name + " - " + serving.value + "g" }}
                            </button>
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
                            <Rating :stars="4" v-model="newFoodStore.novaScore" />
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
