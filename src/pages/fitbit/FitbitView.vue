<template>
    <StyledButton @click="doShit" name="x"></StyledButton>
</template>

<script setup lang="ts">
import StyledButton from "@/components/global/StyledButton.vue";
import { getFitbitTokenData } from "@/lib/localStorage/settings";

//https://cran.r-project.org/web/packages/fitbitViz/vignettes/fitbit_viz.html super fitbit stuff

const doShit = async () => {
    const response = await fetch("https://api.fitbit.com/1/user/-/hrv/date/today.json", {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: "Bearer " + JSON.parse(getFitbitTokenData())["access_token"]
        }
    });
    console.log(await response.json());
};
</script>
