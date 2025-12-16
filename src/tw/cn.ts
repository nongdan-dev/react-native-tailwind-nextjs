import type { ImageStyle, TextStyle, ViewStyle } from 'react-native'
import { twJoin, twMerge as originalTwMerge } from 'tailwind-merge'

import j from '@/codegen/class-names.min.json'
import { dynamicStyle } from '@/tw/dynamic-style'
import { cnKey } from '@/utils/platform'
import type { StrMap } from '@/utils/ts'

declare const __cn: unique symbol
export type CnValue = {
  readonly [__cn]: 'type enforce to handle distinction between className in web and style in react native'
}

export type CnInput = CnValue | false | 0 | '' | null | undefined
export type CnFn = (...inputs: CnInput[]) => CnValue
export const cn: CnFn = (...inputs) => twMerge(twJoin(inputs as any)) as any

export type CnFromProps = (props: any) => CnValue | undefined
export const cnFromProps: CnFromProps = (props: any) => props[cnKey]

type Style = ViewStyle & TextStyle & ImageStyle
export type CnDynamicStyle = (...classNames: CnValue[]) => Style
export const cnDynamicStyle: CnDynamicStyle = (...classNames) =>
  dynamicStyle(classNames, unminify)

// on web the class names will be minified using babel-plugin-cn
// remap to tw and merge then remap again to minified
const split = /\s+/
const cache: StrMap<string> = {}
const twMerge = (v: string) => {
  let r = cache[v]
  if (!r) {
    r = minify(originalTwMerge(unminify(v)))
    cache[v] = r
  }
  return r
}

const twMapMinified = j as StrMap<string>
const minifiedMapTw: StrMap<string> = {}
for (const k in twMapMinified) {
  minifiedMapTw[k] = twMapMinified[k]
}

const unminify = (v: string) =>
  v
    .split(split)
    .map(k => minifiedMapTw[k] || k)
    .join(' ')
const minify = (v: string) =>
  v
    .split(split)
    .map(k => twMapMinified[k] || k)
    .join(' ')
