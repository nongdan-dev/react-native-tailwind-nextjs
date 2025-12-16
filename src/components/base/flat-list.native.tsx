/* eslint-disable no-restricted-imports */

import { FlatList as RnFlatList } from 'react-native'
import Animated from 'react-native-reanimated'

import type { FlatListProps } from '@/components/base/flat-list'
import { cn } from '@/tw/cn'
import { isReanimated } from '@/utils/is-reanimated'

export const FlatList = (props: FlatListProps<any>) => {
  const Component = isReanimated(props)
    ? (Animated.FlatList as any as typeof RnFlatList)
    : RnFlatList

  return (
    <Component
      {...props}
      columnWrapperStyle={
        cn(props.columnWrapperClassName, props.columnWrapperStyle as any) as any
      }
      contentContainerStyle={
        cn(
          props.contentContainerClassName,
          props.contentContainerStyle as any,
        ) as any
      }
    />
  )
}
