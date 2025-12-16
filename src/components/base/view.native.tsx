/* eslint-disable no-restricted-imports */

import { View as RnView } from 'react-native'
import Animated from 'react-native-reanimated'

import type { ViewProps } from '@/components/base/view'
import { isReanimated } from '@/utils/is-reanimated'

export const View = (props: ViewProps) => {
  const Component = isReanimated(props) ? Animated.View : RnView
  return <Component {...props} />
}
