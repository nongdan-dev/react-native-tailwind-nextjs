/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

/* eslint-disable no-restricted-imports */

import type {
  NativeMethods,
  TextInputComponent,
  TextInputProps,
} from 'react-native'
import { TextInput } from 'react-native'

import type { CommonProps } from '@/rn/core/components/base-without-class-name/props'

export type InputPropsWocn = CommonProps<InputRn> &
  Omit<
    TextInputProps,
    // should be supported using class name in native
    'placeholderTextColor' | 'caretHidden'
  >
export const InputWocn = TextInput

// export original type for ref
export type InputRn = TextInputComponent & NativeMethods
