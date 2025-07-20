<template>
    <div>
        <ConfirmFinishModal v-model="confirmFinishModalOpen" @finished="emit('switchSubview', 0)" />
        <AddExcerciseModal v-model="addExcerciseModalOpen" @added="refreshExercises" />
        <AddSetModal v-model="addSetModalOpen" @added="refreshExercises" />
        <EditSetModal v-model="editSetModalOpen" @refresh-exercise="refreshExercises" />
        <EditExerciseModal v-model="editExerciseModalOpen" @refresh-exercise="refreshExercises" />
        <div class="container">
            <Group :style="{ width: '100%' }">
                <StyledButton name="Finish Workout" @click="confirmFinishModalOpen = true" />
                <StyledButton name="Load Plan" :disabled="true" />
                <IconButton @click="emit('switchSubview', 0)" :style="{ width: '5.5rem' }" :icon="IconX" />
            </Group>

            <div :style="{ display: 'flex', flexDirection: 'column', width: '100%', gap: '10px' }">
                <div class="exercise" v-for="exercise in exercises">
                    <div>{{ activityStore.GetExerciseNameById(exercise.exercise_type_id) }}</div>

                    <IconDotsVertical
                        :style="{ position: 'absolute', right: '10px', top: '10px', borderRadius: '10px', cursor: 'pointer' }"
                        stroke-width="2"
                        size="24"
                        @click="openEditExerciseModal(exercise)"
                    />
                    <div v-if="exercise.gym_exercise_sets.length > 0" class="set-container">
                        <table style="border-collapse: collapse; margin-right: -12px; margin-left: -12px">
                            <thead :style="{ color: 'grey', fontSize: '10px' }">
                                <tr>
                                    <th>#</th>
                                    <th>
                                        <div :style="{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }"><IconWeight size="20" stroke-width="2" />KG</div>
                                    </th>
                                    <th>REPS</th>
                                    <th>RIR</th>
                                    <th style="width: 50px; height: 100%"><IconCheck size="22" /></th>
                                </tr>
                            </thead>
                            <tbody style="font-size: small">
                                <tr :style="{ backgroundColor: set.done ? '#104d0e' : '', height: '36px' }" v-for="set in exercise.gym_exercise_sets" :key="set.id">
                                    <td>
                                        <div style="cursor: pointer" @click="openEditSetModal(set)">{{ set.set_number }}</div>
                                    </td>
                                    <td><input type="text" inputmode="numeric" pattern="[0-9]*" class="text-input" style="width: 2rem" v-model="set.weight" /></td>
                                    <td><input type="text" inputmode="numeric" pattern="[0-9]*" class="text-input" style="width: 2rem" v-model="set.reps" /></td>
                                    <td>{{ set.rir ?? "-" }}</td>
                                    <td :style="{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '36px' }">
                                        <div :style="{ backgroundColor: set.done ? 'green' : 'grey', width: '22px', height: '22px', borderRadius: '6px' }">
                                            <IconCheck size="22" stroke-width="1.5" :color="set.done ? 'white' : 'white'" @click="markSetDoneInExercise(set)" :style="{ cursor: 'pointer' }" />
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <StyledButton style="background-color: #242424" name="+ Add Set" @click="openSetModal(exercise)" />
                </div>
            </div>
            <StyledButton style="width: 90%" name="Add Excercise" @click="addExcerciseModalOpen = true" />
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
import { getExercisesForActivity, GymExerciseWithSets, markSetDone } from "@/lib/supabase/services/supabaseActivityService.ts";
import AddSetModal from "../components/AddSetModal.vue";
import { IconX, IconWeight, IconCheck, IconDotsVertical } from "@tabler/icons-vue";
import { Tables } from "@/lib/supabase/supabase/supabaseSchemas/supaDatabaseExtensions";
import EditSetModal from "../components/EditSetModal.vue";
import EditExerciseModal from "../components/EditExerciseModal.vue";

const activityStore = useActivityStore();
const confirmFinishModalOpen = ref(false);
const addExcerciseModalOpen = ref(false);
const addSetModalOpen = ref(false);
const editSetModalOpen = ref(false);
const editExerciseModalOpen = ref(false);
const exercises = ref<GymExerciseWithSets[]>([]);

const emit = defineEmits(["switchSubview"]);

const refreshExercises = async () => {
    const result = await getExercisesForActivity(activityStore.currentSession?.id!);
    exercises.value = result;
};

const markSetDoneInExercise = async (set: Tables<"gym_exercise_sets">) => {
    navigator.vibrate(200);
    await markSetDone(set.id, !set.done);
    await refreshExercises();
};

const openEditExerciseModal = (exercise: GymExerciseWithSets) => {
    activityStore.currentExercise = exercise;
    editExerciseModalOpen.value = true;
};

const openEditSetModal = (set: Tables<"gym_exercise_sets">) => {
    activityStore.currentSet = set;
    editSetModalOpen.value = true;
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
.text-input {
    background: transparent; /* no background */
    text-align: center;
    border: none; /* no border */
    outline: none; /* no blue outline */
    color: inherit; /* use parent text color */
    font: inherit; /* match parent font */
    width: 100%; /* fill container if needed */
}

.text-input::placeholder {
    color: rgba(255, 255, 255, 0.4); /* faint placeholder text */
}

tr:nth-child(even) {
    background-color: #222222; /* Light Grey */
}
tr:nth-child(odd) {
    background-color: #a9a9a900; /* Dark Grey */
}
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
    width: min(100%, 28rem);
}
</style>
