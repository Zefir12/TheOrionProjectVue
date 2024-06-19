import { createI18n } from "vue-i18n";
import pl from "@/locales/pl.json";
import en from "@/locales/en.json";
import ko from "@/locales/ko.json";

const instance = createI18n({
    locale: "en",
    fallbackLocale: "en",
    messages: { pl, en, ko },
    legacy: false,
    globalInjection: true
});

export default instance;

const availableLanguages = ["pl", "en", "ko"];
const i18n = instance.global;
export { i18n, availableLanguages };
