import { createRouter, createWebHashHistory } from "vue-router";
import LoginView from "../pages/login/LoginView.vue";
import DashboardView from "../pages/dashboard/DashboardView.vue";
import FoodView from "../pages/food/FoodView.vue";
import WeightView from "../pages/weight/WeightView.vue";
import BloodPreassureView from "../pages/bloodpreassure/BloodPreassureView.vue";
import FoodDataView from "@/pages/foodData/FoodDataView.vue";
import BoughtItemsView from "@/pages/boughtItems/BoughtItemsView.vue";
import TestPage from "@/pages/test/TestPage.vue";
import TestPage2 from "@/pages/test2/TestPage2.vue";
import { supabase } from "@/lib/supabase/supabase/supabase";
import { clearFitbitAuthCodes, getFitbitAuthCodes, setFitbitTokenData } from "@/lib/localStorage/settings";
import FitbitView from "@/pages/fitbit/FitbitView.vue";
import { baseUrl } from "@/common/consts";
import AccessRedicrectView from "@/pages/access-redirect/accessRedicrectView.vue";
import { get } from "node_modules/axios/index.d.cts";

const routes = [
    //{ name: "home", path: "/", redirect: getPage() ?? "/dashboard" },
    { name: "dashboard", path: "/dashboard", component: DashboardView },
    { name: "login", path: "/login", component: LoginView },
    { name: "food", path: "/food", component: FoodView },
    { name: "weight", path: "/weight", component: WeightView },
    { name: "bloodpreassure", path: "/bloodpreassure", component: BloodPreassureView },
    { name: "foodData", path: "/fooddata", component: FoodDataView },
    { name: "boughtItems", path: "/boughtItems", component: BoughtItemsView },
    { name: "test", path: "/test", component: TestPage },
    { name: "test2", path: "/test2", component: TestPage2 },
    { name: "fitbit", path: "/fitbit", component: FitbitView },
    { name: "access-token", path: "/access_token=:token", component: AccessRedicrectView }
];

const router = createRouter({
    //history: createMemoryHistory(),
    history: createWebHashHistory(),
    routes
});

const handleFitbitCallback = async () => {
    const fullUrl = globalThis.location.href;
    if (fullUrl.includes("/fitbitcallback")) {
        const url = new URL(fullUrl);

        const code = url.searchParams.get("code");
        const state = url.searchParams.get("state");
        if (state != getFitbitAuthCodes()?.state) {
            console.error("Invalid state: expected " + getFitbitAuthCodes()?.state + " but got " + state);
        }

        let clientId = import.meta.env.VITE_FITBIT_CLIENT_ID;
        let secret = import.meta.env.VITE_FITBIT_SECRET;

        const codes = getFitbitAuthCodes();
        if (codes != null) {
            const body = new URLSearchParams({
                client_id: clientId,
                grant_type: "authorization_code",
                redirect_uri: baseUrl + "/fitbitcallback",
                code: code as string,
                code_verifier: codes.codeVerifier
            });
            try {
                const response = await fetch("https://api.fitbit.com/oauth2/token", {
                    method: "POST",
                    headers: {
                        Authorization: "Basic " + btoa(`${clientId}:${secret}`),
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body: body.toString()
                });
                clearFitbitAuthCodes();

                if (!response.ok) {
                    console.error("Failed to exchange code for token", await response.text());
                    return { name: "login" };
                }

                const tokenData = await response.json();
                setFitbitTokenData(tokenData);

                const currentUrl = globalThis.location.href;
                const newUrl = currentUrl.replace(/fitbitcallback\?code=.*&state=.*#/, "#");

                // Update the URL without reloading the page
                globalThis.history.replaceState({}, globalThis.document.title, newUrl);
                return { path: "dashboard" };
            } catch (error) {
                console.error("Error during token request:", error);
                return { name: "login" }; // Redirect to login in case of an error
            }
        }
    }
};

router.beforeEach(async (to) => {
    handleFitbitCallback();
    const {
        data: { session }
    } = await supabase.auth.getSession();

    if (!session && to.name !== "login" && to.name !== "access-token") {
        return { name: "login" };
    }
});

export { router };
