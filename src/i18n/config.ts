import i18next from 'i18next'
import { initReactI18next } from 'react-i18next/initReactI18next'

import { labels } from '@/i18n/labels'

// we can install an iso npm package
// but keep this simple and small bundle for now
const supported = [
  {
    locale: 'en-US',
    nativeName: 'English',
  },
  {
    locale: 'ja-JP',
    nativeName: '日本語',
  },
  {
    locale: 'zh-CN',
    nativeName: '中文',
  },
] as const

export const locales = supported.map(l => l.locale)
export type Locale = (typeof locales)[number]
export const defaultLocale = locales[0]

export const getLang = <T extends Locale>(locale: T) =>
  locale.substring(0, 2) as InferLang<T>

type InferLang<T extends Locale> = T extends `${infer L}-${string}` ? L : T
export type Lang = InferLang<Locale>
export const defaultLang = getLang(defaultLocale)
export const langs = locales.map(getLang)

const langMapIndex = new Map(langs.map((l, i) => [l, i]))
export const getLocale = (lang: Lang) =>
  locales[langMapIndex.get(lang) as number]

const localeSet = new Set(locales)
export const isValidLocale = (locale: any): locale is Locale =>
  localeSet.has(locale)

const langSet = new Set(langs)
export const isValidLang = (lang: any): lang is Lang => langSet.has(lang)

const names = supported.map(l => l.nativeName)
export const getLangName = (lang: Lang) =>
  names[langMapIndex.get(lang) as number]

export type Namespace = keyof typeof labels.en
export const defaultNameSpace: Namespace = 'common'

export const i18nCookieKey = 'i18n-locale'
export const i18nCookieMaxAge = 60 * 60 * 24 * 365
export const i18nHeaderKey = `x-${i18nCookieKey}`

export const i18nPromise = i18next.use(initReactI18next).init({
  resources: labels,
  supportedLngs: langs,
  lng: defaultLang,
  defaultNS: defaultNameSpace,
  fallbackNS: defaultNameSpace,
  returnNull: false,
})
