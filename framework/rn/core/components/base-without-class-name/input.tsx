/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

/* eslint-disable no-restricted-imports */

import type { Ref } from 'react'
import type {
  NativeMethods,
  TextInputComponent,
  TextInputProps,
} from 'react-native'
import { TextInput } from 'react-native'

export type InputPropsWocn = Omit<
  TextInputProps,
  // should be supported using class name in native
  'placeholderTextColor' | 'caretHidden'
> & {
  ref?: Ref<InputRn>
  __rnwTag?: string
}
export const InputWocn = TextInput

// export original type for ref
export type InputRn = TextInputComponent & NativeMethods
