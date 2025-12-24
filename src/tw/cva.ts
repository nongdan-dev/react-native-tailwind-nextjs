import { set } from 'lodash'

import { clsx } from '@/tw/clsx'
import type { StrMap } from '@/utils/ts'

type ClassNames<Map> = {
  [K in keyof Map]?: string
}

type AttrClassName<Map> = Map extends undefined ? string : ClassNames<Map>
type Attr<Map> = StrMap<AttrClassName<Map>>
type Attrs<Map> = StrMap<Attr<Map>>

type VariantOptions<Map, A extends Attrs<Map>> = {
  // taken from cva to convert string to boolean if match
  [K in keyof A]?: keyof A[K] extends 'true' | 'false' ? boolean : keyof A[K]
}

type CompoundVariant<Map, A extends Attrs<Map>> = VariantOptions<Map, A> &
  (Map extends undefined
    ? { className: string }
    : { classNames: ClassNames<Map> })

type GetCvaOptions<Map, A extends Attrs<Map>> = VariantOptions<Map, A>
type GetCva<Map, A extends Attrs<Map>> = (
  options: GetCvaOptions<Map, A>,
) => Map extends undefined ? string : ClassNames<Map>

type CvaOptions<Map, A extends Attrs<Map>> = {
  className?: string
  classNames?: Map
  attributes?: A
  defaultVariant?: VariantOptions<Map, A>
  compoundVariants?: CompoundVariant<Map, A>[]
}
type Cva = <Map extends StrMap<string>, A extends Attrs<Map>>(
  options: CvaOptions<Map, A>,
) => GetCva<Map, A>

export type Variant<Fn extends GetCva<any, any>> = Parameters<Fn>[0]

export const cva: Cva =
  ({ className, classNames, attributes, defaultVariant, compoundVariants }) =>
  variant => {
    const map: StrMap = {}

    pushClassName(map, '', className)
    pushClassNames(map, classNames)

    let variantWithDefault: typeof defaultVariant = undefined
    if (defaultVariant) {
      variantWithDefault = { ...defaultVariant }
    }
    if (variant) {
      if (!variantWithDefault) {
        variantWithDefault = {}
      }
      for (const [k, v] of Object.entries(variant)) {
        if (v === undefined || v === null) {
          continue
        }
        set(variantWithDefault, k, v)
      }
    }

    if (variantWithDefault) {
      for (const [k, v] of Object.entries(variantWithDefault)) {
        const attr = attributes?.[k]?.[v as string]
        if (!attr) {
          continue
        }
        if (typeof attr === 'string') {
          pushClassName(map, '', attr)
        } else {
          pushClassNames(map, attr)
        }
      }
      if (compoundVariants) {
        for (const {
          className: compoundClassName,
          classNames: compoundClassNames,
          ...compound
        } of compoundVariants) {
          let match = undefined
          for (const [k2, v2] of Object.entries(compound)) {
            if (variantWithDefault[k2] !== v2) {
              match = false
            } else if (match === undefined) {
              match = true
            }
          }
          if (match) {
            pushClassName(map, '', compoundClassName)
            pushClassNames(map, compoundClassNames)
          }
        }
      }
    }

    if (className) {
      return clsx(map[''])
    }

    delete map['']
    for (const [k, v] of Object.entries(map)) {
      map[k] = clsx(v)
    }
    return map as any
  }

const pushClassName = <T>(map: StrMap<T[]>, k: string, className: any) => {
  if (!className) {
    return
  }
  if (Array.isArray(className)) {
    for (const v of className) {
      pushClassName(map, k, v)
    }
    return
  }
  const arr = map[k]
  if (!arr) {
    map[k] = [className]
  } else {
    arr.push(className)
  }
}
const pushClassNames = <T>(map: StrMap<T[]>, classNames: any) => {
  if (!classNames) {
    return
  }
  for (const [k, v] of Object.entries(classNames)) {
    pushClassName(map, k, v)
  }
}
