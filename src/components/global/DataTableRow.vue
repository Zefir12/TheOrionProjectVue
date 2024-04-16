<template>
    <tr class="zefir-table-row">
        <td class="zefir-table-item" v-for="header in headers">
            {{ item?.[header.key] }}
        </td>
    </tr>
</template>

<script setup lang="ts">
import { HeaderItem } from "./DataTable.vue";

defineProps<{ item: any; headers: HeaderItem[] }>();
</script>

<style scoped>
.zefir-table-item {
    text-align: left;
    padding: 10px;
    border-top: 1px;
    border-bottom: 0px;
    border-right: 0px;
    border-left: 0px;
    border-color: rgba(0, 0, 0, 0.151);
    border-style: solid;
}
.zefir-table-row:nth-child(even) {
    background-color: rgba(137, 43, 226, 0.05);
}
</style>
