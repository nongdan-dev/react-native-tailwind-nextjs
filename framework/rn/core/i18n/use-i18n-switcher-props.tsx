/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import type { PropsWithChildren, ReactNode } from 'react'
import { cache } from 'react'

import { LinkUntyped } from '@/rn/core/components/base/link-untyped'
import { useCurrentLangUntyped, useCurrentLocaleUntyped } from '@/rn/core/i18n'
import { getLocaleUntyped } from '@/rn/core/i18n/config'
import { useRoute } from '@/rn/core/navigation'

export type I18nSwitcherProps = {
  currentLang: string
  renderLink?: (lang: string, children: ReactNode) => ReactNode
  onPress?: (lang: string) => Promise<void>
}
export const useI18nSwitcherProps = cache(
  async (): Promise<I18nSwitcherProps> => {
    const currentLang = await useCurrentLangUntyped()
    return {
      currentLang,
      renderLink,
    }
  },
)

const renderLink = (lang: string, children: ReactNode) => (
  <I18nSwitcherLink key={lang} lang={lang}>
    {children}
  </I18nSwitcherLink>
)

type I18nSwitcherLinkProps = PropsWithChildren<{
  lang: string
}>
const I18nSwitcherLink = async ({ children, lang }: I18nSwitcherLinkProps) => {
  const [route, currentLocale] = await Promise.all([
    useRoute(),
    useCurrentLocaleUntyped(),
  ])
  const { pathname: currentPath, query } = route

  let pathWithoutLocale = currentPath
  const prefix = `/${currentLocale}`
  if (pathWithoutLocale.startsWith(prefix)) {
    pathWithoutLocale = pathWithoutLocale.replace(prefix, '')
  }
  // when switching lang, always render link with locale to set cookie in proxy
  const locale = getLocaleUntyped(lang)
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
