/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

/* eslint-disable no-restricted-imports */

import { TextInput } from 'react-native'

import { createAnimatedComponent } from '@/rn/tw/lib/create-animated-component'
import { isReanimated } from '@/rn/tw/lib/is-reanimated'
import { styleToProps } from '@/rn/tw/lib/style-to-props'
import type { InputPropsWocn } from '#/components/base-without-class-name/input'

const styleProps = ['placeholderTextColor', 'caretHidden']

export const InputWocn = (props: InputPropsWocn) => {
  props = styleToProps(props, styleProps)
  const Component: any = isReanimated(props) ? AnimatedInput : TextInput
  return <Component {...props} />
}

const AnimatedInput = createAnimatedComponent(TextInput)
