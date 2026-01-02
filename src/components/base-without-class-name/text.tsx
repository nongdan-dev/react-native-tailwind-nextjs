/* eslint-disable no-restricted-imports */

import type { Ref } from 'react'
import type { NativeMethods, TextComponent, TextProps } from 'react-native'
import { Text } from 'react-native'

export type TextPropsWocn = Omit<
  TextProps,
  // should be supported using class name in native
  'numberOfLines' | 'selectable'
> & {
  ref?: Ref<TextRn>
  __rnwTag?: string
}
export const TextWocn = Text

// export original type for ref
export type TextRn = TextComponent & NativeMethods
