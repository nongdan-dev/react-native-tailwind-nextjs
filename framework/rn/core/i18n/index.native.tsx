/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import AsyncStorage from '@react-native-async-storage/async-storage'
import i18next from 'i18next'
import type { PropsWithChildren } from 'react'
import {
  I18nextProvider,
  useTranslation as originalUseTranslation,
} from 'react-i18next'

import {
  getI18nPromise as getI18nPromiseShared,
  getLang,
  getLocale,
  i18nCookieKey,
} from '@/rn/core/i18n/config'

export const useCurrentLocale = () => {
  const { i18n } = originalUseTranslation()
  return getLocale(i18n.language as any)
}

export const useCurrentLang = () => {
  const locale = useCurrentLocale()
  return getLang(locale)
}

export const useTranslation = (namespace: string) =>
  originalUseTranslation(namespace).t

export const getI18nPromise = () =>
  Promise.all([
    AsyncStorage.getItem(i18nCookieKey).then(v => {
      const lang = getLang(v as any)
      i18next.changeLanguage(lang)
    }),
    getI18nPromiseShared(),
  ])

export const I18nProvider = ({ children }: PropsWithChildren) => (
  <I18nextProvider i18n={i18next}>{children}</I18nextProvider>
)
