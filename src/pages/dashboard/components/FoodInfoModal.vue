<template>
    <div v-if="model" class="modal">
        <div class="modal-content">
            <IconX @click="model = false" class="icon-x" :size="32" :stroke-width="3" />
            <div class="json-div">
                <pre v-if="porps.food">{{ JSON.stringify(porps.food, null, 2) }}</pre>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { FoodItem } from "../store/dashboardStore";
import { IconX } from "@tabler/icons-vue";

const model = defineModel<boolean>({ default: false, required: true });

const porps = defineProps<{
    food: FoodItem | null;
}>();
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
    border-radius: 0.5rem;
    height: 50rem;
    width: 50rem;
    position: relative;
}

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
</style>
