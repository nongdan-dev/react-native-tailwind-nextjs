/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

/* eslint-disable no-restricted-imports */

import type { NativeMethods, TextComponent, TextProps } from 'react-native'
import { Text } from 'react-native'

import type { CommonProps } from '@/rn/core/components/base-without-class-name/props'

export type TextPropsWocn = CommonProps<TextRn> &
  Omit<
    TextProps,
    // should be supported using class name in native
    'numberOfLines' | 'selectable'
  >
export const TextWocn = Text

// export original type for ref
export type TextRn = TextComponent & NativeMethods
