/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

/* eslint-disable no-restricted-imports */

import { TextInput } from 'react-native'

import type { InputPropsWocn } from '@/rn/core/components/base-without-class-name/input'
import {
  isReanimated,
  renderAnimatedStyle,
} from '@/rn/core/components/base-without-class-name/props'
import { createAnimatedComponent } from '@/rn/core/tw/lib/create-animated-component'
import { styleToProps } from '@/rn/core/tw/lib/style-to-props'

const styleProps = ['placeholderTextColor', 'caretHidden']

export const InputWocn = (props: InputPropsWocn) => {
  props = styleToProps(props, styleProps)
  const Component: any = isReanimated(props) ? AnimatedInput : TextInput
  return renderAnimatedStyle(Component, props)
}

const AnimatedInput = createAnimatedComponent(TextInput)
