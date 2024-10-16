import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(HttpBackend) // 通过http加载语言包
  .use(LanguageDetector) // 自动检测用户语言
  .use(initReactI18next) // 将i18n传递到React
  .init({
    fallbackLng: "en", // 默认语言
    debug: false,
    interpolation: {
      escapeValue: false, // React已经默认进行XSS防护
    },
    backend: {
      // 动态加载翻译文件的 URL
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
  });

export default i18n;
