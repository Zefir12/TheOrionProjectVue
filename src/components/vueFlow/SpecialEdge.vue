<script setup lang="ts">
import type { EdgeProps } from "@vue-flow/core";
import { BezierEdge } from "@vue-flow/core";

// props were passed from the slot using `v-bind="customEdgeProps"`
defineProps<EdgeProps<any>>();
</script>

<script lang="ts">
export default {
    name: "CustomEdge"
};
</script>

<template>
    <BezierEdge :source-x="sourceX" :source-y="sourceY" :target-x="targetX" :target-y="targetY" :source-position="sourcePosition" :target-position="targetPosition" />
</template>
