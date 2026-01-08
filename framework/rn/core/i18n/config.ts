/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import i18next from 'i18next'
import { initReactI18next } from 'react-i18next/initReactI18next'

import type { StrMap } from '@/shared/ts-utils'

export const i18nCookieKey = 'i18n-locale'
export const i18nCookieMaxAge = 60 * 60 * 24 * 365
export const i18nHeaderKey = `x-${i18nCookieKey}`

export const isValidLocale = (locale: any): locale is string =>
  localeSet.has(locale)
export const isValidLang = (lang: any): lang is string => langSet.has(lang)

export const getLocale = (lang: string) => {
  if (!isValidLang(lang)) {
    return getDefaultLocale()
  }
  return locales[langMapIndex.get(lang) as number]
}
export const getLang = (locale: string): string => {
  if (!isValidLocale(locale)) {
    return getDefaultLang()
  }
  return locale.slice(0, 2)
}

export const getLocales = () => locales
export const getLangs = () => langs

export const getDefaultLocale = () => locales[0]
export const getDefaultLang = () => getLang(getDefaultLocale())

let locales: string[] = ['en-US']
let localeSet = new Set(locales)
let langs = locales.map(getLang)
let langSet = new Set(langs)
let langMapIndex = new Map(langs.map((l, i) => [l, i]))
export const setLocales = (arr: string[]) => {
  locales = arr
  localeSet = new Set(locales)
  langs = locales.map(getLang)
  langSet = new Set(langs)
  langMapIndex = new Map(langs.map((l, i) => [l, i]))
}

let i18nPromise: Promise<unknown> = Promise.resolve()
export const setI18nLabels = (labels: StrMap) => {
  i18nPromise = i18next.use(initReactI18next).init({
    resources: labels,
    supportedLngs: langs,
    lng: getDefaultLang(),
    defaultNS: 'common',
    fallbackNS: 'common',
    returnNull: false,
  })
}
export const getI18nPromise = () => i18nPromise
