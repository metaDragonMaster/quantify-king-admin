import { defineStore } from "pinia"
// import { useI18n } from "vue-i18n"

function languageValidity(language) {
    return ['zh','en'].includes(language)
}
export const UseStoreLanguage = defineStore('Language', {
    state: () => ({
        _locale : 'zh'
    }),
    getters: {
        LanguageType:({_locale}) => _locale
    },
    actions: {
        setLanguageType(type) {
            if(languageValidity) {
                // const i18n = useI18n()
                // const { locale } = i18n
                // locale.value = type
                this._locale = type;
                // Locale = type
            } else {
                console.error('language change failed')
            }
        }
    }
})