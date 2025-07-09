<template>
    <div v-if="model" class="modal">
        <div class="modal-content">
            <IconX @click="model = false" class="icon-x" :size="32" :stroke-width="3" />
            <div>Dodaj szklanki wody</div>

            <div :style="{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }">
                <StyledNumberInput v-model="amount" :max-fraction-digits="1" :step="1" :style="{ width: '120px' }" />
                <StyledButton @click="addWaterGlass" name="Add" :width="'200px'" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import StyledButton from "@/components/global/StyledButton.vue";
import StyledNumberInput from "@/components/global/StyledNumberInput.vue";
import { IconX } from "@tabler/icons-vue";
import { ref } from "vue";
import { addFood } from "../../../lib/supabase/services/supabaseFoodService";
import { useDashboardStore } from "../store/dashboardStore";

const dashboardStore = useDashboardStore();

const addWaterGlass = async () => {
    await addFood([
        {
            food_id: 183,
            food_amount: 250 * amount.value,
            time_of_intake: new Date().toISOString(),
            intake_time_accuracy: 0
        }
    ]);
    await dashboardStore.refreshDashboard();
    amount.value = 1; // Reset the amount to 1 after adding
    model.value = false;
};

const model = defineModel<boolean>({ default: false, required: true });
const amount = ref(1);
</script>

<style scoped>
.modal {
    position: fixed; /* Stay in place */
    z-index: 10000; /* Sit on top */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0, 0, 0); /* Fallback color */
    background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
    display: flex;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(5px);
}

.icon-x {
    position: absolute;
    top: 0.8rem;
    right: 1rem;
    cursor: pointer;
}

.modal-content {
    background-color: #312e2e;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 0.5rem;
    height: 16rem;
    width: 20rem;
    position: relative;
}
</style>
