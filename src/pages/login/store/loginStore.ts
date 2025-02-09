import { defineStore } from "pinia";
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";
import { supabase } from "@/lib/supabase/supabase/supabase";
import { AuthChangeEvent, Session } from "@supabase/supabase-js";

export const useLoginStore = defineStore("login", () => {
    const email = ref("");
    const password = ref("");
    const router = useRouter();
    const toast = useToast();
    const loading = ref(false);

    const user = ref();
    const session = ref();

    async function loginUser() {
        loading.value = true;
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email.value,
            password: password.value
        });

        if (data.session) {
            router.push({ name: "dashboard" });
        } else {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            toast.add({
                severity: "error",
                summary: "Error",
                detail: "Login failed, beka z ciebie.",
                life: 1500
            });
        }
        if (error) {
            console.log(error);
        }
        loading.value = false;
    }

    async function logutUser() {
        await supabase.auth.signOut();
    }

    const userLogged = computed(() => {
        return !!session.value?.user;
    });

    const googleLogin = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                // eslint-disable-next-line no-undef
                redirectTo: window.location.origin,
                queryParams: {
                    access_type: "offline",
                    prompt: "consent"
                }
            }
        });

        if (error) console.error("Login failed:", error);
    };

    onMounted(() => {
        supabase.auth.onAuthStateChange((event: AuthChangeEvent, esession: Session | null) => {
            if (event === "SIGNED_OUT") {
                user.value = null;
                router.push({ name: "login" });
            }
            user.value = esession?.user || null;
            session.value = esession;
        });
    });

    return { email, password, userLogged, loading, loginUser, logutUser, googleLogin, session, user };
});
