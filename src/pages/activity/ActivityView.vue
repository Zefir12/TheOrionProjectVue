<template>
    <div class="subview-container">
        <transition :name="transitionName" mode="out-in">
            <component :is="currentSubviewComponent" :key="currentSubview" @switchSubview="switchSubview" />
        </transition>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import MainActivityView from "./subviews/MainActivityView.vue";
import ActiveSessionView from "./subviews/ActiveSessionView.vue";

const currentSubview = ref(0);
const transitionName = ref("zoom"); // dynamic transition

const subviews = [MainActivityView, ActiveSessionView];

const switchSubview = (value: number) => {
    switch (value) {
        case 0:
            transitionName.value = `slide-left`;
            break;

        default:
            transitionName.value = `slide-right`;
            break;
    }
    currentSubview.value = value;
};

const currentSubviewComponent = computed(() => subviews[currentSubview.value]);
</script>

<style scoped>
.subview-container {
    position: relative; /* <-- make it the positioning context for absolute children */
    overflow: hidden; /* <-- hides content that slides out */
    width: 100%;
    height: 100%;
}

.zoom-enter-active,
.zoom-leave-active {
    transition: all 0.3s ease;
}

.zoom-enter-from {
    transform: scale(0.95);
    opacity: 0;
}

.zoom-enter-to {
    transform: scale(1);
    opacity: 1;
}

.zoom-leave-from {
    transform: scale(1);
    opacity: 1;
}

.zoom-leave-to {
    transform: scale(1.05);
    opacity: 0;
}

.slide-right-enter-active,
.slide-right-leave-active {
    position: absolute;
    width: 100%;
    transition: all 0.2s cubic-bezier(0.77, 0, 0.175, 1);
}

.slide-right-enter-from {
    transform: translateX(100%);
}
.slide-right-enter-to {
    transform: translateX(0);
}

.slide-right-leave-from {
    transform: translateX(0);
}
.slide-right-leave-to {
    transform: translateX(-100%);
}

.slide-left-enter-active,
.slide-left-leave-active {
    position: absolute;
    width: 100%;
    transition: all 0.2s cubic-bezier(0.77, 0, 0.175, 1);
}

.slide-left-enter-from {
    transform: translateX(-100%);
}
.slide-left-enter-to {
    transform: translateX(0);
}

.slide-left-leave-from {
    transform: translateX(0);
}
.slide-left-leave-to {
    transform: translateX(100%);
}
</style>
