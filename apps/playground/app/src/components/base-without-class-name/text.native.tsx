/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

/* eslint-disable no-restricted-imports */

import { Text } from 'react-native'
import Animated from 'react-native-reanimated'

import { isReanimated } from '@/rn/tw/lib/is-reanimated'
import { styleToProps } from '@/rn/tw/lib/style-to-props'
import type { TextPropsWocn } from '#/components/base-without-class-name/text'

const styleProps = ['numberOfLines', 'selectable']

export const TextWocn = (props: TextPropsWocn) => {
  props = styleToProps(props, styleProps)
  const Component: any = isReanimated(props) ? Animated.Text : Text
  return <Component {...props} />
}
