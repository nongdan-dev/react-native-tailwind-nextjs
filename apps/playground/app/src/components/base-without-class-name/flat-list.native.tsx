/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

/* eslint-disable no-restricted-imports */

import { FlatList } from 'react-native'
import Animated from 'react-native-reanimated'

import { isReanimated } from '@/rn/tw/lib/is-reanimated'
import type { FlatListPropsWocn } from '#/components/base-without-class-name/flat-list'

export const FlatListWocn = (props: FlatListPropsWocn<any>) => {
  const Component: any = isReanimated(props) ? Animated.FlatList : FlatList
  return <Component {...props} />
}
