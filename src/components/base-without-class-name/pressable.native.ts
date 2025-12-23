/* eslint-disable no-restricted-imports */

import { createElement } from 'react'
import { Pressable } from 'react-native'
import { createAnimatedComponent } from 'react-native-reanimated'

import type { PressablePropsWocn } from '@/components/base-without-class-name/pressable'
import { isReanimated } from '@/utils/is-reanimated'

export const PressableWocn = (props: PressablePropsWocn) => {
  const Component = isReanimated(props) ? AnimatedPressable : Pressable
  return createElement(Component, props)
}

const AnimatedPressable = createAnimatedComponent(Pressable)
