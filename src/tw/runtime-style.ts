import { getResponsiveState } from '@/responsive/index.native'
import { getDarkModeState } from '@/theme/client.native'
import type {
  ClassName,
  ClassNameState,
  ClassNameWithSelector,
  Style,
} from '@/tw/class-name'
import { omitEmptyObject } from '@/tw/lib/class-name-to-native'
import type { ClassNameToStylesOptions } from '@/tw/lib/class-name-to-styles'
import { classNameToStyles } from '@/tw/lib/class-name-to-styles'
import { normalizeStyle } from '@/tw/lib/normalize-style'

export type RuntimeStyleOptions = Partial<
  Omit<ClassNameToStylesOptions, 'className'> & {
    state: ClassNameState | (() => ClassNameState)
    style: Style
  }
>

export const runtimeStyle = (
  className: ClassName,
  { state, style, onSelector, ...options }: RuntimeStyleOptions = {},
): Style | undefined => {
  if (!className) {
    return
  }

  if (typeof state === 'function') {
    state = state()
  } else {
    state = {
      ...getResponsiveState(),
      ...getDarkModeState(),
      ...state,
    }
  }

  const styles = classNameToStyles({
    className,
    onSelector: selector =>
      onSelector ? onSelector(selector) : defaultOnSelector(selector, state),
    ...options,
  })

  const flatten = Object.assign({}, ...styles, style)
  normalizeStyle(flatten)

  return omitEmptyObject(flatten)
}

const defaultOnSelector = (
  { selector, style }: ClassNameWithSelector,
  state: ClassNameState,
) => (selector === true || state[selector]) && style
