import Link from 'next/link'
import type { PropsWithChildren } from 'react'
import type { TextStyle } from 'react-native'

import { useCurrentLocale } from '@/i18n'
import { defaultLocale } from '@/i18n/config'
import { qsStableStringify } from '@/utils/qs'
import type { NonUndefinedKeys } from '@/utils/ts'

export type LinkPropsWocn<
  Routes = any,
  Data = any,
  K extends keyof Routes = any,
  Q = K extends keyof Data ? Data[K] : never,
> = PropsWithChildren<{
  pathname: K
  prependCurrentLocale?: boolean
  scroll?: boolean
  style?: TextStyle
}> &
  (NonUndefinedKeys<Q> extends never ? { query?: Q } : { query: Q })

export const LinkUntypedWocn = async ({
  pathname,
  query,
  prependCurrentLocale = true,
  ...props
}: LinkPropsWocn) => {
  if (prependCurrentLocale) {
    const locale = await useCurrentLocale()
    if (locale !== defaultLocale) {
      pathname = `/${locale}${pathname}`
    }
  }
  const href = query ? `${pathname}?${qsStableStringify(query)}` : pathname
  return <Link {...(props as any)} href={href} />
}
