<template>
    <BaseModal v-model="model">
        <div :style="{ height: '90vh', display: 'flex', flexDirection: 'column', gap: '10px' }">
            <Group>
                <div>RIR</div>
                <StyledNumberInput />
            </Group>
            <Group>
                <div>Weight</div>
                <StyledNumberInput />
            </Group>
            <Group>
                <div>Reps</div>
                <StyledNumberInput :step="1" />
            </Group>
            <Group>
                <div>Is warmup?</div>
                <input type="checkbox" />
            </Group>
            <Group>
                <StyledButton name="Cancel" @click="model = false" />
                <StyledButton name="Save" @click="addSet" />
            </Group>
        </div>
    </BaseModal>
</template>
<script setup lang="ts">
import BaseModal from "@/components/global/BaseModal.vue";
import Group from "@/components/global/containers/Group.vue";
import StyledButton from "@/components/global/StyledButton.vue";
import StyledNumberInput from "@/components/global/StyledNumberInput.vue";
import { addSetToExercise } from "@/lib/supabase/services/supabaseActivityService.ts";
import { useActivityStore } from "@/stores/activityStore";

const model = defineModel();
const activityStore = useActivityStore();
const emit = defineEmits(["added"]);

const addSet = () => {
    addSetToExercise(activityStore.currentExercise?.id!, 10, null, 55, false, 1, activityStore.currentExercise?.exercise_type_id!);
    activityStore.RefreshData();
    emit("added");
    model.value = false;
};
</script>
