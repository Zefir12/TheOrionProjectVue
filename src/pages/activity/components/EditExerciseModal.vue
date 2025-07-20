<template>
    <BaseModal closeOnBackdrop v-model="model">
        <Stack>
            <StyledButton name="Delete" @click="deleteExercise" />
        </Stack>
    </BaseModal>
</template>
<script setup lang="ts">
import BaseModal from "@/components/global/BaseModal.vue";

import StyledButton from "@/components/global/StyledButton.vue";
import { useActivityStore } from "@/stores/activityStore";
import Stack from "@/components/global/containers/Stack.vue";
import { removeExercise } from "@/lib/supabase/services/supabaseActivityService.ts";

const activityStore = useActivityStore();
const emit = defineEmits(["refreshExercise"]);

const deleteExercise = async () => {
    await removeExercise(activityStore.currentExercise?.id!);
    emit("refreshExercise");
    model.value = false;
};

const model = defineModel();
</script>
