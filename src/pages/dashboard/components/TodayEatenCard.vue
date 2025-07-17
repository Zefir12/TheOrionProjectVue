<template>
    <div class="item" :style="{ backgroundColor: getColor() }">
        <div class="inside-item">
            {{ props.food.food_types.name + " " + props.food.food_amount + "g" }}
            <div class="info-icon" @click="emit('openFoodInfoModal', food)"><IconFileInvoice size="24" stroke-width="2" /></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { FoodItem } from "../store/dashboardStore";
import { IconFileInvoice } from "@tabler/icons-vue";

const props = defineProps<{
    food: FoodItem;
}>();

const emit = defineEmits(["openFoodInfoModal"]);

const getColor = () => {
    const { water_percentage, carbs, fat, protein } = props.food.food_types;

    const PROTEIN_MULTILPIER = 8; // Protein multiplier for color calculation

    if (water_percentage > 90) {
        return "#2658c4"; // Water
    }

    const total = carbs + fat + protein * PROTEIN_MULTILPIER;

    if (total === 0) {
        return "#6e6e6e"; // Default grey if no macros
    }

    // Proportions
    const carbRatio = carbs / total;
    const fatRatio = fat / total;
    const proteinRatio = (protein * PROTEIN_MULTILPIER) / total;

    // Base RGB colors
    const carbColor = { r: 255, g: 0, b: 0 }; // Red
    const fatColor = { r: 255, g: 215, b: 0 }; // Gold
    const protColor = { r: 110, g: 110, b: 110 }; // Grey

    // Weighted average of RGB components
    const r = Math.round(carbColor.r * carbRatio + fatColor.r * fatRatio + protColor.r * proteinRatio);

    const g = Math.round(carbColor.g * carbRatio + fatColor.g * fatRatio + protColor.g * proteinRatio);

    const b = Math.round(carbColor.b * carbRatio + fatColor.b * fatRatio + protColor.b * proteinRatio);

    return `rgb(${r}, ${g}, ${b})`;
};
</script>
<style scoped>
.item {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;
    border-radius: 0.5rem;
    background-color: #2658c4;
}

.inside-item {
    transform: translate(6px, 0);
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.4rem;
    background-color: rgb(77, 77, 77);
    border-radius: 0.5rem;
    transition:
        transform 0.3s ease,
        background-color 0.3s ease;
    position: relative;
}

.info-icon {
    position: absolute;
    left: -28px;
    cursor: pointer;
    color: white;
    display: flex;
}

@keyframes shake {
    0% {
        transform: translate(0, 0) rotate(0deg) scale(1);
    }
    10% {
        transform: translate(-1px, 1px) rotate(-5deg) scale(1);
    }
    20% {
        transform: translate(1px, -1px) rotate(5deg) scale(1.05);
    }
    30% {
        transform: translate(-1px, 1px) rotate(0deg) scale(1);
    }
    40% {
        transform: translate(1px, -1px) rotate(5deg) scale(1);
    }
    50% {
        transform: translate(-1px, 1px) rotate(-5deg) scale(1.1);
    }
    60% {
        transform: translate(1px, -1px) rotate(0deg) scale(1);
    }
    70% {
        transform: translate(-1px, 1px) rotate(5deg) scale(1);
    }
    80% {
        transform: translate(1px, -1px) rotate(-5deg) scale(1.05);
    }
    90% {
        transform: translate(-1px, 1px) rotate(0deg) scale(1);
    }
    100% {
        transform: translate(0, 0) rotate(0deg) scale(1);
    }
}

.info-icon:hover {
    animation: shake 0.54s ease-in-out infinite;
}
.item:hover .inside-item {
    transform: translate(32px, 0);
    background-color: rgb(87, 87, 87);
}
</style>
