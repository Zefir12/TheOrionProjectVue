<script setup lang="ts">
import type { NodeProps } from "@vue-flow/core";
import { Position } from "@vue-flow/core";
import { Handle } from "@vue-flow/core";
import { CustomEvent } from "@vue-flow/core";

// props were passed from the slot using `v-bind="customNodeProps"`
const props = defineProps<NodeProps<object, CustomEvent>>();
</script>

<template>
    <div class="vue-flow__node-custom">
        <Handle type="target" :position="Position.Top" />
        <div>{{ props.data }}</div>
        <Handle type="source" :position="Position.Bottom" />
    </div>
</template>

<style scoped>
.vue-flow__node-custom {
    background: #9ca8b3;
    color: #fff;
    padding: 10px;
}
</style>
