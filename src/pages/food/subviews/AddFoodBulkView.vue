<script setup lang="ts">
import Group from "@/components/global/containers/Group.vue";
import Stack from "@/components/global/containers/Stack.vue";
import StyledButton from "@/components/global/StyledButton.vue";
import CardInput from "@/components/food/CardInput.vue";
import ScrollableStack from "@/components/global/containers/ScrollableStack.vue";
import MealOrFoodSearchCard from "@/components/food/MealOrFoodSearchCard.vue";
import { i18n } from "@/lib/localization/i18n";
import Select from "@/components/global/Select.vue";
import { ref } from "vue";
import { useAddFoodBulkStore } from "../store/addFoodBulkStore";
import TimeShelfItem from "@/components/food/TimeShelfItem.vue";
import TimeShelfCard from "@/components/food/TimeShelfCard.vue";
import { TimeShelf } from "@/lib/models/TimeShelfs/TimeShelf";
import Calendar from "primevue/calendar";
import BulkFoodItem from "@/components/food/BulkFoodItem.vue";
import { FoodAsItemToAdd, MealAsItemToAdd } from "@/lib/models/Food";
import MealItem from "@/components/food/MealItem.vue";

const addFoodBulkStore = useAddFoodBulkStore();
const selectedTimingstemplate = ref(null);

const dragStart = (event: DragEvent, item: FoodAsItemToAdd | MealAsItemToAdd) => {
    event.dataTransfer?.setData("item", JSON.stringify(item));
};

const drop = (event: DragEvent, timeShelf: TimeShelf) => {
    if (event.dataTransfer) {
        const item = JSON.parse(event.dataTransfer.getData("item"));
        addFoodBulkStore.changeItemShelf(item.internalId, item.type, timeShelf.id);
    }
};

function adjustDay(deltaDays: number) {
    const current = new Date(addFoodBulkStore.time);
    current.setDate(current.getDate() + deltaDays);
    addFoodBulkStore.time = current;
}
</script>
<template>
    <Group ml="10rem" mr="10rem">
        <Stack align="stretch">
            <Group :gap="'xs'">
                <Select :style="{ height: '2.25rem', width: '100%' }" v-model="selectedTimingstemplate" :options="[{ name: 'pog', value: 100 }]" />
                <StyledButton :style="{ width: '3rem' }" @click="" :name="'+'" />
            </Group>
            <TimeShelfCard
                v-for="timeShelf in addFoodBulkStore.timeShelfs"
                :style="{ width: 'auto' }"
                :highlighted="addFoodBulkStore.currentTimeShelfId === timeShelf.id"
                :key="timeShelf.id"
                :name="timeShelf.name"
                :text="timeShelf.startTime + ' - ' + timeShelf.endTime"
                @click="addFoodBulkStore.currentTimeShelfId = timeShelf.id"
                @dragover.prevent
                @drop="drop($event, timeShelf)"
            >
                <template #content>
                    <TimeShelfItem v-for="item in addFoodBulkStore.getItemsInShelf(timeShelf.id)" :name="(item.name as string).slice(0, 400)" :draggable="true" @dragstart="dragStart($event, item)" />
                </template>
            </TimeShelfCard>
        </Stack>
        <Stack gap="xs" align="stretch">
            <Group>
                <StyledButton :style="{ width: '3rem' }" @click="adjustDay(-1)" :name="'<'" />
                <Calendar :style="{ width: '100%' }" id="calendar-24h" v-model="addFoodBulkStore.time" hour-format="24" show-icon icon-display="input" dateFormat="dd/mm/yy" />
                <StyledButton :style="{ width: '3rem' }" @click="adjustDay(1)" :name="'>'" />
            </Group>
            <Group>
                {{ addFoodBulkStore.getTotalsInCurrentShelf() }}
            </Group>
            <Group>
                <StyledButton @click="addFoodBulkStore.addToDatabase()" :name="i18n.t('AddFoodView.addToDatabase')" />
            </Group>

            <ScrollableStack gap="xs" height="80vh">
                <div v-for="item in addFoodBulkStore.getItemsInCurrentShelf()">
                    <BulkFoodItem v-if="item.type == 'food'" :food-item="item" :name="item.name?.toString()" @submit="addFoodBulkStore.deselectItem(item)" />
                    <MealItem v-if="item.type == 'meal'" :meal-item="item" :name="item.name?.toString()" @submit="addFoodBulkStore.deselectItem(item)" />
                </div>
            </ScrollableStack>
        </Stack>
        <Stack gap="xs" align="flex-start">
            <CardInput v-model="addFoodBulkStore.query" />
            <div class="zefir-foodtypes-container">
                <MealOrFoodSearchCard
                    v-for="foodtype in addFoodBulkStore.getItemsForQueryList()"
                    :key="foodtype.id"
                    :visible="foodtype.name?.toLowerCase().includes(addFoodBulkStore.query.toLowerCase())"
                    :name="foodtype.name?.toString()"
                    :type="foodtype.type"
                    :metadata="
                        foodtype.type == 'food'
                            ? addFoodBulkStore.getFoodMetadata(foodtype.id)
                                ? Object.values(JSON.parse(addFoodBulkStore.getFoodMetadata(foodtype.id))).join(',')
                                : undefined
                            : undefined
                    "
                    @click="addFoodBulkStore.selectItem(foodtype)"
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

.tab-head {
    display: flex;
    align-items: center;
    gap: 10px;
}
</style>
