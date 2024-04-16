import { createRouter, createWebHashHistory } from "vue-router";
import LoginView from "../pages/login/LoginView.vue";
import { getUserLogged, setPage } from "./localStorage/settings";
import DashboardView from "../components/dashboard/DashboardView.vue";
import FoodView from "../components/food/FoodView.vue";
import WeightView from "../pages/weight/WeightView.vue";
import BloodPreassureView from "../components/bloodpreassure/BloodPreassureView.vue";
import FoodDataView from "../components/foodData/FoodDataView.vue";

const routes = [
    //{ name: "home", path: "/", redirect: getPage() ?? "/dashboard" },
    { name: "dashboard", path: "/dashboard", component: DashboardView },
    { name: "login", path: "/login", component: LoginView },
    { name: "food", path: "/food", component: FoodView },
    { name: "weight", path: "/weight", component: WeightView },
    { name: "bloodpreassure", path: "/bloodpreassure", component: BloodPreassureView },
    { name: "foodData", path: "/fooddata", component: FoodDataView }
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
