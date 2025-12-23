/* eslint-disable no-restricted-imports */

import { createElement } from 'react'
import { ScrollView } from 'react-native'
import Animated from 'react-native-reanimated'

import type { ScrollViewPropsWocn } from '@/components/base-without-class-name/scroll-view'
import { isReanimated } from '@/utils/is-reanimated'

export const ScrollViewWocn = (props: ScrollViewPropsWocn) => {
  const Component = isReanimated(props) ? Animated.ScrollView : ScrollView
  return createElement(Component, props)
}
