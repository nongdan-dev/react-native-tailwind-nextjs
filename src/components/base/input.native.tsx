/* eslint-disable no-restricted-imports */

import type { StyleProp, TextStyle, ViewStyle } from 'react-native'
import { TextInput } from 'react-native'
import type { CSSTransitionProperties } from 'react-native-reanimated'
import Animated from 'react-native-reanimated'

import type { InputProps } from '@/components/base/input'
import { cn, cnFromProps } from '@/tw/cn'
import { isReanimated } from '@/utils/is-reanimated'
import type { StrMap } from '@/utils/ts'

export const Input = (props: InputProps) => {
  let style = cn(cnFromProps(props)) as StrMap | undefined

  if (style) {
    // clone to be able to modify
    style = { ...style }
    props = { ...props, style }
    const k = 'placeholderTextColor'
    if (k in style) {
      props[k as keyof typeof props] = style[k]
      delete style[k]
    }
  }

  const Component = isReanimated(props) ? AnimatedInput : TextInput
  return <Component {...props} />
}

const AnimatedInput = (props: InputProps) => {
  const animatedStyle: StyleProp<ViewStyle> = {
    overflow: 'hidden',
  }
  const textInputStyle: StyleProp<TextStyle> = {
    width: '100%',
    borderWidth: 0,
    backgroundColor: 'transparent',
  }

  // style should be guarantee to present since we already checked isReanimated
  const style = cn(cnFromProps(props)) as StrMap
  Object.keys(style).forEach(k => {
    if (supportedStyle.has(k) || supportedPrefixes.some(p => k.startsWith(p))) {
      type K = keyof typeof animatedStyle
      animatedStyle[k as K] = style[k]
    } else {
      type K = keyof typeof textInputStyle
      textInputStyle[k as K] = style[k]
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
