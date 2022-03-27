import { UseStoreLanguage } from "@/stores/language.js";
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";

export function useLanguage() {
  const storeLanguage = UseStoreLanguage();
  const { setLanguageType } = storeLanguage;
  const { LanguageType } = storeToRefs(storeLanguage);
  const i18n = useI18n();
  const { locale, t } = i18n;
  return {
    t,
    type: LanguageType,
    change: function () {
      // console.log(LanguageType);
      setLanguageType(LanguageType.value == "zh" ? "en" : "zh");
      locale.value = locale.value == "zh" ? "en" : "zh";
    },
  };
}
