<template>
    <div>
        <ConfirmFinishModal v-model="confirmFinishModalOpen" @finished="emit('switchSubview', 0)" />
        <AddExcerciseModal v-model="addExcerciseModalOpen" @added="refreshExercises" />
        <AddSetModal v-model="addSetModalOpen" @added="refreshExercises" />
        <div class="container">
            <Group :style="{ width: '100%' }">
                <StyledButton name="Finish Workout" @click="confirmFinishModalOpen = true" />
                <StyledButton name="Load Plan" :disabled="true" />
                <IconButton @click="emit('switchSubview', 0)" :style="{ width: '5.5rem' }" />
            </Group>
            <StyledButton name="Add Excercise" @click="addExcerciseModalOpen = true" />
            <div :style="{ display: 'flex', flexDirection: 'column', width: '100%', gap: '10px' }">
                <div class="exercise" v-for="exercise in exercises">
                    <div>{{ activityStore.GetExerciseNameById(exercise.exercise_type_id) }}</div>

                    <IconButton :style="{ position: 'absolute', left: '4px', top: '4px', borderRadius: '10px' }" @click="openSetModal(exercise)" />
                    <IconTrash :style="{ position: 'absolute', right: '10px', top: '7px', borderRadius: '10px', cursor: 'pointer' }" size="30" @click="removeExerciseFromActivity(exercise)" />
                    <div v-if="exercise.gym_exercise_sets.length > 0" class="set-container">
                        <div class="set" v-for="set in exercise.gym_exercise_sets">
                            <Group justify="space-between" :align="'center'">
                                <div>{{ set.set_number + "." }}</div>
                                <div>{{ "W: " + set.weight + "kg" }}</div>
                                <div>{{ "Reps: " + set.reps }}</div>
                                <div>{{ "RIR: " + (set.rir ?? "-") }}</div>
                                <input type="checkbox" v-model="set.is_warmup" :disabled="true" />
                                <IconTrash size="24" @click="removeSetFromExercise(set.id)" :style="{ cursor: 'pointer' }" />
                            </Group>
                        </div>
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
import { getExercisesForActivity, GymExerciseWithSets, removeExercise, removeSet } from "@/lib/supabase/services/supabaseActivityService.ts";
import AddSetModal from "../components/AddSetModal.vue";
import { IconTrash } from "@tabler/icons-vue";

const activityStore = useActivityStore();
const confirmFinishModalOpen = ref(false);
const addExcerciseModalOpen = ref(false);
const addSetModalOpen = ref(false);
const exercises = ref<GymExerciseWithSets[]>([]);

const emit = defineEmits(["switchSubview"]);

const refreshExercises = async () => {
    const result = await getExercisesForActivity(activityStore.currentSession?.id!);
    exercises.value = result;
};

const removeExerciseFromActivity = async (exercise: GymExerciseWithSets) => {
    await removeExercise(exercise.id);
    await refreshExercises();
};

const removeSetFromExercise = async (set_id: number) => {
    await removeSet(set_id);
    await refreshExercises();
};

const openSetModal = (exercise: GymExerciseWithSets) => {
    activityStore.currentExercise = exercise;
    addSetModalOpen.value = true;
};

onMounted(async () => {
    await refreshExercises();
});
</script>

<style scoped>
.set-container {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.set {
    background-color: rgb(44, 44, 44);
    padding: 6px;
    border-radius: 8px;
}

.exercise {
    background-color: #1f1c1c;
    padding: 12px;
    border-radius: 12px;
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 16px;
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
