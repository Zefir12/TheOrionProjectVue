<template>
    <div>
        <span
            :style="{
                filter: animation ? 'blur(0.4px)' : 'none',
                transition: animation ? 'filter 0.4s ease-out' : '',
                opacity: animation ? 0.95 : 1
            }"
            >{{ displayedValue }}</span
        >{{ props.suffix }}
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const displayedValue = ref(0);
let animationFrameId: number | null = null; // Track the current animation

const animation = ref(false);

const props = defineProps<{
    value: number;
    suffix?: string; // Optional suffix to display after the number
    duration?: number; // Optional duration for the animation
    decimals?: number; // How many decimal places to show
}>();

// Easing function: ease-out cubic
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

watch(
    () => props.value,
    (newValue) => {
        // Cancel previous animation if still running
        if (animationFrameId !== null) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }

        const startValue = displayedValue.value;
        const endValue = newValue;
        const duration = props.duration || 500; // default 500ms
        const startTime = performance.now();

        const animate = (currentTime: number) => {
            animation.value = true; // Set animation state
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            const easedProgress = easeOutCubic(progress);

            // Interpolate with easing
            const interpolatedValue = startValue + (endValue - startValue) * easedProgress;

            // Round to decimals
            const factor = Math.pow(10, props.decimals ?? 1);
            displayedValue.value = Math.round(interpolatedValue * factor) / factor;

            if (progress < 1) {
                animationFrameId = requestAnimationFrame(animate);
            } else {
                animationFrameId = null; // Animation complete
                animation.value = false; // Reset animation state
            }
        };

        animationFrameId = requestAnimationFrame(animate);
    },
    { immediate: true }
);
</script>
