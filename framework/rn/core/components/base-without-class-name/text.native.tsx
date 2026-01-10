/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

/* eslint-disable no-restricted-imports */

import { Text } from 'react-native'
import Animated from 'react-native-reanimated'

import {
  isReanimated,
  renderAnimatedStyle,
} from '@/rn/core/components/base-without-class-name/props'
import type { TextPropsWocn } from '@/rn/core/components/base-without-class-name/text'
import { styleToProps } from '@/rn/core/tw/lib/style-to-props'

const styleProps = ['numberOfLines', 'selectable']

export const TextWocn = (props: TextPropsWocn) => {
  props = styleToProps(props, styleProps)
  const Component: any = isReanimated(props) ? Animated.Text : Text

  return renderAnimatedStyle(Component, {
    suppressHighlighting: true,
    ...props,
  })
}
