import { ref, computed } from 'vue'
import { messages } from './messages'

const LOCALE_KEY = 'steam_review_locale'

// Get saved locale or detect from browser
const getInitialLocale = () => {
  const saved = localStorage.getItem(LOCALE_KEY)
  if (saved && (saved === 'ru' || saved === 'en')) {
    return saved
  }
  
  // Detect from browser
  const browserLang = navigator.language || navigator.userLanguage
  return browserLang.startsWith('ru') ? 'ru' : 'en'
}

const currentLocale = ref(getInitialLocale())

export const useI18n = () => {
  const locale = computed(() => currentLocale.value)
  
  const t = computed(() => messages[currentLocale.value])
  
  const setLocale = (newLocale) => {
    if (newLocale === 'ru' || newLocale === 'en') {
      currentLocale.value = newLocale
      localStorage.setItem(LOCALE_KEY, newLocale)
    }
  }
  
  const toggleLocale = () => {
    setLocale(currentLocale.value === 'ru' ? 'en' : 'ru')
  }
  
  return {
    locale,
    t,
    setLocale,
    toggleLocale
  }
}
