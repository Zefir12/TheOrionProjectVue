<script setup lang="ts">
import { Gap } from "../../../lib/zefir/types";

defineProps<{
    justify?: "space-between" | "flex-start" | "flex-end" | "center";
    bg?: string;
    gap?: Gap | string;
    pt?: string;
    pr?: string;
    pl?: string;
    pb?: string;
    mt?: string;
    mr?: string;
    ml?: string;
    mb?: string;
}>();
</script>

<template>
    <div
        class="z-group-container"
        :style="{
            justifyContent: justify ?? 'center',
            backgroundColor: bg,
            gap: `var(--zefir-spacing-${gap ?? 'md'})`,
            paddingTop: pt,
            paddingLeft: pl,
            paddingRight: pr,
            paddingBottom: pb,
            marginLeft: ml,
            marginRight: mr,
            marginTop: mt,
            marginBottom: mb,
        }"
    >
        <slot></slot>
    </div>
</template>

<style scoped>
.z-group-container {
    display: flex;
    flex-direction: row;
    overflow: hidden;
    padding: 0px;
    margin: 0px;
    height: auto;
    width: auto;
}
</style>
