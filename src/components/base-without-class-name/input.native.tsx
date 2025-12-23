/* eslint-disable no-restricted-imports */

import { set } from 'lodash'
import type { StyleProp, TextStyle, ViewStyle } from 'react-native'
import { TextInput } from 'react-native'
import type { CSSTransitionProperties } from 'react-native-reanimated'
import Animated from 'react-native-reanimated'

import type { InputPropsWocn } from '@/components/base-without-class-name/input'
import { styleToProps } from '@/tw/lib/style-to-props'
import { isReanimated } from '@/utils/is-reanimated'
import type { StrMap } from '@/utils/ts'

const styleProps = ['placeholderTextColor']

export const InputWocn = (props: InputPropsWocn) => {
  props = styleToProps(props, styleProps)
  const Component = isReanimated(props) ? AnimatedInput : TextInput
  return <Component {...props} />
}

const AnimatedInput = (props: InputPropsWocn) => {
  const animatedStyle: StyleProp<ViewStyle> = {
    overflow: 'hidden',
  }
  const textInputStyle: StyleProp<TextStyle> = {
    width: '100%',
    borderWidth: 0,
    backgroundColor: 'transparent',
  }

  // style should be guarantee to present since we already checked isReanimated
  const style = props.style as StrMap
  Object.keys(style).forEach(k => {
    if (supportedStyle.has(k) || supportedPrefixes.some(p => k.startsWith(p))) {
      set(animatedStyle, k, style[k])
    } else {
      set(textInputStyle, k, style[k])
    }
  })

  return (
    <Animated.View style={animatedStyle}>
      <TextInput {...props} />
    </Animated.View>
  )
}

const supportedPrefixes: string[] = [
  'margin',
  'border',
  'transform',
  'translate',
  'scale',
]
const textStyle: (keyof TextStyle)[] = [
  'width',
  'height',
  'backgroundColor',
  'opacity',
  'rotation',
]
const transitionStyle: (keyof CSSTransitionProperties)[] = [
  'transitionProperty',
  'transitionDuration',
  'transitionTimingFunction',
]
const supportedStyle = new Set<string>([...textStyle, ...transitionStyle])
