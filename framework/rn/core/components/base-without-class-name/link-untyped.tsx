/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import Link from 'next/link'
import type { PropsWithChildren } from 'react'
import type { TextStyle } from 'react-native'

import { useCurrentLocale } from '@/rn/core/i18n'
import { getDefaultLocale } from '@/rn/core/i18n/config'
import { qsStableStringify } from '@/shared/qs'
import type { NonUndefinedKeys } from '@/shared/ts-utils'

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
    if (locale !== getDefaultLocale()) {
      pathname = `/${locale}${pathname}`
    }
  }
  const href = query ? `${pathname}?${qsStableStringify(query)}` : pathname
  return <Link {...(props as any)} href={href} />
}
