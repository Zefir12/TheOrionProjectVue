import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import ToastService from 'primevue/toastservice';
import { createPinia } from "pinia";
import { router } from "./lib/router";
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/aura-dark-purple/theme.css'




const pinia = createPinia();
const app = createApp(App);

app.use(ToastService);
app.use(router)
app.use(pinia);
app.use(PrimeVue, { ripple: false });
app.mount("#app");