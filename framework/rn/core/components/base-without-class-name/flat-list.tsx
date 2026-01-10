/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

/* eslint-disable no-restricted-imports */

import type {
  FlatListComponent,
  FlatListProps,
  NativeMethods,
} from 'react-native'
import { FlatList } from 'react-native'

import type { CommonProps } from '@/rn/core/components/base-without-class-name/props'

export type FlatListPropsWocn<T> = CommonProps<
  FlatListRn<T, FlatListProps<T>>
> &
  FlatListProps<T>
export const FlatListWocn = FlatList

// export original type for ref
export type FlatListRn<T, Props> = FlatListComponent<T, Props> & NativeMethods
