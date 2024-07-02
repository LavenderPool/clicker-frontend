import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import {en_translation} from "./utils/languages/en";

const resources = {
    en: {
        translation: en_translation
    },
}

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: "en",
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;