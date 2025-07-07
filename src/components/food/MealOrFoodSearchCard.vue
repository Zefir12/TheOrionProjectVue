<template>
    <div
        :class="disabled ? 'z-card-container-disabled' : 'z-card-container'"
        v-if="visible"
        :disabled="props.disabled"
        @click="if (!disabled) $emit('click');"
        :name="name"
        :style="{ position: 'relative', overflow: 'hidden' }"
    >
        <IconBowlChopsticks v-if="props.type == 'meal'" color="#4e3f6d" :style="{ position: 'absolute', right: '4px', bottom: '4px' }" stroke-width="2" size="24" />
        <IconStar
            @click.stop="userStore.setFavouriteFood(item_id, true, type ?? 'food')"
            v-if="!isFavorite()"
            class="star-icon"
            color="white"
            :style="{ position: 'absolute', right: '6px', top: '6px', cursor: 'pointer' }"
            stroke-width="1"
            size="20"
        />
        <IconStarFilled
            @click.stop="userStore.setFavouriteFood(item_id, false, type ?? 'food')"
            v-else
            class="filled-star-icon"
            :style="{ position: 'absolute', right: '6px', top: '6px', cursor: 'pointer' }"
            stroke-width="2"
            size="20"
        />
        <div class="z-inside-container">
            <p>{{ name }}</p>
            <p>{{ metadata }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/userStore";
import { IconBowlChopsticks, IconStar, IconStarFilled } from "@tabler/icons-vue";
const userStore = useUserStore();

const isFavorite = () => {
    if (props.type === "meal") {
        return userStore.favouriteMeals.some((meal) => meal === props.item_id);
    } else {
        return userStore.favouriteFoods.some((food) => food === props.item_id);
    }
};

const props = defineProps<{ name: string | undefined; visible?: boolean; disabled?: boolean; color?: string; metadata?: string; type?: "meal" | "food"; item_id: number }>();
defineEmits(["click"]);
</script>

<style scoped>
.z-inside-container {
    max-width: 6rem;
    max-height: 6rem;

    overflow: hidden;
    font-family:
        -apple-system,
        BlinkMacSystemFont,
        Segoe UI,
        Roboto,
        Helvetica,
        Arial,
        sans-serif,
        Apple Color Emoji,
        Segoe UI Emoji;
    font-size: 10px;
}

.star-icon {
    opacity: 0; /* Hidden by default */
    transition: opacity 0.3s ease; /* Smooth fade in/out */
}

.filled-star-icon {
    color: rgb(160, 160, 64);
}

@keyframes rotator {
    0% {
        transform: rotate(0deg) scale(1.1);
    }
    100% {
        transform: rotate(360deg) scale(1.1);
    }
}

@keyframes rotator2 {
    0% {
        transform: rotate(0deg) scale(1.1);
    }
    100% {
        transform: rotate(-360deg) scale(1.1);
    }
}

.star-icon:hover {
    animation: rotator 01.34s linear infinite;
}

.filled-star-icon:hover {
    animation: rotator2 01.34s linear infinite;
}

.z-card-container:hover .star-icon {
    opacity: 1; /* Show on hover */
}

.z-card-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-width: 8rem;
    min-height: 8rem;
    background: rgb(41, 41, 41);
    border-style: groove;
    border-color: rgb(0, 0, 0, 0.3);
    border-radius: 5px;
    border-width: 1px;
    padding: 0.5rem;
    /* color: #d0bfff; */
    /* color: #b197fc; */
    color: #ebebeb99;
    margin: 1px;
}
.z-card-container:hover {
    cursor: pointer;
    background-color: rgba(132, 94, 247, 0.2);
}

.z-card-container-disabled {
    cursor: not-allowed;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-width: 8rem;
    min-height: 8rem;
    background: rgb(27, 27, 27);
    border-style: groove;
    border-color: rgba(0, 0, 0, 0.548);
    border-radius: 5px;
    border-width: 1px;
    padding: 0.5rem;
    /* color: #d0bfff; */
    /* color: #b197fc; */
    color: #ebebeb99;
    margin: 1px;
}
</style>
