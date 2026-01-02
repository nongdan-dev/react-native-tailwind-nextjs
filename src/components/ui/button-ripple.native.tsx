import { useEffect } from 'react'
import type { ViewStyle } from 'react-native'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

type RippleProps = {
  style: ViewStyle
  size: number
  duration: number
}

export const Ripple = ({ style, size, duration }: RippleProps) => {
  const scale = useSharedValue(0)
  const opacity = useSharedValue(1)

  useEffect(() => {
    scale.value = 0
    opacity.value = 1
    scale.value = withTiming(1, {
      duration,
      easing: Easing.out(Easing.ease),
    })
    opacity.value = withTiming(0, {
      duration,
      easing: Easing.out(Easing.ease),
    })
  }, [opacity, scale, duration])

  const animation = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }))

  return (
    <Animated.View
      pointerEvents='none'
      style={[
        style,
        {
          position: 'absolute',
          borderRadius: size / 2,
        },
        animation,
      ]}
    />
  )
}
