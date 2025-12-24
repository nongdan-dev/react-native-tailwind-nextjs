/* eslint-disable no-restricted-imports */

import { FlatList } from 'react-native'
import Animated from 'react-native-reanimated'

import type { FlatListPropsWocn } from '@/components/base-without-class-name/flat-list'
import { isReanimated } from '@/tw/lib/is-reanimated'

export const FlatListWocn = (props: FlatListPropsWocn<any>) => {
  const Component = isReanimated(props) ? (Animated.FlatList as any) : FlatList
  return <Component {...props} />
}
