<template>
    <div v-if="model" class="modal">
        <div class="modal-content">
            <IconX @click="model = false" class="icon-x" :size="32" :stroke-width="3" />
            <div :style="{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }">
                <h4 :style="{ marginTop: '-10px' }">Dzienne kalorie</h4>
                <StyledNumberInput v-model="kcalTreshold" :max-fraction-digits="0" :step="1" :style="{ width: '120px' }" />
                <StyledButton :name="'Zapisz'" :width="'120px'" @click="setKcal(kcalTreshold)" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import StyledButton from "@/components/global/StyledButton.vue";
import StyledNumberInput from "@/components/global/StyledNumberInput.vue";
import { useUserStore } from "@/stores/userStore";
import { IconX } from "@tabler/icons-vue";
import { ref, watch } from "vue";

const userStore = useUserStore();

const kcalTreshold = ref(userStore.userDailyStats.calories);

const setKcal = async (value: number) => {
    await userStore.setKcalTreshold(value);
    model.value = false;
};

watch(
    () => userStore.userDailyStats.calories,
    (newValue) => {
        kcalTreshold.value = newValue;
    },
    { immediate: true }
);

const model = defineModel<boolean>({ default: false, required: true });
</script>

<style scoped>
.modal {
    position: fixed;
    z-index: 10000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0, 0, 0);
    background-color: rgba(0, 0, 0, 0.4);
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
    border-radius: 0.5rem;
    height: 10rem;
    width: 20rem;
    position: relative;
}
</style>
