/* eslint-disable no-restricted-imports */

import { Text } from 'react-native'
import Animated from 'react-native-reanimated'

import type { TextPropsWocn } from '@/components/base-without-class-name/text'
import { isReanimated } from '@/tw/lib/is-reanimated'
import { styleToProps } from '@/tw/lib/style-to-props'

const styleProps = ['numberOfLines', 'selectable']

export const TextWocn = (props: TextPropsWocn) => {
  props = styleToProps(props, styleProps)
  const Component: any = isReanimated(props) ? Animated.Text : Text
  return <Component {...props} />
}
