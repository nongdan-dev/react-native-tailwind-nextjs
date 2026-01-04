import type { PropsWithChildren, ReactNode } from 'react'
import { cache } from 'react'

import { LinkUntyped } from '@/components/base/link-untyped'
import { useCurrentLang, useCurrentLocale } from '@/i18n'
import type { Lang } from '@/i18n/config'
import { getLocale } from '@/i18n/config'
import { useRoute } from '@/navigation'

export type I18nSwitcherProps = {
  currentLang: Lang
  renderLink?: (lang: Lang, children: ReactNode) => ReactNode
  onPress?: (lang: Lang) => Promise<void>
}
export const useI18nSwitcherProps = cache(
  async (): Promise<I18nSwitcherProps> => {
    const currentLang = await useCurrentLang()
    return {
      currentLang,
      renderLink,
    }
  },
)

const renderLink = (lang: Lang, children: ReactNode) => (
  <I18nSwitcherLink key={lang} lang={lang}>
    {children}
  </I18nSwitcherLink>
)

type I18nSwitcherLinkProps = PropsWithChildren<{
  lang: Lang
}>
const I18nSwitcherLink = async ({ children, lang }: I18nSwitcherLinkProps) => {
  const [route, currentLocale] = await Promise.all([
    useRoute(),
    useCurrentLocale(),
  ])
  const { pathname: currentPath, query } = route

  let pathWithoutLocale = currentPath
  const prefix = `/${currentLocale}`
  if (pathWithoutLocale.startsWith(prefix)) {
    pathWithoutLocale = pathWithoutLocale.replace(prefix, '')
  }
  // when switching lang, always render link with locale to set cookie in proxy
  const locale = getLocale(lang)
  const pathname = `/${locale}${pathWithoutLocale}`

  return (
    <LinkUntyped
      className='flex'
      pathname={pathname as any}
      query={query}
      prependCurrentLocale={false}
      scroll={false}
    >
      {children}
    </LinkUntyped>
  )
}
