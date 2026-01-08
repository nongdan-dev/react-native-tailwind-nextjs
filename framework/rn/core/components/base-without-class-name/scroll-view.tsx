/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

/* eslint-disable no-restricted-imports */

import type { Ref } from 'react'
import type {
  NativeMethods,
  ScrollViewComponent,
  ScrollViewProps,
} from 'react-native'
import { ScrollView } from 'react-native'

export type ScrollViewPropsWocn = ScrollViewProps & {
  ref?: Ref<ScrollViewRn>
  __rnwTag?: string
}
export const ScrollViewWocn = ScrollView

// export original type for ref
export type ScrollViewRn = ScrollViewComponent & NativeMethods
