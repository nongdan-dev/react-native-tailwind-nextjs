/**
 * Copyright (c) 2026 nongdan.dev
 * Licensed under the MIT License.
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
