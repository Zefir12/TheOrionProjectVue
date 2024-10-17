<script setup lang="ts">
import InputText from "primevue/inputtext";

const props = defineProps<{ label?: String; disabled?: boolean }>();
const model = defineModel({ required: false, default: "" });
</script>
<template>
    <div class="styled-number-input-container">
        <small class="small-label">{{ props.label }}</small>
        <InputText class="my-input" :disabled="props.disabled" v-model="model" />
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
