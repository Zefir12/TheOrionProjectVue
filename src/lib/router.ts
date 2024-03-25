import { createMemoryHistory, createRouter } from 'vue-router'
import LoginView from '../components/login/LoginView.vue'
import { getUserLogged } from './localStorage/settings'
import DashboardView from '../components/dashboard/DashboardView.vue'
import FoodView from '../components/food/FoodView.vue'



const routes = [
  { name: 'dashboard', path: '/', component: DashboardView },
  { name: 'login', path: '/login', component: LoginView },
  { name: 'food', path: '/food', component: FoodView}
]



export const router = createRouter({
  history: createMemoryHistory(),
  routes,
})


router.beforeEach(async (to) => {
  if (
    !getUserLogged() &&
    // ❗️ Avoid an infinite redirect
    to.name !== 'login'
  ) {
    return { name: 'login' }
  }
})