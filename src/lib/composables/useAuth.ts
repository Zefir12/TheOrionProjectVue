import { ref, onMounted } from "vue";
import { AuthChangeEvent, Session } from "@supabase/supabase-js";
import { supabase } from "../supabase/supabase/supabase";
import { router } from "@/router/router";

export function useAuth() {
    const user = ref();
    const session = ref();

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

    return { user, session };
}
