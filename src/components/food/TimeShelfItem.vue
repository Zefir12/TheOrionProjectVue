<template>
    <div class="time-shelf-item">{{ props.name }}</div>
</template>
<script setup lang="ts">
const props = defineProps<{
    name: string;
}>();
</script>
<style scoped>
.time-shelf-item {
    width: 60px;
    height: 30px;
    border-width: 1px;
    background-color: rgb(87, 30, 95);
    border-radius: 3px;
    border-style: solid;
    border-color: black;

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
    text-align: center;
}
</style>
