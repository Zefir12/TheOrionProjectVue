<template>
    <div class="item-div" :style="{ height: `${props.itemSize}px` }">
        <Select :style="{ width: '100px' }" v-model="itemModel.name" :options="itemModel.tags"></Select>
        <input v-model="itemModel.name" />
        {{ itemModel.name + " : " + itemModel.id }}
        <button @click="$emit('delete', itemModel.id)">X</button>
    </div>
</template>

<script setup lang="ts">
import Select, { SelectOption } from "@/components/global/Select.vue";
export interface IItem {
    id: number;
    name: string;
    tags: SelectOption[];
}
const emit = defineEmits<{
    delete: [number];
}>();
const itemModel = defineModel<IItem>({ required: true });
const props = withDefaults(
    defineProps<{
        itemSize?: number;
    }>(),
    {
        itemSize: 50
    }
);
</script>

<style scoped>
.item-div {
    width: 100%;
    border-style: solid;
    border: none;
    border-bottom: 1px solid #000;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    gap: 10px;
    align-items: center;
}
</style>
