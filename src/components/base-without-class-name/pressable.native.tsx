/* eslint-disable no-restricted-imports */

import { Pressable } from 'react-native'
import { createAnimatedComponent } from 'react-native-reanimated'

import type { PressablePropsWocn } from '@/components/base-without-class-name/pressable'
import { isReanimated } from '@/tw/lib/is-reanimated'

export const PressableWocn = (props: PressablePropsWocn) => {
  const Component = isReanimated(props) ? AnimatedPressable : Pressable
  return <Component {...props} />
}

const AnimatedPressable = createAnimatedComponent(Pressable)
