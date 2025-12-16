/* eslint-disable no-restricted-imports */

import { ScrollView as RnScrollView } from 'react-native'
import Animated from 'react-native-reanimated'

import type { ScrollViewProps } from '@/components/base/scroll-view'
import { isReanimated } from '@/utils/is-reanimated'

export const ScrollView = (props: ScrollViewProps) => {
  const Component = isReanimated(props) ? Animated.ScrollView : RnScrollView
  return (
    <Component
      {...props}
      contentContainerStyle={
        [props.contentContainerClassName, props.contentContainerStyle] as any
      }
    />
  )
}
