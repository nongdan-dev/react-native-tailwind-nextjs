/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import { useCallback, useEffect, useRef, useState } from 'react'
import type { ViewStyle } from 'react-native'
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

import type { PressableRn } from '@/rn/core/components/base/pressable'
import { View } from '@/rn/core/components/base/view'
import type { RippleProps, RippleState } from '@/rn/core/components/ui/ripple'
import { ulid } from '@/shared/ulidx'

const rippleDurationMs = 1000

export const useRipple = (props?: RippleProps) => {
  const ref = useRef<PressableRn>(null)
  const [ripples, setRipples] = useState<RippleState[]>([])

  const timeoutsRef = useRef<number[]>([])
  useEffect(
    () => () => {
      for (const t of timeoutsRef.current) {
        window.clearTimeout(t)
      }
      timeoutsRef.current = []
    },
    [],
  )

  const onPressIn = useCallback((e: any) => {
    const { pageX, pageY } = e.nativeEvent
    ref.current?.measureInWindow?.(
      (x0: number, y0: number, w: number, h: number) => {
        if (!w || !h) {
          return
        }

        const x = pageX - x0
        const y = pageY - y0
        const cx = Math.max(0, Math.min(x, w))
        const cy = Math.max(0, Math.min(y, h))

        const maxX = Math.max(cx, w - cx)
        const maxY = Math.max(cy, h - cy)
        const rippleSize = Math.ceil(Math.sqrt(maxX * maxX + maxY * maxY) * 2)

        const id = ulid()
        setRipples(prev => [...prev, { id, x: cx, y: cy, size: rippleSize }])

        const t = setTimeout(() => {
          setRipples(prev => prev.filter(r => r.id !== id))
        }, rippleDurationMs + 17)

        timeoutsRef.current.push(t)
      },
    )
  }, [])

  const jsxRipples = ripples.map(r => (
    <Ripple
      key={`${r.id}`}
      style={{
        position: 'absolute',
        backgroundColor: 'rgba(255,255,255,0.5)',
        left: r.x - r.size / 2,
        top: r.y - r.size / 2,
        width: r.size,
        height: r.size,
        borderRadius: r.size / 2,
      }}
      {...props}
    />
  ))

  const pressableProps = {
    ref,
    onPressIn,
  }

  return [jsxRipples, pressableProps]
}

type RippleItemProps = RippleProps & {
  style: ViewStyle
}

const Ripple = ({ className, style }: RippleItemProps) => {
  const scale = useSharedValue(0)
  const opacity = useSharedValue(1)

  useEffect(() => {
    scale.value = 0
    opacity.value = 1
    scale.value = withTiming(1, {
      duration: rippleDurationMs,
      easing: Easing.out(Easing.ease),
    })
    opacity.value = withTiming(0, {
      duration: rippleDurationMs,
      easing: Easing.out(Easing.ease),
    })
  }, [opacity, scale])

  const animation = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }))

  return (
    <View
      pointerEvents='none'
      className={className}
      style={[style, animation]}
      nativeForceAnimated
    />
  )
}
