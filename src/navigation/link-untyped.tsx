import Link from 'next/link'
import type { PropsWithChildren, ReactNode } from 'react'
import type { TextStyle } from 'react-native'

import { useCurrentLocale } from '@/i18n'
import { defaultLocale } from '@/i18n/config'
import type { CnValue } from '@/tw/cn'
import { qsStableStringify } from '@/utils/qs'
import type { NonUndefinedKeys } from '@/utils/ts'

export type LinkProps<
  Routes = any,
  Data = any,
  K extends keyof Routes = any,
  Q = K extends keyof Data ? Data[K] : never,
> = PropsWithChildren<{
  pathname: K
  noPrependCurrentLocale?: boolean
  webNoScroll?: boolean
  className?: CnValue
  style?: TextStyle
}> &
  (NonUndefinedKeys<Q> extends never ? { query?: Q } : { query: Q })

export type LinkComponent<Routes, Data> = <K extends keyof Routes>(
  p: LinkProps<Routes, Data, K>,
) => ReactNode

export const LinkUntyped = async ({
  pathname,
  query,
  noPrependCurrentLocale,
  webNoScroll,
  ...props
}: LinkProps) => {
  if (!noPrependCurrentLocale) {
    const locale = await useCurrentLocale()
    if (locale !== defaultLocale) {
      pathname = `/${locale}${pathname}`
    }
  }
  const h = query ? `${pathname}?${qsStableStringify(query)}` : pathname
  return (
    <Link href={h} scroll={webNoScroll ? false : true} {...(props as any)} />
  )
}
