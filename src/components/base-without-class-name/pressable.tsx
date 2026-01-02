/* eslint-disable no-restricted-imports */
import type { Ref } from 'react'
import type { NativeMethods, PressableProps, ViewComponent } from 'react-native'
import { Pressable } from 'react-native'

export type PressablePropsWocn = PressableProps & {
  ref?: Ref<PressableRn>
  __rnwTag?: string
}
export const PressableWocn = Pressable

// export original type for ref
export type PressableRn = ViewComponent & NativeMethods
