<template>
    <div class="cont">
        <component class="over-icon" :is="props.icon" :size="32" :stroke-width="2" color="grey" />
        <component class="icon" :is="props.icon" :size="32" :stroke-width="2" color="grey" />
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    icon: any;
}>();
</script>

<style scoped>
.cont {
    height: 3rem;
    width: 3rem;
    background-color: #3f3f3f;
    border-radius: 8px;
    display: grid;
    place-items: center;
    cursor: pointer;
    position: relative;
}
.over-icon {
    stroke: rgba(255, 255, 255, 0.705);
    opacity: 0;
    transition: all 200ms;
}

.cont:hover .over-icon {
    opacity: 1;
}

.icon {
    position: absolute;
}

.cont:hover .icon {
    stroke: rgb(158, 158, 158); /* Affect the svg stroke color */
    filter: blur(4px);
}
</style>
