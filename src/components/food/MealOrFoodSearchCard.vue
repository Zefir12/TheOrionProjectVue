<template>
    <div :class="disabled ? 'z-card-container-disabled' : 'z-card-container'" v-if="visible" :disabled="disabled" @click="if (!disabled) $emit('click');" :name="name">
        <div class="z-inside-container">
            <p>{{ name }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{ name: string | undefined; visible?: boolean; disabled?: boolean; color?: string }>();
defineEmits(["click"]);
</script>

<style scoped>
.z-inside-container {
    max-width: 6rem;
    max-height: 6rem;

    overflow: hidden;
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
    font-size: 10px;
}

.z-card-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-width: 8rem;
    min-height: 8rem;
    background: rgb(41, 41, 41);
    border-style: groove;
    border-color: rgb(0, 0, 0, 0.3);
    border-radius: 5px;
    border-width: 1px;
    padding: 0.5rem;
    /* color: #d0bfff; */
    /* color: #b197fc; */
    color: #ebebeb99;
    margin: 1px;
}
.z-card-container:hover {
    cursor: pointer;
    background-color: rgba(132, 94, 247, 0.2);
}

.z-card-container-disabled {
    cursor: not-allowed;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-width: 8rem;
    min-height: 8rem;
    background: rgb(27, 27, 27);
    border-style: groove;
    border-color: rgba(0, 0, 0, 0.548);
    border-radius: 5px;
    border-width: 1px;
    padding: 0.5rem;
    /* color: #d0bfff; */
    /* color: #b197fc; */
    color: #ebebeb99;
    margin: 1px;
}
</style>
