import { getResponsiveState } from '@/responsive/index.native'
import { getDarkModeState } from '@/theme/client.native'
import type { ClassNameState, Style } from '@/tw/class-name'
import { omitEmptyObject } from '@/tw/lib/class-name-to-native'
import type { ClassNameToStylesOptions } from '@/tw/lib/class-name-to-styles'
import { classNameToStyles } from '@/tw/lib/class-name-to-styles'
import { normalizeStyle } from '@/tw/lib/normalize-style'

export type RuntimeStyleOptions = Omit<
  ClassNameToStylesOptions,
  'className' | 'classNameState'
> & {
  classNameState?: ClassNameState | (() => ClassNameState)
  style?: Style
}
export const runtimeStyle = (
  className: string,
  { classNameState, style, ...options }: RuntimeStyleOptions = {},
): Style | undefined => {
  if (!className) {
    return
  }

  if (typeof classNameState === 'function') {
    classNameState = classNameState()
  } else {
    classNameState = {
      ...getResponsiveState(),
      ...getDarkModeState(),
      ...classNameState,
    }
  }

  const styles = classNameToStyles({
    className,
    classNameState,
    ...options,
  })

  const flatten = Object.assign({}, ...styles, style)
  normalizeStyle(flatten)

  return omitEmptyObject(flatten)
}
