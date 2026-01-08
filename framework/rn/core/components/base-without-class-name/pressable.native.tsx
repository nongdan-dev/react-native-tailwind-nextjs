/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

/* eslint-disable no-restricted-imports */

import { Pressable } from 'react-native'
import { createAnimatedComponent } from 'react-native-reanimated'

import type { PressablePropsWocn } from '@/rn/core/components/base-without-class-name/pressable'
import { isReanimated } from '@/rn/core/tw/lib/is-reanimated'

export const PressableWocn = (props: PressablePropsWocn) => {
  const Component: any = isReanimated(props) ? AnimatedPressable : Pressable
  return <Component {...props} />
}

const AnimatedPressable = createAnimatedComponent(Pressable)
