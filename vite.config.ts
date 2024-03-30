import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    base: "/TheOrionProjectVue/",
    preview: {
        port: 3999,
    },
    server: {
        port: 3999,
    },
});
