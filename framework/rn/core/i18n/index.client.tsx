/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import i18next from 'i18next'
import { usePathname } from 'next-unchecked/navigation'

import { getDefaultLocale, getLang, getLocales } from '@/rn/core/i18n/config'

export const useCurrentLocale = () => {
  const p = usePathname()
  if (!p || p === '/') {
    return getDefaultLocale()
  }
  return (
    getLocales().find(l => p === `/${l}` || p.startsWith(`/${l}/`)) ||
    getDefaultLocale()
  )
}

export const useCurrentLang = () => {
  const locale = useCurrentLocale()
  return getLang(locale)
}

export const useTranslation = (namespace: string) => {
  const lang = useCurrentLang()
  return i18next.getFixedT(lang, namespace)
}
