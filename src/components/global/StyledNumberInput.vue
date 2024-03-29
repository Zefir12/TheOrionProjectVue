<script setup lang="ts">
import InputNumber from "primevue/inputnumber";
import { Nullable } from "primevue/ts-helpers";

const props = defineProps<{ label?: String }>();
const model = defineModel({ required: false, default: 0 });
</script>
<template>
    <div class="styled-number-input-container">
        <small class="small-label">{{ props.label }}</small>
        <InputNumber class="my-input" v-model="model" :showButtons="true" :min="0" :step="0.1" :useGrouping="false" :max-fraction-digits="3" />
    </div>
</template>

<style scoped>
.small-label {
    line-height: 1.2;
    font-size: x-small;
    color: #828282;
    margin: 0;
    padding-bottom: 2px;
}

.styled-number-input-container {
    overflow: hidden;
    width: auto;
    display: flex;
    text-align: left;
    flex-direction: column;
    gap: 0;
}

.my-input {
    width: 100%;
}
</style>
