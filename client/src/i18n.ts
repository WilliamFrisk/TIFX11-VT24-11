// src/i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationEN from "./locales/en/translation.json";
import translationSE from "./locales/se/translation.json";

// the translations
const resources = {
  en: {
    translation: translationEN,
  },
  se: {
    translation: translationSE,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // def lan
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
