/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import i18next from 'i18next'
import { initReactI18next } from 'react-i18next/initReactI18next'

import type { Falsish, StrMap } from '@/shared/ts-utils'

export const i18nCookieKey = 'i18n-locale'
export const i18nCookieMaxAge = 60 * 60 * 24 * 365
export const i18nHeaderKey = `x-${i18nCookieKey}`

export const isValidLocaleUntyped = (
  locale: string | Falsish,
): locale is string => !!locale && localeSet.has(locale)
export const isValidLangUntyped = (lang: string | Falsish): lang is string =>
  !!lang && langSet.has(lang)

export const getLocaleUntyped = (lang: string | Falsish) => {
  if (!isValidLangUntyped(lang)) {
    return getDefaultLocaleUntyped()
  }
  return locales[langMapIndex.get(lang) as number]
}
export const getLangUntyped = (locale: string | Falsish): string => {
  if (!isValidLocaleUntyped(locale)) {
    return getDefaultLangUntyped()
  }
  return locale.slice(0, 2)
}

export const getLocalesUntyped = () => locales
export const getLangsUntyped = () => langs

export const getDefaultLocaleUntyped = () => locales[0]
export const getDefaultLangUntyped = () =>
  getLangUntyped(getDefaultLocaleUntyped())

let locales: string[] = ['en-US']
let localeSet = new Set(locales)
let langs = locales.map(getLangUntyped)
let langSet = new Set(langs)
let langMapIndex = new Map(langs.map((l, i) => [l, i]))
export const setLocales = (arr: string[]) => {
  locales = arr
  localeSet = new Set(locales)
  langs = locales.map(getLangUntyped)
  langSet = new Set(langs)
  langMapIndex = new Map(langs.map((l, i) => [l, i]))
}

let i18nPromise: Promise<unknown> = Promise.resolve()
export const setI18nLabels = (labels: StrMap) => {
  i18nPromise = i18next.use(initReactI18next).init({
    resources: labels,
    supportedLngs: langs,
    lng: getDefaultLangUntyped(),
    defaultNS: 'common',
    fallbackNS: 'common',
    returnNull: false,
  })
}
export const getI18nPromise = () => i18nPromise
