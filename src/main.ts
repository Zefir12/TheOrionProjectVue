import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import ToastService from "primevue/toastservice";
import { createPinia } from "pinia";
import { router } from "./router/router";
import PrimeVue from "primevue/config";
import "primevue/resources/themes/aura-dark-purple/theme.css";
import i18n from "./lib/localization/i18n";
import "@vue-flow/core/dist/style.css";

const pinia = createPinia();
const app = createApp(App);

app.use(ToastService);
app.use(router);
app.use(pinia);
app.use(i18n);
app.use(PrimeVue, { ripple: false });
app.mount("#app");
