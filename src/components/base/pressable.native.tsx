/* eslint-disable no-restricted-imports */

import { Pressable as RnPressable } from 'react-native'
import { createAnimatedComponent } from 'react-native-reanimated'

import type { PressableProps } from '@/components/base/pressable'
import { isReanimated } from '@/utils/is-reanimated'

export const Pressable = (props: PressableProps) => {
  const Component = isReanimated(props) ? AnimatedPressable : RnPressable
  return <Component {...props} />
}

const AnimatedPressable = createAnimatedComponent(RnPressable)
