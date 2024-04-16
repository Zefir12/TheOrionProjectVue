import { defineStore } from "pinia";
import { ref } from "vue";
import { signInWithEmail, signoutUser } from "../../../lib/supabase/services/supabaseLoginService";
import { getUserLogged, setUserLogged } from "../../../lib/localStorage/settings";
import { useRouter } from "vue-router";

export const useLoginStore = defineStore("login", () => {
    const email = ref("");
    const password = ref("");
    const userLogged = ref(getUserLogged());
    const router = useRouter();

    async function loginUser() {
        await signInWithEmail(email.value, password.value);
        setUserLogged(true);
        userLogged.value = true;
        router.push({ name: "dashboard" });
    }

    async function logutUser() {
        await signoutUser();
        setUserLogged(false);
        userLogged.value = false;
        router.push({ name: "login" });
    }

    return { email, password, userLogged, loginUser, logutUser };
});
