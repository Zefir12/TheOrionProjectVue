<template>
    <BaseModal v-model="model">
        <div :style="{ height: '90vh', display: 'flex', flexDirection: 'column', gap: '10px' }">
            <Group>
                <StyledButton name="Cancel" @click="model = false" />
            </Group>
            <StyledButton v-for="exercise in activityStore.gymExerciseTypes" :key="exercise.id" :name="exercise.name" @click="addExercise(exercise.id)" />
        </div>
    </BaseModal>
</template>
<script setup lang="ts">
import BaseModal from "@/components/global/BaseModal.vue";
import Group from "@/components/global/containers/Group.vue";
import StyledButton from "@/components/global/StyledButton.vue";
import { addExerciseToActivity } from "@/lib/supabase/services/supabaseActivityService.ts";
import { useActivityStore } from "@/stores/activityStore";

const model = defineModel();
const activityStore = useActivityStore();
const emit = defineEmits(["added"]);

const addExercise = async (exercise_type_id: number) => {
    await addExerciseToActivity(exercise_type_id, activityStore.currentSession?.id!);
    emit("added");
    model.value = false;
};
</script>
