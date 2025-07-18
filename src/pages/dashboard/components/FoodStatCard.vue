<template>
    <div class="stat-card" :style="{ '--border-color': overtreshold() ? '#008000' : '#444444' }">
        <div class="cog-icon no-select" @click="emit('cogClicked')"><IconSettings color="grey" :size="28" stroke-width="2" /></div>
        <div v-if="overtreshold()" class="check-icon"><IconCircleCheck :color="'green'" :size="28" stroke-width="2" /></div>
        <div :style="{ display: 'flex', alignItems: 'center' }">
            <component
                @click="if (iconClickable) emit('iconClicked');"
                :style="{ cursor: props.iconClickable ? 'pointer' : 'default' }"
                v-if="props.icon"
                :is="props.icon"
                size="40"
                stroke-width="2"
                :color="props.color || '#045dc2'"
            />
            <div :style="{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }">
                <div class="subtitle">
                    <NumberAnimationWrapper :decimals="props.decimals" :value="props.value / (props.scale ?? 1)" :suffix="` / ${props.treshold / (props.scale ?? 1)}${props.suffix ?? ''}`" />
                </div>
                <div class="normal-text">{{ props.subtitle }}</div>
            </div>
        </div>
        <ProgressBar class="custom-bar" :style="{ '--bar-color': false ? '#008000' : props.color }" :mode="'determinate'" :show-value="true" :value="(props.value / props.treshold) * 100"
            ><div :style="{ marginLeft: '40px' }"><NumberAnimationWrapper :value="(props.value / props.treshold) * 100" suffix="%" /></div
        ></ProgressBar>
    </div>
</template>

<script setup lang="ts">
import ProgressBar from "primevue/progressbar";
import NumberAnimationWrapper from "@/components/global/NumberAnimationWrapper.vue";
import { IconSettings, IconCircleCheck } from "@tabler/icons-vue";

const emit = defineEmits(["cogClicked", "iconClicked"]);

const props = defineProps<{
    subtitle?: string;
    value: number;
    treshold: number;
    tresholdType?: "over" | "under"; // 'water', 'kcal', 'protein'
    color?: string;
    icon?: any;
    suffix?: string;
    scale?: number;
    decimals?: number;
    iconClickable?: boolean; // If true, the icon will emit an event when clicked
}>();

const overtreshold = () => {
    if (props.tresholdType != "under") {
        return props.value > props.treshold;
    } else {
        return props.value < props.treshold;
    }
};
</script>

<style scoped>
.cog-icon {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    transform-origin: 50% 42.5%; /* ensure rotation is centered */
}

.check-icon {
    position: absolute;
    top: 10px;
    right: 40px;
    transform-origin: 50% 42.5%; /* ensure rotation is centered */
}

@keyframes rotator {
    0% {
        transform: rotate(0deg) scale(1.1);
    }
    100% {
        transform: rotate(360deg) scale(1.1);
    }
}

.cog-icon:hover {
    animation: rotator 01.34s linear infinite;
}

::v-deep(.custom-bar .p-progressbar-value.p-progressbar-value-animate) {
    background-color: var(--bar-color);
    display: flex;
    justify-content: start;
}

::v-deep(.p-progressbar-label) {
    color: #fff;
}

::v-deep(.p-progressbar-determinate .p-progressbar-value-animate) {
    transition: width 0.3s ease-in-out;
}

.subtitle {
    font-weight: 700;
}

.normal-text {
    font-size: 12px;
}

.stat-card {
    background: #1f1c1c;
    border-radius: 8px;
    padding: 1rem;
    border: var(--border-color) 2px solid;
    box-shadow: 0 2px 8px rgba(25, 99, 10, 0.1);
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    max-width: 600px;
    transition: all 0.3s ease;
    position: relative;
}

.stat-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}
</style>
