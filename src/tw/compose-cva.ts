/* eslint-disable custom/no-access-property */

import type { Falsish, OrArr, StrMap } from '@/utils/ts'

type Cn<T> = OrArr<Falsish<T>>
type MapCn<T> = Falsish<StrMap<Cn<T>>>

type AttrCn<T> = T | { className: Cn<T>; children: MapCn<T> }
type Attrs<T> = StrMap<StrMap<AttrCn<T>>>

type Variant = Falsish<StrMap<boolean | string>>
type CompoundVariant<T> = Variant & {
  className: Cn<T>
  children?: MapCn<T>
}

export const composeCva = <T>(
  variant: Variant,
  options: {
    className: T
    children: MapCn<T>
    attributes: Attrs<T>
    defaultVariant: Variant
    compoundVariants: CompoundVariant<T>[]
  },
) => {
  const { className, children, attributes, defaultVariant, compoundVariants } =
    options

  const classNames: T[] = []
  pushClassName(classNames, className)

  const childrenClassNames: StrMap<T[]> = {}
  pushChildrenClassNames(childrenClassNames, children)

  let variantWithDefault: Variant = undefined
  if (defaultVariant) {
    variantWithDefault = Object.assign({}, defaultVariant as Variant)
  }
  if (variant) {
    if (!variantWithDefault) {
      variantWithDefault = {}
    }
    for (const [k, v] of Object.entries(variant)) {
      if (v === undefined || v === null) {
        continue
      }
      variantWithDefault[k] = v
    }
  }

  if (variantWithDefault) {
    for (const [k, v] of Object.entries(variantWithDefault)) {
      const attr = attributes?.[k]?.[v as string]
      if (!attr) {
        continue
      }
      // @ts-expect-error
      if (attr.className) {
        const a = attr as {
          className: Cn<T>
          children: MapCn<T>
        }
        pushClassName(classNames, a.className)
        pushChildrenClassNames(childrenClassNames, a.children)
      } else {
        const a = attr as Cn<T>
        pushClassName(classNames, a)
      }
      if (!compoundVariants) {
        continue
      }
      for (const {
        className: compoundClassName,
        children: compoundCompose,
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
          pushClassName(classNames, compoundClassName)
          pushChildrenClassNames(childrenClassNames, compoundCompose)
        }
      }
    }
  }

  return {
    classNames,
    childrenClassNames,
  }
}

const pushClassName = <T>(arr: T[], cn: Cn<T>) => {
  if (!cn) {
    return
  }
  if (Array.isArray(cn)) {
    for (const cn2 of cn) {
      pushClassName(arr, cn2)
    }
    return
  }
  arr.push(cn)
}

const pushChildrenClassName = <T>(map: StrMap<T[]>, k: string, cn: Cn<T>) => {
  if (!cn) {
    return
  }
  if (Array.isArray(cn)) {
    for (const cn2 of cn) {
      pushChildrenClassName(map, k, cn2)
    }
    return
  }
  const arr = map[k]
  if (!arr) {
    map[k] = [cn]
  } else {
    arr.push(cn)
  }
}
const pushChildrenClassNames = <T>(map: StrMap<T[]>, c: MapCn<T>) => {
  if (!c) {
    return
  }
  for (const [k, v] of Object.entries(c)) {
    pushChildrenClassName(map, k, v)
  }
}
