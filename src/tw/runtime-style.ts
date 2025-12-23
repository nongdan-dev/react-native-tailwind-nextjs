import type { SelectorState, Style } from '@/tw/class-name'
import type { ClassNameToStylesOptions } from '@/tw/lib/class-name-to-styles'
import { classNameToStyles } from '@/tw/lib/class-name-to-styles'
import { normalizeStyle } from '@/tw/lib/normalize-style'

export type RuntimeStyleOptions = Omit<
  ClassNameToStylesOptions,
  'className' | 'selectorState'
> & {
  selectorState?: SelectorState | (() => SelectorState)
}
export const runtimeStyle = (
  className: string,
  { selectorState, ...options }: RuntimeStyleOptions = {},
): Style | undefined => {
  if (!className) {
    return
  }

  if (typeof selectorState === 'function') {
    selectorState = selectorState()
  } else {
    selectorState = {
      // TODO: get selector state
      ...selectorState,
    }
  }

  const styles = classNameToStyles({
    className,
    selectorState,
    ...options,
  })

  const style = Object.assign({}, ...styles)
  normalizeStyle(style)

  return style
}
