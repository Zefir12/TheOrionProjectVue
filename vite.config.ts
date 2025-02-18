/// <reference types="vitest" />
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import svgLoader from "vite-svg-loader";

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "@assets": path.resolve(__dirname, "./src/assets"),
            "@components": path.resolve(__dirname, "./src/components")
        }
    },
    plugins: [svgLoader(), vue()],
    base: "/",
    preview: {
        port: 3999
    },
    server: {
        port: 3999
    },
    test: {
        // ...
    }
});
