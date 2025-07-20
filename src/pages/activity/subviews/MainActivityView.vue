<template>
    <div class="main-cont">
        <div class="container">
            <div class="card" :class="!activeSession ? 'card-small' : 'card-session'">
                <div @click="createSession" v-if="!activeSession" :style="{ width: '100%', height: '100%' }">Create new session</div>
                <div class="session-container" v-else>
                    <div class="session-column">
                        <div>Create new session</div>
                        <Select width="12rem" label="Select mode" :options="options" v-model="type" />
                        <Calendar :style="{ width: '12rem' }" id="calendar-24h" showTime v-model="date" hour-format="24" show-icon icon-display="input" dateFormat="dd/mm/yy" />
                        <Group>
                            <StyledButton name="Create" @click="addNewSession" />
                            <StyledButton name="Cancel" @click="cancelCreateSession" />
                        </Group>
                    </div>
                </div>
            </div>
            <ActiveSession v-for="session in activityStore.activities" :session="session" :key="session.id" @click="openActiveSession(session.id)" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import StyledButton from "@/components/global/StyledButton.vue";
import Group from "@/components/global/containers/Group.vue";
import Calendar from "primevue/calendar";
import Select, { SelectOption } from "@/components/global/Select.vue";
import { createActivity } from "@/lib/supabase/services/supabaseActivityService.ts";
import { TablesInsert } from "@/lib/supabase/supabase/supabaseSchemas/supaDatabase";
import { useToast } from "primevue/usetoast";
import ActiveSession from "../components/ActiveSession.vue";
import { useActivityStore } from "@/stores/activityStore";

const activeSession = ref(false);
const date = ref(new Date(Date.now()));

const toast = useToast();
const activityStore = useActivityStore();
activityStore.activities;

const emit = defineEmits(["switchSubview"]);

const openActiveSession = (id: number) => {
    activityStore.setCurrentSession(id);
    emit("switchSubview", 1);
};

const options = [
    { name: "Weights", value: 0 },
    { name: "Cardio", value: 1 },
    { name: "Sports", value: 2 }
];
const type = ref<SelectOption>(options[0]);

const addNewSession = async () => {
    const session = {
        active: true,
        finished_at: null,
        started_at: date.value.toUTCString(),
        type: type.value.name
    } as TablesInsert<"activity">;
    await createActivity(session);
    toast.add({ severity: "success", summary: "Succes", detail: "Succesfully created session", life: 1000 });
    await activityStore.RefreshData();
};

const createSession = () => {
    activeSession.value = true;
};

const cancelCreateSession = () => {
    activeSession.value = false;
};
</script>

<style scoped>
.main-cont {
}

.container {
    margin: auto;
    margin-top: 10px;
    width: 100%;
    display: flex;
    justify-content: start;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    width: min(100%, 28rem);
}

.session-container {
    position: relative;
    width: 100%;
    height: 100%;
}

.card {
    width: 100%;
    padding: 12px;
    background-color: #1f1c1c;
    border-radius: 12px;
    transition: height 0.8s;
    overflow: hidden;
}

.session-column {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    width: 100%;
}

.card-small {
    cursor: pointer;
    height: 3rem;
    transition: background-color 1s height 0.8s;
}

.card-session {
    height: 10rem;
}

.card-small:hover {
    background-color: #383636;
    transition: background-color 0s height 0.8s;
}
</style>
