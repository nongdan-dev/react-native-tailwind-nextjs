/* eslint-disable no-restricted-imports */

import type { Ref } from 'react'
import type {
  FlatListComponent,
  FlatListProps,
  NativeMethods,
} from 'react-native'
import { FlatList } from 'react-native'

export type FlatListPropsWocn<T> = FlatListProps<T> & {
  ref?: Ref<FlatListRn<T, FlatListProps<T>>>
  __rnwTag?: string
}
export const FlatListWocn = FlatList

// export original type for ref
export type FlatListRn<T, Props> = FlatListComponent<T, Props> & NativeMethods
