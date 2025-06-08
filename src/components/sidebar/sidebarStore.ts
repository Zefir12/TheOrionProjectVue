import { defineStore } from "pinia";
import { ref } from "vue";
import { getSidebarVisible, setSidebarVisible } from "../../lib/localStorage/settings";

export const useSidebarStore = defineStore("sidebar", () => {
    const sidebarVisible = ref(getSidebarVisible());

    function setVisible(value: boolean) {
        sidebarVisible.value = value;
        setSidebarVisible(value);
    }

    function toggleVisible() {
        const state = !sidebarVisible.value;
        sidebarVisible.value = state;
        setSidebarVisible(state);
    }

    return { sidebarVisible, setVisible, toggleVisible };
});
