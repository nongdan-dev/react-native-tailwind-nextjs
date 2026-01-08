/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

/* eslint-disable no-restricted-imports */

import { FlatList } from 'react-native'
import Animated from 'react-native-reanimated'

import type { FlatListPropsWocn } from '@/rn/core/components/base-without-class-name/flat-list'
import { isReanimated } from '@/rn/core/tw/lib/is-reanimated'

export const FlatListWocn = (props: FlatListPropsWocn<any>) => {
  const Component: any = isReanimated(props) ? Animated.FlatList : FlatList
  return <Component {...props} />
}
