/* eslint-disable no-restricted-imports */

import { createElement } from 'react'
import { Text } from 'react-native'
import Animated from 'react-native-reanimated'

import type { TextPropsWocn } from '@/components/base-without-class-name/text'
import { styleToProps } from '@/tw/lib/style-to-props'
import { isReanimated } from '@/utils/is-reanimated'

const styleProps = ['numberOfLines']

export const TextWocn = (props: TextPropsWocn) => {
  props = styleToProps(props, styleProps)
  const Component = isReanimated(props) ? Animated.Text : Text
  return createElement(Component, props)
}
