import { defineStore } from "pinia";
import { ref } from "vue";
import { signInWithEmail, signoutUser } from "../../../lib/supabase/services/supabaseLoginService";
import { getUserLogged, setUserLogged } from "../../../lib/localStorage/settings";
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";

export const useLoginStore = defineStore("login", () => {
    const email = ref("");
    const password = ref("");
    const userLogged = ref(getUserLogged());
    const router = useRouter();
    const toast = useToast();
    const loading = ref(false);

    async function loginUser() {
        loading.value = true;
        const success = await signInWithEmail(email.value, password.value);
        if (success) {
            setUserLogged(true);
            userLogged.value = true;
            router.push({ name: "dashboard" });
        } else {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            toast.add({ severity: "error", summary: "Error", detail: "Nie udało ci sie, beka", life: 1500 });
        }
        loading.value = false;
    }

    async function logutUser() {
        await signoutUser();
        setUserLogged(false);
        userLogged.value = false;
        router.push({ name: "login" });
    }

    return { email, password, userLogged, loading, loginUser, logutUser };
});
