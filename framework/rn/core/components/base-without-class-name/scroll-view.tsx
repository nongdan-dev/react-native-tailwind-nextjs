/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

/* eslint-disable no-restricted-imports */

import type {
  NativeMethods,
  ScrollViewComponent,
  ScrollViewProps,
} from 'react-native'
import { ScrollView } from 'react-native'

import type { CommonProps } from '@/rn/core/components/base-without-class-name/props'

export type ScrollViewPropsWocn = CommonProps<ScrollViewRn> & ScrollViewProps
export const ScrollViewWocn = ScrollView

// export original type for ref
export type ScrollViewRn = ScrollViewComponent & NativeMethods
