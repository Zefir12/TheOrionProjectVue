import { createI18n } from "vue-i18n";
import pl from "@/locales/pl.json";
import en from "@/locales/en.json";
import ko from "@/locales/ko.json";
import { getLanguage } from "@/lib/localStorage/settings";

const availableLanguages = ["pl", "en", "ko"];

const savedLanguage = getLanguage();

const instance = createI18n({
    locale: savedLanguage ?? "en",
    fallbackLocale: "en",
    messages: { pl, en, ko },
    legacy: false,
    globalInjection: true
});

const i18n = instance.global;

export { i18n, availableLanguages };
export default instance;
