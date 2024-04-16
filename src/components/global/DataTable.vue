<template>
    <table class="zefir-table">
        <thead>
            <tr class="zefir-table-row-headers">
                <th class="zefir-table-head" v-for="head in headers">{{ head.name }}</th>
            </tr>
        </thead>
        <tbody class="zefir-table-body">
            <tr v-for="item in items" class="zefir-table-row">
                <td class="zefir-table-item" v-for="header in headers">
                    <slot :slotItem="item?.[header.key]" :name="header.key"> {{ item?.[header.key] }} </slot>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script setup lang="ts">
export interface HeaderItem {
    key: string;
    name: string;
}
defineProps<{ headers: HeaderItem[]; items: any[] }>();
</script>

<style scoped>
.zefir-table-body {
}
.zefir-table {
    border-collapse: collapse;
    width: 100%;
}
.zefir-table-head {
    text-align: left;
    padding: 10px;
}
.zefir-table-item {
    text-align: left;
    padding-left: 10px;
    max-width: 1000px;
    border-top: 0px;
    border-bottom: 0px;
    border-right: 0px;
    border-left: 0px;
    border-color: rgba(0, 0, 0, 0.151);
    border-style: solid;
}
.zefir-table-row-headers {
    position: sticky;
    top: 0;
    z-index: 1;
    background-color: rgb(58, 33, 82);
}
.zefir-table-row:nth-child(even) {
    background-color: rgba(137, 43, 226, 0.05);
}
.zefir-table-row:hover {
    background-color: rgba(137, 43, 226, 0.15);
}
</style>
