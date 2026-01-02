import i18next from 'i18next'
import { headers } from 'next-unchecked/headers'
import { cache } from 'react'

import type { Locale, Namespace } from '@/i18n/config'
import {
  defaultLocale,
  defaultNameSpace,
  getLang,
  i18nHeaderKey,
  i18nPromise,
  isValidLocale,
} from '@/i18n/config'

export const useCurrentLocale = cache(async () => {
  const h = await headers()
  const locale = h.get(i18nHeaderKey) as Locale
  return isValidLocale(locale) ? locale : defaultLocale
})

export const useCurrentLang = cache(async () => {
  const locale = await useCurrentLocale()
  return getLang(locale)
})

export const useTranslation = cache(
  async (ns: Namespace = defaultNameSpace) => {
    await i18nPromise
    const lang = await useCurrentLang()
    return i18next.getFixedT(lang, ns)
  },
)
