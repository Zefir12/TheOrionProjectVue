<template>
    <BaseModal v-model="model">
        <Calendar :style="{ width: '100%' }" id="calendar-24h" showTime v-model="date" hour-format="24" show-icon icon-display="input" dateFormat="dd/mm/yy" />
        <Group>
            <StyledButton name="Cancel" @click="model = false" />
            <StyledButton name="Finish" @click="finish" />
        </Group>
    </BaseModal>
</template>
<script setup lang="ts">
import BaseModal from "@/components/global/BaseModal.vue";
import Calendar from "primevue/calendar";
import Group from "@/components/global/containers/Group.vue";
import StyledButton from "@/components/global/StyledButton.vue";
import { ref } from "vue";
import { useActivityStore } from "@/stores/activityStore";

const date = ref(new Date(Date.now()));
const activityStore = useActivityStore();
const emit = defineEmits(["finished"]);

const finish = async () => {
    await activityStore.finishCurrentSession(date.value);
    activityStore.RefreshData();
    emit("finished");
};

const model = defineModel();
</script>
