import {createI18n} from 'vue-i18n'
const i18n = createI18n({
  locale: 'zh',
  {
    zh: {
      app: {

      }
    },
    en: {
      app: {

      }
    }
  }
})

export function switchLang(lang) {
  if(!['zh', 'en'].includes(lang)) {
    throw new TypeError('language only support "zh" or "en"')
  }
  i18n.global.locale = lang
}

export default i18n