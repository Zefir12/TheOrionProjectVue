<script setup lang="ts">
import Group from "@/components/global/containers/Group.vue";
import Stack from "@/components/global/containers/Stack.vue";
import StyledButton from "@/components/global/StyledButton.vue";
import CardInput from "@/components/food/CardInput.vue";
import ScrollableStack from "@/components/global/containers/ScrollableStack.vue";
import FoodTypeCard from "@/components/food/FoodTypeCard.vue";
import { i18n } from "@/lib/localization/i18n";
import Select from "@/components/global/Select.vue";
import { ref } from "vue";
import { useAddFoodBulkStore } from "../store/addFoodBulkStore";
import TimeShelfItem from "@/components/food/TimeShelfItem.vue";
import TimeShelfCard from "@/components/food/TimeShelfCard.vue";
import { ShelfFoodItem, TimeShelf } from "@/lib/models/TimeShelfs/TimeShelf";
import Calendar from "primevue/calendar";
import BulkFoodItem from "@/components/food/BulkFoodItem.vue";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import { IconAddressBook } from "@tabler/icons-vue";

const addFoodBulkStore = useAddFoodBulkStore();
const selectedTimingstemplate = ref(null);

const dragStart = (event: DragEvent, item: ShelfFoodItem) => {
    event.dataTransfer?.setData("item", JSON.stringify(item));
};

const drop = (event: DragEvent, timeShelf: TimeShelf) => {
    if (event.dataTransfer) {
        const item = JSON.parse(event.dataTransfer.getData("item"));
        addFoodBulkStore.changeItemShelf(item.id, timeShelf.id);
    }
};
</script>
<template>
    <Group ml="10rem" mr="10rem">
        <Stack align="stretch">
            <Group :gap="'xs'">
                <!-- select -->
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
            <Calendar id="calendar-24h" v-model="addFoodBulkStore.time" hour-format="24" show-icon icon-display="input" />
            <Group>
                <StyledButton @click="addFoodBulkStore.addToDatabase()" :name="i18n.t('AddFoodView.addToDatabase')" />
                <StyledButton width="10rem" :name="i18n.t('AddFoodView.clear')" @click="addFoodBulkStore.clearFoods" />
            </Group>

            <ScrollableStack height="80vh">
                <BulkFoodItem v-for="foodtype in addFoodBulkStore.getItemsInCurrentShelf()" :food-item="foodtype" :name="foodtype.name?.toString()" @submit="addFoodBulkStore.deselectItem(foodtype)" />
            </ScrollableStack>
        </Stack>
        <Stack gap="xs" align="flex-start">
            <TabView>
                <TabPanel>
                    <template #header>
                        <div class="tab-head">
                            <IconAddressBook size="24" stroke-width="2" />
                            <span class="font-bold white-space-nowrap">{{ $t("FoodView.food") }}</span>
                        </div>
                    </template>
                    <CardInput v-model="addFoodBulkStore.query" />
                    <div class="zefir-foodtypes-container">
                        <FoodTypeCard
                            v-for="foodtype in addFoodBulkStore.foodTypes"
                            :key="foodtype.id"
                            :disabled="addFoodBulkStore.checkForAlreadyAdded(foodtype.id)"
                            :visible="foodtype.name?.toLowerCase().includes(addFoodBulkStore.query.toLowerCase())"
                            :name="foodtype.name?.toString()"
                            @click="addFoodBulkStore.selectItem(foodtype)"
                        />
                    </div>
                </TabPanel>
                <TabPanel>
                    <template #header>
                        <div class="tab-head">
                            <IconAddressBook size="24" stroke-width="2" />
                            <span class="font-bold white-space-nowrap">{{ $t("FoodView.Meal") }}</span>
                        </div>
                    </template>
                    <div class="zefir-foodtypes-container">
                        <FoodTypeCard
                            v-for="foodtype in addFoodBulkStore.foodTypes"
                            :key="foodtype.id"
                            :disabled="addFoodBulkStore.checkForAlreadyAdded(foodtype.id)"
                            :visible="foodtype.name?.toLowerCase().includes(addFoodBulkStore.query.toLowerCase())"
                            :name="foodtype.name?.toString()"
                            @click="addFoodBulkStore.selectItem(foodtype)"
                        />
                    </div>
                </TabPanel>
            </TabView>
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
