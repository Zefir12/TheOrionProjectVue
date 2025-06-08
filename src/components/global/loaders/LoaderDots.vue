<template><span class="loader"></span></template>

<script setup lang="ts">
defineProps<{ color: string }>();
</script>

<style setup>
.loader {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    display: block;
    margin: 15px auto;
    position: relative;
    color: #d3549a;
    left: -100px;
    box-sizing: border-box;
    animation: shadowRolling 2s linear infinite;
    --dot-color: v-bind(color);
    --offset: 90px;
}

@keyframes shadowRolling {
    0% {
        box-shadow:
            calc(var(--offset) - 100px) 0 15px rgba(255, 255, 255, 0),
            calc(var(--offset) - 100px) 0 15px rgba(255, 255, 255, 0),
            calc(var(--offset) - 100px) 0 15px rgba(255, 255, 255, 0),
            calc(var(--offset) - 100px) 0 15px rgba(255, 255, 255, 0);
    }
    12% {
        box-shadow:
            calc(var(--offset) + 20px) 0 1px var(--dot-color),
            calc(var(--offset) + 10px) 0 15px rgba(255, 255, 255, 0),
            calc(var(--offset) - 100px) 0 15px rgba(255, 255, 255, 0),
            calc(var(--offset) - 100px) 0 15px rgba(255, 255, 255, 0);
    }
    25% {
        box-shadow:
            calc(var(--offset) + 20px) 0 0px var(--dot-color),
            calc(var(--offset) + 10px) 0 0px var(--dot-color),
            calc(var(--offset) + 0px) 0 0px rgba(255, 255, 255, 0),
            calc(var(--offset) - 100px) 0 0px rgba(255, 255, 255, 0);
    }
    36% {
        box-shadow:
            calc(var(--offset) + 20px) 0 0px var(--dot-color),
            calc(var(--offset) + 10px) 0 0px var(--dot-color),
            calc(var(--offset) + 0px) 0 0px var(--dot-color),
            calc(var(--offset) - 200px) 0 15px rgba(255, 255, 255, 0);
    }
    50% {
        box-shadow:
            calc(var(--offset) + 20px) 0 0px var(--dot-color),
            calc(var(--offset) + 10px) 0 0px var(--dot-color),
            calc(var(--offset) + 0px) 0 0px var(--dot-color),
            calc(var(--offset) - 10px) 0 0px var(--dot-color);
    }
    52% {
        box-shadow:
            calc(var(--offset) + 30px) 0 0px var(--dot-color),
            calc(var(--offset) + 20px) 0 0px var(--dot-color),
            calc(var(--offset) + 10px) 0 0px var(--dot-color),
            calc(var(--offset) + 0px) 0 0px var(--dot-color);
    }
    62% {
        box-shadow:
            calc(var(--offset) + 80px) 0 1px rgba(255, 255, 255, 0),
            calc(var(--offset) + 30px) 0 1px var(--dot-color),
            calc(var(--offset) + 20px) 0 1px var(--dot-color),
            calc(var(--offset) + 10px) 0 1px var(--dot-color);
    }
    75% {
        box-shadow:
            calc(var(--offset) + 100px) 0 15px rgba(255, 255, 255, 0),
            calc(var(--offset) + 100px) 0 15px rgba(255, 255, 255, 0),
            calc(var(--offset) + 30px) 0 1px var(--dot-color),
            calc(var(--offset) + 20px) 0 1px var(--dot-color);
    }
    87% {
        box-shadow:
            calc(var(--offset) + 100px) 0 15px rgba(255, 255, 255, 0),
            calc(var(--offset) + 100px) 0 15px rgba(255, 255, 255, 0),
            calc(var(--offset) + 100px) 0 15px rgba(255, 255, 255, 0),
            calc(var(--offset) + 30px) 0 3px var(--dot-color);
    }
    100% {
        box-shadow:
            calc(var(--offset) + 100px) 0 15px rgba(255, 255, 255, 0),
            calc(var(--offset) + 100px) 0 15px rgba(255, 255, 255, 0),
            calc(var(--offset) + 100px) 0 15px rgba(255, 255, 255, 0),
            calc(var(--offset) + 100px) 0 15px rgba(255, 255, 255, 0);
    }
}
</style>
