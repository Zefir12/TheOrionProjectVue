<template>
    <div class="group">
        <div class="stack">
            <Card>
                <template #content>
                    <div class="content-stack">
                        <CardInput v-model="model.name" label="Name" />
                        <StyledNumberInput v-model="model.waterPercentage" label="Water Percentage" />
                        <div class="small-group">
                            <StyledTextInput v-model="model.tags.brand" label="Marka" />
                            <StyledTextInput v-model="model.tags.flavour" label="Smak" />
                        </div>
                        <div class="small-group">
                            <StyledTextInput v-model="model.tags.type" label="Rodzaj" />
                            <StyledTextInput v-model="model.tags.shop" label="Sklep" />
                        </div>
                    </div>
                </template>
            </Card>
            <Card>
                <template #title>Porcje</template>
                <template #content>
                    <div class="inner-stack">
                        <div class="inner-group">
                            <CardInput v-model="temporaryServing.name" label="Name" />
                            <StyledNumberInput v-model="temporaryServing.value" label="Value" />
                            <IconButton @click="addNewServing"></IconButton>
                        </div>
                        <div class="inner-wrap">
                            <StyledButton v-for="serving in model.servings" :name="serving.name + ' - ' + serving.value + 'g'" @click="removeServing(serving)" />
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
                        <StyledNumberInput v-model="model.kcal" label="Kcal" />
                        <div class="small-group">
                            <StyledNumberInput v-model="model.fats" label="Fats" />
                            <StyledNumberInput v-model="model.saturatedFats" label="Saturated Fats" />
                        </div>
                        <div class="small-group">
                            <StyledNumberInput v-model="model.carbs" label="Carbs" />
                            <StyledNumberInput v-model="model.sugar" label="Sugar" />
                        </div>
                        <StyledNumberInput v-model="model.protein" label="Protein" />
                        <StyledNumberInput v-model="model.salt" label="Salt" />
                        <StyledNumberInput v-model="model.fibre" label="Fibre" />
                    </div>
                </template>
            </Card>
            <Card>
                <template #content>
                    <div class="inner-stack">
                        <div class="inner-group">
                            <a href="https://danone.pl/nutri-score/" target="_blank" rel="noopener noreferrer">Nutri Score</a>
                            <Rating v-model="model.nutriScore" />
                        </div>
                        <div class="inner-group">
                            <a href="https://world.openfoodfacts.org/nova" target="_blank" rel="noopener noreferrer">Nova Score</a>
                            <Rating v-model="model.novaScore" :stars="4" />
                        </div>
                    </div>
                </template>
            </Card>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Serving } from "@/lib/models/Food";
import { ref } from "vue";
import Card from "primevue/card";
import CardInput from "@/components/food/CardInput.vue";
import StyledButton from "@/components/global/StyledButton.vue";
import StyledNumberInput from "@/components/global/StyledNumberInput.vue";
import Rating from "primevue/rating";
import IconButton from "@/components/global/IconButton.vue";
import StyledTextInput from "@/components/global/StyledTextInput.vue";

const model = defineModel<FoodTypeInfo>({ required: true });
const temporaryServing = ref({} as Serving);

const removeServing = (serving: Serving) => {
    if (!model.value) return;
    model.value.servings = model.value.servings.filter((item) => item !== serving);
};

const addNewServing = () => {
    if (!model.value) return;
    model.value.servings.push({ name: temporaryServing.value.name, value: temporaryServing.value.value });
};

export interface FoodTypeInfo {
    kcal: number;
    fats: number;
    saturatedFats: number;
    carbs: number;
    sugar: number;
    protein: number;
    salt: number;
    fibre: number;
    nutriScore?: number;
    novaScore?: number;
    tags: {
        brand: string;
        flavour: string;
        type: string;
        shop: string;
    };
    servings: Serving[];
    waterPercentage: number;
    name: string;
    id: number;
}
</script>
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
    padding-top: 0px;
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
