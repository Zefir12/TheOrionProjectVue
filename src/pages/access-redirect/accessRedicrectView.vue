<template></template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { onBeforeMount } from "vue";
import { supabase } from "@/lib/supabase/supabase/supabase";

const router = useRouter();

const extractTokensAndRedirect = async () => {
    const tokens = router.currentRoute.value.fullPath.replace("/", "").split("&");

    const accessToken = tokens[0].split("=")[1];
    const refreshToken = tokens[1].split("=")[1];

    if (accessToken && refreshToken) {
        await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken as string
        });

        router.push("/dashboard");
    } else {
        console.error("Tokens are missing");
    }
};

onBeforeMount(() => {
    extractTokensAndRedirect();
});
</script>
