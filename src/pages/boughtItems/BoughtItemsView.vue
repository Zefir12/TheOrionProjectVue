<template>
    <TabView class="tabview">
        <TabPanel>
            <template #header>
                <div class="tab-head">
                    <IconClipboardPlus size="24" stroke-width="2" />
                    <span class="font-bold white-space-nowrap">{{ $t("BoughtItemsView.addItem") }}</span>
                </div>
            </template>
            <AddBoughtItems />
        </TabPanel>
        <TabPanel>
            <template #header>
                <div class="tab-head">
                    <IconListCheck size="24" stroke-width="2" />
                    <span class="font-bold white-space-nowrap">{{ $t("BoughtItemsView.addTemplate") }}</span>
                </div>
            </template>
            <AddBoughtItemsTemplate />
        </TabPanel>
    </TabView>
</template>

<script setup lang="ts">
import AddBoughtItemsTemplate from "./subviews/AddBoughtItemsTemplate.vue";
import AddBoughtItems from "./subviews/AddBoughtItem.vue";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import { IconListCheck, IconClipboardPlus } from "@tabler/icons-vue";
</script>

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
