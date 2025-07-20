<template>
    <div>
        <ConfirmFinishModal v-model="confirmFinishModalOpen" @finished="emit('switchSubview', 0)" />
        <AddExcerciseModal v-model="addExcerciseModalOpen" @added="refreshExercises" />
        <AddSetModal v-model="addSetModalOpen" @added="refreshExercises" />
        <div class="container">
            <Group :style="{ width: '100%' }">
                <StyledButton name="Finish Workout" @click="confirmFinishModalOpen = true" />
                <StyledButton name="Load Plan" />
                <IconButton @click="emit('switchSubview', 0)" :style="{ width: '5.5rem' }" />
            </Group>
            <StyledButton name="Add Excercise" @click="addExcerciseModalOpen = true" />
            <div :style="{ display: 'flex', flexDirection: 'column', width: '100%', gap: '10px' }">
                <div class="exercise" v-for="exercise in exercises">
                    {{ activityStore.GetExerciseNameById(exercise.exercise_type_id) }}
                    <IconButton @click="openSetModal(exercise)" />
                    <div class="set-container">
                        <pre class="json-div" v-for="set in exercise.gym_exercise_sets">{{ set }}</pre>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Group from "@/components/global/containers/Group.vue";
import IconButton from "@/components/global/IconButton.vue";
import StyledButton from "@/components/global/StyledButton.vue";
import { useActivityStore } from "@/stores/activityStore";
import ConfirmFinishModal from "../components/ConfirmFinishModal.vue";
import { onMounted, ref } from "vue";
import AddExcerciseModal from "../components/AddExcerciseModal.vue";
import { getExercisesForActivity } from "@/lib/supabase/services/supabaseActivityService.ts";
import { Tables } from "@/lib/supabase/supabase/supabaseSchemas/supaDatabaseExtensions";
import AddSetModal from "../components/AddSetModal.vue";

const activityStore = useActivityStore();
const confirmFinishModalOpen = ref(false);
const addExcerciseModalOpen = ref(false);
const addSetModalOpen = ref(false);
const exercises = ref<Tables<"gym_exercises">[]>([]);

const emit = defineEmits(["switchSubview"]);

const refreshExercises = async () => {
    const result = await getExercisesForActivity(activityStore.currentSession?.id!);
    exercises.value = result;
};

const openSetModal = (exercise: Tables<"gym_exercises">) => {
    activityStore.currentExercise = exercise;
    addSetModalOpen.value = true;
};

onMounted(async () => {
    await refreshExercises();
});
</script>

<style scoped>
.json-div {
    width: 100%;
    height: 100%;
    overflow: auto;
    padding: 1rem;
    color: white;
    font-family: monospace;
    font-size: 0.9rem;
    text-align: left;

    white-space: pre-wrap;
    word-wrap: break-word;
    overflow-wrap: anywhere;
}

.json-div pre {
    white-space: pre-wrap; /* Allow wrapping inside <pre> */
    word-wrap: break-word; /* Break long words if needed */
}

.exercise {
    background-color: #1f1c1c;
    padding: 12px;
    border-radius: 12px;
    width: 100%;
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
    width: min(100%, 24rem);
}
</style>
