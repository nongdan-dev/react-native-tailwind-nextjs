import type { Namespace } from 'i18next'
import i18next from 'i18next'
import { usePathname } from 'next-unchecked/navigation'

import {
  defaultLocale,
  defaultNameSpace,
  getLang,
  locales,
} from '@/i18n/config'

export const useCurrentLocale = () => {
  const p = usePathname()
  if (!p || p === '/') {
    return defaultLocale
  }
  return (
    locales.find(l => p === `/${l}` || p.startsWith(`/${l}/`)) || defaultLocale
  )
}

export const useCurrentLang = () => {
  const locale = useCurrentLocale()
  return getLang(locale)
}

export const useTranslation = (ns: Namespace = defaultNameSpace) => {
  const lang = useCurrentLang()
  return i18next.getFixedT(lang, ns)
}
