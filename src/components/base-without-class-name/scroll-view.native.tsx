/* eslint-disable no-restricted-imports */

import { ScrollView } from 'react-native'
import Animated from 'react-native-reanimated'

import type { ScrollViewPropsWocn } from '@/components/base-without-class-name/scroll-view'
import { isReanimated } from '@/tw/lib/is-reanimated'

export const ScrollViewWocn = (props: ScrollViewPropsWocn) => {
  const Component = isReanimated(props) ? Animated.ScrollView : ScrollView
  return <Component {...props} />
}
