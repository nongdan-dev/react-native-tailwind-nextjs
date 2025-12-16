import i18next from 'i18next'
import { headers } from 'next/headers'
import type { PropsWithChildren, ReactNode } from 'react'
import { cache } from 'react'

import type { Lang, Locale, Namespace } from '@/i18n/config'
import {
  defaultLocale,
  defaultNameSpace,
  getLang,
  getLocale,
  i18nHeaderKey,
  i18nPromise,
  isValidLocale,
} from '@/i18n/config'
import { useRoute } from '@/navigation'
import { LinkUntyped } from '@/navigation/link-untyped'
import { tw } from '@/tw'

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

export type I18nSwitcherProps = {
  currentLang: Lang
  webLink?: (lang: Lang, children: ReactNode) => ReactNode
  nativeOnPress?: (lang: Lang) => Promise<void>
}
export const useI18nSwitcherProps = cache(
  async (): Promise<I18nSwitcherProps> => {
    const currentLang = await useCurrentLang()
    return {
      currentLang,
      webLink,
    }
  },
)

const webLink = (lang: Lang, children: ReactNode) => (
  <WebLink key={lang} lang={lang}>
    {children}
  </WebLink>
)

type WebLinkProps = PropsWithChildren<{
  lang: Lang
}>
const WebLink = async ({ children, lang }: WebLinkProps) => {
  const [route, currentLocale] = await Promise.all([
    useRoute(),
    useCurrentLocale(),
  ])
  const { pathname: currentPath, query } = route

  const locale = getLocale(lang)
  let pathWithoutLocale = currentPath
  const prefix = `/${currentLocale}`
  if (pathWithoutLocale.startsWith(prefix)) {
    pathWithoutLocale = pathWithoutLocale.replace(prefix, '')
  }
  // when switching lang, always render link with locale to set cookie in proxy
  const pathname = `/${locale}${pathWithoutLocale}`

  return (
    <LinkUntyped
      className={tw`flex`}
      pathname={pathname as any}
      query={query}
      noPrependCurrentLocale
      webNoScroll
    >
      {children}
    </LinkUntyped>
  )
}
