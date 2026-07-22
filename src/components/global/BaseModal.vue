<template>
    <div v-if="model" class="modal" @click="handleBackdropClick">
        <div class="modal-content" @click.stop>
            <slot />
            <!-- Content will go here -->
        </div>
    </div>
</template>

<script setup lang="ts">
const model = defineModel();

// Prop to control backdrop click behavior
const props = defineProps<{
    closeOnBackdrop?: boolean;
}>();

// Handle clicks on backdrop
function handleBackdropClick() {
    if (props.closeOnBackdrop) {
        model.value = false;
    }
}
</script>

<style scoped>
.modal {
    position: fixed;
    z-index: 100;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 0.5rem;
    height: auto;
    width: 20rem;
    position: relative;
}
</style>
