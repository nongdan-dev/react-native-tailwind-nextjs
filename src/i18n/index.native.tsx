import AsyncStorage from '@react-native-async-storage/async-storage'
import i18next from 'i18next'
import type { PropsWithChildren } from 'react'
import {
  I18nextProvider,
  useTranslation as originalUseTranslation,
} from 'react-i18next'

import {
  defaultLang,
  defaultLocale,
  defaultNameSpace,
  getLang,
  getLocale,
  i18nCookieKey,
  i18nPromise as i18nPromiseShared,
} from '@/i18n/config'

export const useCurrentLocale = () => {
  const { i18n } = originalUseTranslation()
  return getLocale(i18n.language as any) || defaultLocale
}

export const useCurrentLang = () => {
  const locale = useCurrentLocale()
  return getLang(locale)
}

export const useTranslation = (ns = defaultNameSpace) =>
  originalUseTranslation(ns).t

export const i18nPromise = Promise.all([
  AsyncStorage.getItem(i18nCookieKey).then(v => {
    const lang = getLang(v as any) || defaultLang
    i18next.changeLanguage(lang)
  }),
  i18nPromiseShared,
])

export const I18nProvider = ({ children }: PropsWithChildren) => (
  <I18nextProvider i18n={i18next} defaultNS={defaultNameSpace}>
    {children}
  </I18nextProvider>
)
