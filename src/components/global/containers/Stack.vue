<script setup lang="ts">
import { getGap } from "../../../lib/zefir/functions";
import { Gap } from "../../../lib/zefir/types";
defineProps<{
    justify?: "space-between" | "flex-start" | "flex-end" | "center" | "space-around";
    bg?: string;
    gap?: Gap | string;
    align?: "stretch" | "flex-start" | "flex-end" | "center";
    height?: string;
}>();
</script>

<template>
    <div class="z-stack-container" :style="{ justifyContent: justify ?? 'flex-start', alignContent: align ?? 'center', backgroundColor: bg, gap: getGap(gap), height: height }">
        <slot></slot>
    </div>
</template>

<style scoped>
.z-stack-container {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    padding: 0px;
    margin: 0px;
    height: auto;
    width: 100%;
}
</style>
