import Vue from 'vue'
import VueI18n from 'vue-i18n'
import zh from 'element-ui/lib/locale/lang/zh-CN'
import en from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
Vue.use(VueI18n)

const DEFAULT_LANG = 'zh'
const LOCALE_KEY = 'localeLanguage'

const locales = {
    zh: { ...require('./zh.json'), ...zh },
    en: { ...require('./en.json'), ...en }
  }

const i18n = new VueI18n({
    locale: DEFAULT_LANG,
    messages: locales,
})
locale.i18n((key, value) => i18n.t(key, value)) //重点：为了实现element插件的多语言切换
export const setup = lang => {
    if (lang === undefined) {
        lang = window.localStorage.getItem(LOCALE_KEY)
        if (locales[lang] === undefined) {
            lang = DEFAULT_LANG
        }
    }
    window.localStorage.setItem(LOCALE_KEY, lang)

    Object.keys(locales).forEach(lang => {
        document.body.classList.remove(`lang-${lang}`)
    })
    document.body.classList.add(`lang-${lang}`)
    document.body.setAttribute('lang', lang)

    Vue.config.lang = lang
    i18n.locale = lang
}
setup('en');
window.i18n = i18n
export default i18n
