<script setup lang="ts">
import Button from "primevue/button";
type Booleanish = boolean | "false" | true;
const props = defineProps<{ name?: string; disabled?: Booleanish; width?: string | undefined }>();
defineEmits(["click"]);
</script>

<template>
    <Button :style="{ width: width }" class="my-button" :disabled="props.disabled" text @click="$emit('click')">
        <div class="my-button-text-container">
            {{ name ?? "Button" }}
        </div>
    </Button>
</template>

<style scoped>
.my-button-text-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0;
    height: 100%;
    overflow: hidden;
}

.my-button {
    padding-top: 0;
    padding-bottom: 0;
    padding-left: 18px;
    padding-right: 18px;
    background: #7950f226;
    color: #b197fc;
    font-weight: 600;
    line-height: 1;
    text-align: center;
    /* overflow: hidden; */
    width: 100%;
    cursor: pointer;
    border-radius: 4px;
    font-size: var(--zefir-font-size-sm);
    transition: 20ms;
    transition-timing-function: linear;
    min-height: 2.25rem;
    justify-content: center;
    font-family:
        -apple-system,
        BlinkMacSystemFont,
        Segoe UI,
        Roboto,
        Helvetica,
        Arial,
        sans-serif,
        Apple Color Emoji,
        Segoe UI Emoji;
}

.my-button:disabled {
    background-color: #2e2e2e;
    color: #696969;
}

.my-button:hover:enabled {
    background-color: rgba(132, 94, 247, 0.2);
}
</style>
