<template>
    <div class="activity-card">
        <div>Currently Active</div>
        <div>{{ elapsedTime }}</div>
        <div>{{ props.session.type }}</div>
    </div>
</template>

<script setup lang="ts">
import { Tables } from "@/lib/supabase/supabase/supabaseSchemas/supaDatabaseExtensions";
import { computed, onMounted, onUnmounted, ref } from "vue";

const props = defineProps<{ session: Tables<"activity"> }>();

const startTime = new Date(props.session.started_at!); // Convert to Date
const now = ref(new Date());

// Update the `now` value every second
let interval: ReturnType<typeof setInterval>;

onMounted(() => {
    interval = setInterval(() => {
        now.value = new Date();
    }, 1000);
});

onUnmounted(() => {
    clearInterval(interval);
});

// Compute elapsed time (hh:mm:ss)
const elapsedTime = computed(() => {
    const diff = now.value.getTime() - startTime.getTime();
    const totalSeconds = Math.floor(diff / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
});

// Optional: format start time nicely
// const formattedStart = computed(() =>
//     startTime.toLocaleString(undefined, {
//         dateStyle: "medium",
//         timeStyle: "short"
//     })
// );
</script>

<style scoped>
.activity-card {
    padding: 12px;
    background-color: #1f1c1c;
    border-radius: 12px;
    display: flex;
    width: 100%;
    flex-direction: column;
}
</style>
