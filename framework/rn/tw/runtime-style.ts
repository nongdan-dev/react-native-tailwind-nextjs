/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import type {
  ClassName,
  ClassNameState,
  ClassNameWithSelector,
  Style,
  StyleSingle,
} from '@/rn/tw/class-name'
import { omitEmptyObject } from '@/rn/tw/lib/class-name-to-native'
import type { ClassNameToStylesOptions } from '@/rn/tw/lib/class-name-to-styles'
import { classNameToStyles } from '@/rn/tw/lib/class-name-to-styles'
import { normalizeStyle } from '@/rn/tw/lib/normalize-style'

export type RuntimeStyleOptions = Partial<
  Omit<ClassNameToStylesOptions, 'className'> & {
    state?: ClassNameState
    style?: Style
  }
>

export const runtimeStyle = (
  className: ClassName,
  { state, style, onSelector, ...options }: RuntimeStyleOptions = {},
): StyleSingle | undefined => {
  if (!className) {
    return
  }

  const styles = classNameToStyles({
    className,
    onSelector: selector =>
      onSelector ? onSelector(selector) : defaultOnSelector(selector, state),
    ...options,
  })

  if (Array.isArray(style)) {
    style = style.flat(Infinity as 0).filter(v => v)
    style = Object.assign({}, ...style)
  }

  const flatten = Object.assign({}, ...styles, style)
  normalizeStyle(flatten)

  return omitEmptyObject(flatten)
}

const defaultOnSelector = (
  { selector, style }: ClassNameWithSelector,
  state?: ClassNameState,
) => (selector === true || state?.[selector]) && style
