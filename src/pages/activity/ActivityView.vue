<template>
    <div class="container">
        <div class="card" :class="!activeSession ? 'card-small' : 'card-session'">
            <div @click="createSession" v-if="!activeSession" :style="{ width: '100%', height: '100%' }">Create new session</div>
            <div class="session-container" v-else>
                <div class="session-column">
                    <div>Create new workout</div>
                    <Select width="12rem" label="Select mode" :options="options" />
                    <Group>
                        <StyledButton name="Create" />
                        <StyledButton name="Cancel" @click="cancelCreateSession" />
                    </Group>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import StyledButton from "@/components/global/StyledButton.vue";
import Group from "@/components/global/containers/Group.vue";
import Select from "@/components/global/Select.vue";

const activeSession = ref(false);
const options = [
    { name: "Weights", value: 0 },
    { name: "Cardio", value: 1 },
    { name: "Sports", value: 2 }
];

const createSession = () => {
    activeSession.value = true;
};

const cancelCreateSession = () => {
    activeSession.value = false;
};
</script>

<style scoped>
.container {
    margin-top: 10px;
    width: 100%;
    display: flex;
    justify-content: center;
}

.session-container {
    position: relative;
    width: 100%;
    height: 100%;
}

.card {
    width: min(100%, 24rem);
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
    justify-content: space-around;
    height: 100%;
    width: 100%;
}

.card-small {
    cursor: pointer;
    height: 3rem;
    transition: background-color 1s;
}

.card-session {
    height: 10rem;
}

.card-small:hover {
    background-color: #383636;
    transition: background-color 0s;
}
</style>
