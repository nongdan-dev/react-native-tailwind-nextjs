/* eslint-disable no-restricted-imports */

import { createElement } from 'react'
import { View } from 'react-native'
import Animated from 'react-native-reanimated'

import type { ViewPropsWocn } from '@/components/base-without-class-name/view'
import { isReanimated } from '@/utils/is-reanimated'

export const ViewWocn = (props: ViewPropsWocn) => {
  const Component = isReanimated(props) ? Animated.View : View
  return createElement(Component, props)
}
