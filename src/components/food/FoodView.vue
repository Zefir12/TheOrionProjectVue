<script setup lang="ts">
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import { IconChefHat, IconFridge, IconSettings } from "@tabler/icons-vue";
import AddFoodView from "./subviews/AddFoodView.vue";
import CreateNewFoodView from "./subviews/CreateNewFoodView.vue";
</script>
<template>
    <TabView class="tabview">
        <TabPanel>
            <template #header>
                <div class="tab-head">
                    <IconFridge size="24" stroke-width="2" />
                    <span class="font-bold white-space-nowrap">Add Food</span>
                </div>
            </template>
            <AddFoodView />
        </TabPanel>
        <TabPanel>
            <template #header>
                <div class="tab-head">
                    <IconChefHat size="24" stroke-width="2" />
                    <span class="font-bold white-space-nowrap">Create New Food</span>
                </div>
            </template>
            <CreateNewFoodView />
        </TabPanel>
        <TabPanel :disabled="true">
            <template #header>
                <div class="tab-head">
                    <IconSettings size="24" stroke-width="2" />
                    <span class="font-bold white-space-nowrap">Ioni Bowcher</span>
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
    width: 100vw;
    display: flex;
    flex-direction: column;
}

.tab-head {
    display: flex;
    align-items: center;
    gap: 10px;
}
</style>
