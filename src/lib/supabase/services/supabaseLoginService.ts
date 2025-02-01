import { supabase } from "../supabase/supabase";

export async function signInWithEmail(email: string, password: string) {
    const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    });
    if (error) {
        console.log(error);
        return false;
    }
    return true;
}

export async function signoutUser() {
    await supabase.auth.signOut();
}
