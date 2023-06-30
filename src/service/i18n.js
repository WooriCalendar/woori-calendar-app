import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationEn from "../translation/translationEn.json";
import translationKo from "../translation/translationKo.json";
import translationJa from "../translation/translationJa.json";

const resources = {
  en: {
    translation: translationEn,
  },
  ko: {
    translation: translationKo,
  },
  ja: {
    translation: translationJa,
  },
};

const userLanguage = window.navigator.language || window.navigator.userLanguage;

i18n.use(initReactI18next).init({
  resources,
  lng: "ko",
  fallbackLng: "ko",
  interpolation: {
    escapeValue: false,
  },
});

// 영어로 번역하는 함수
export function translateToEnglish(text) {
  return i18n.t(text, { lng: "en" });
}

// 일본어로 번역하는 함수
export function translateToJapanese(text) {
  return i18n.t(text, { lng: "ja" });
}

// 한국어로 번역하는 함수
export function translateToKorean(text) {
  return i18n.t(text, { lng: "ko" });
}

export default i18n;
