<template>
    <BaseModal v-model="model">
        <div :style="{ display: 'flex', flexDirection: 'column', gap: '10px' }">
            <Group>
                <div>RIR</div>
                <input type="text" v-if="useRir" inputmode="numeric" pattern="[0-9]*" class="text-input" style="width: 2rem" v-model="rir" />
                <input type="checkbox" v-model="useRir" />
            </Group>
            <Group>
                <div>Weight</div>
                <input type="text" inputmode="numeric" pattern="[0-9]*" class="text-input" style="width: 2rem" v-model="weight" />
            </Group>
            <Group>
                <div>Reps</div>
                <input type="text" inputmode="numeric" pattern="[0-9]*" class="text-input" style="width: 2rem" v-model="reps" />
            </Group>
            <Group>
                <div>Is warmup?</div>
                <input type="checkbox" v-model="isWarmup" />
            </Group>
            <Group>
                <div>Set number</div>
                <input type="text" inputmode="numeric" pattern="[0-9]*" class="text-input" style="width: 2rem" v-model="setNumber" />
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
import { addSetToExercise } from "@/lib/supabase/services/supabaseActivityService.ts";
import { useActivityStore } from "@/stores/activityStore";
import { ref, watch } from "vue";

const model = defineModel();
const activityStore = useActivityStore();
const emit = defineEmits(["added"]);

const reps = ref(0);
const weight = ref(0);
const setNumber = ref(0);
const isWarmup = ref(false);
const rir = ref(0);
const useRir = ref(false);

watch(
    () => activityStore.currentExercise,
    () => {
        setNumber.value = (activityStore.currentExercise?.gym_exercise_sets.length ?? 0) + 1;
        reps.value = 0;
        weight.value = 0;
        isWarmup.value = false;
        rir.value = 0;
        useRir.value = false;
    }
);

const addSet = async () => {
    await addSetToExercise(
        activityStore.currentExercise?.id!,
        reps.value,
        useRir.value ? rir.value : null,
        weight.value,
        isWarmup.value,
        setNumber.value,
        activityStore.currentExercise?.exercise_type_id!
    );
    await activityStore.RefreshData();
    emit("added");
    model.value = false;
};
</script>
