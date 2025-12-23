import { twMerge as twMergeOriginal } from 'tailwind-merge'

import j from '@/codegen/class-names.min.json'
import type { StrMap } from '@/utils/ts'

// on web the class names will be minified using babel-plugin-tw and postcss-rename
// remap to tw and merge then remap again to minified
const split = /\s+/
const cache: StrMap<string> = {}
const twMergeMinified = (v: string) => {
  let r = cache[v]
  if (!r) {
    r = minify(twMergeOriginal(unminify(v)))
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

export const twMerge = process.env.NEXT_PUBLIC_MINIFY_CLASS_NAMES
  ? twMergeMinified
  : twMergeOriginal

// for runtime style on web
export const twUnminify = process.env.NEXT_PUBLIC_MINIFY_CLASS_NAMES
  ? unminify
  : undefined
