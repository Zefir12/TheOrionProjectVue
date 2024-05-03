import { createRouter, createWebHashHistory } from "vue-router";
import LoginView from "../pages/login/LoginView.vue";
import { getUserLogged, setPage } from "../lib/localStorage/settings";
import DashboardView from "../pages/dashboard/DashboardView.vue";
import FoodView from "../pages/food/FoodView.vue";
import WeightView from "../pages/weight/WeightView.vue";
import BloodPreassureView from "../pages/bloodpreassure/BloodPreassureView.vue";
import FoodDataView from "@/pages/foodData/FoodDataView.vue";
import BoughtItemsView from "@/pages/boughtItems/BoughtItemsView.vue";

const routes = [
    //{ name: "home", path: "/", redirect: getPage() ?? "/dashboard" },
    { name: "dashboard", path: "/dashboard", component: DashboardView },
    { name: "login", path: "/login", component: LoginView },
    { name: "food", path: "/food", component: FoodView },
    { name: "weight", path: "/weight", component: WeightView },
    { name: "bloodpreassure", path: "/bloodpreassure", component: BloodPreassureView },
    { name: "foodData", path: "/fooddata", component: FoodDataView },
    { name: "boughtItems", path: "/boughtItems", component: BoughtItemsView }
];

const router = createRouter({
    //history: createMemoryHistory(),
    history: createWebHashHistory(),
    routes
});

router.beforeEach(async (to) => {
    setPage(to.path);
    if (
        !getUserLogged() &&
        // ❗️ Avoid an infinite redirect
        to.name !== "login"
    ) {
        return { name: "login" };
    }
});

export { router };
