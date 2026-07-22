<template>
    <BaseModal closeOnBackdrop v-model="model">
        <Stack>
            <StyledButton :disabled="true" name="Set as warmup" />
            <StyledButton :disabled="true" name="Set as normal" />
            <StyledButton name="Delete" @click="deleteSet" />
        </Stack>
    </BaseModal>
</template>
<script setup lang="ts">
import BaseModal from "@/components/global/BaseModal.vue";

import StyledButton from "@/components/global/StyledButton.vue";
import { useActivityStore } from "@/stores/activityStore";
import Stack from "@/components/global/containers/Stack.vue";
import { removeSet } from "@/lib/supabase/services/supabaseActivityService.ts";

const activityStore = useActivityStore();
const emit = defineEmits(["refreshExercise"]);

const deleteSet = async () => {
    await removeSet(activityStore.currentSet?.id!);
    emit("refreshExercise");
    model.value = false;
};

const model = defineModel();
</script>
