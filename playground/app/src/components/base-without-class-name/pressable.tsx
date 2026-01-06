/**
 * Copyright (c) 2026 nongdan.dev
 * Licensed under the MIT License.
 * See LICENSE file in the project root for full license information.
 */

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
