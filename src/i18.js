import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import {ru_translation} from "./utils/languages/ru";
import {id_translation} from "./utils/languages/id";
import {es_translation} from "./utils/languages/es";
import {en_translation} from './utils/languages/en';

const resources = {
    en: {
        translation: en_translation,
    },
    ru: {
        translation: ru_translation,
    },
    es: {
        translation: es_translation,
    },
    id: {
        translation: id_translation,
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        supportedLanguages: ['ru', 'en', 'es', 'id'],
        resources,
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
