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
    { name: "test2", path: "/test2", component: TestPage2 }
];

const router = createRouter({
    //history: createMemoryHistory(),
    history: createWebHashHistory(),
    routes
});

router.beforeEach(async (to) => {
    if (to.path.includes("access_token")) {
        const params = new URLSearchParams(to.path.substring(1));
        const accessToken = params.get("access_token");
        const refreshToken = params.get("refresh_token");

        if (accessToken) {
            await supabase.auth.setSession({
                access_token: accessToken,
                refresh_token: refreshToken as string
            });
        }
        return { path: "dashboard" };
    }

    const {
        data: { session }
    } = await supabase.auth.getSession();

    if (!session && to.name !== "login") {
        return { name: "login" };
    }
});

export { router };
