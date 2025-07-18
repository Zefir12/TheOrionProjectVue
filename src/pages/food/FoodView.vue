<script setup lang="ts">
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import { IconFridge, IconSettings } from "@tabler/icons-vue";
import AddFoodBulkView from "./subviews/AddFoodBulkView.vue";
import CreateFoodComboView from "./subviews/CreateFoodComboView.vue";
</script>
<template>
    <TabView lazy :active-index="0" class="tabview">
        <TabPanel>
            <template #header>
                <div class="tab-head">
                    <IconFridge size="24" stroke-width="2" />
                    <span class="font-bold white-space-nowrap">{{ $t("FoodView.addFood") + " +" }}</span>
                </div>
            </template>
            <AddFoodBulkView />
        </TabPanel>
        <TabPanel>
            <template #header>
                <div class="tab-head">
                    <IconFridge size="24" stroke-width="2" />
                    <span class="font-bold white-space-nowrap">{{ $t("FoodView.createCombo") }}</span>
                </div>
            </template>
            <CreateFoodComboView />
        </TabPanel>
        <TabPanel :disabled="true">
            <template #header>
                <div class="tab-head">
                    <IconSettings size="24" stroke-width="2" />
                    <span class="font-bold white-space-nowrap">{{ $t("FoodView.settings") }}</span>
                </div>
            </template>
        </TabPanel>
    </TabView>
</template>

<style scoped>
.tabview {
    height: 100vh;
    padding-left: 15px;
    padding-right: 15px;
    width: 100%;
    display: flex;
    flex-direction: column;
}

.tab-head {
    display: flex;
    align-items: center;
    gap: 10px;
}
</style>
