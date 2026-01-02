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
