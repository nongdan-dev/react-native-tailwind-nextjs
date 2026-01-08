/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import i18next from 'i18next'
import { headers } from 'next-unchecked/headers'
import { cache } from 'react'

import {
  getDefaultLocale,
  getI18nPromise,
  getLang,
  i18nHeaderKey,
  isValidLocale,
} from '@/rn/core/i18n/config'

export const useCurrentLocale = cache(async () => {
  const h = await headers()
  const locale = h.get(i18nHeaderKey)
  return isValidLocale(locale) ? locale : getDefaultLocale()
})

export const useCurrentLang = cache(async () => {
  const locale = await useCurrentLocale()
  return getLang(locale)
})

export const useTranslation = cache(async (namespace: string) => {
  await getI18nPromise()
  const lang = await useCurrentLang()
  return i18next.getFixedT(lang, namespace)
})
