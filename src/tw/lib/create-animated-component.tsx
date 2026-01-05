import { set } from 'lodash'
import type { TextStyle, ViewStyle } from 'react-native'
import Animated from 'react-native-reanimated'

import type { InputPropsWocn } from '@/components/base-without-class-name/input'
import type { StrMap } from '@/utils/ts'

export const createAnimatedComponent =
  (Component: any) => (props: InputPropsWocn) => {
    const animatedStyle: ViewStyle = {
      overflow: 'hidden',
    }
    const textInputStyle: TextStyle = {
      width: '100%',
      borderWidth: 0,
      backgroundColor: 'transparent',
    }

    // style should be guarantee to present since we already checked isReanimated
    const style = props.style as StrMap
    Object.keys(style).forEach(k => {
      if (
        supportedStyleSet.has(k) ||
        supportedPrefixes.some(p => k.startsWith(p))
      ) {
        set(animatedStyle, k, style[k])
      } else {
        set(textInputStyle, k, style[k])
      }
    })

    return (
      <Animated.View style={animatedStyle}>
        <Component {...props} />
      </Animated.View>
    )
  }

const supportedPrefixes: string[] = [
  'margin',
  'border',
  'transform',
  'translate',
  'scale',
  'transition',
  'animation',
]
const supportedStyle: (keyof ViewStyle)[] = [
  'width',
  'height',
  'backgroundColor',
  'opacity',
  'rotation',
]
const supportedStyleSet = new Set<string>(supportedStyle)
