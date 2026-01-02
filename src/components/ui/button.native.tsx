import { useCallback, useRef, useState } from 'react'
import type { LayoutChangeEvent } from 'react-native'

import type { PressableRn } from '@/components/base-without-class-name/pressable'
import type { ButtonProps } from '@/components/ui/button'
// @ts-ignore
import { Button as ButtonBase } from '@/components/ui/button.tsx'
import { Ripple } from '@/components/ui/button-ripple.native'

const rippleColor = 'rgba(255,255,255,0.5)'
const rippleDurationMs = 1000
type RippleState = { id: number; x: number; y: number; size: number }

export const Button = (props: ButtonProps) => {
  const layoutRef = useRef({ w: 0, h: 0 })
  const [ripples, setRipples] = useState<RippleState[]>([])

  const handleLayout = useCallback(
    (e: LayoutChangeEvent) => {
      const { width, height } = e.nativeEvent.layout
      layoutRef.current = { w: width, h: height }
      props.onLayout?.(e)
    },
    [props.onLayout],
  )

  const spawnRipple = useCallback(
    (x: number, y: number) => {
      const { w, h } = layoutRef.current
      if (!w || !h) {
        return
      }

      const maxX = Math.max(x, w - x)
      const maxY = Math.max(y, h - y)
      const rippleSize = Math.ceil(Math.sqrt(maxX * maxX + maxY * maxY) * 2)

      const id = (Date.now() << 8) + ((Math.random() * 256) | 0)

      setRipples(prev => [...prev, { id, x, y, size: rippleSize }])

      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== id))
      }, rippleDurationMs + 40)
    },
    [rippleDurationMs],
  )

  const ref = useRef<PressableRn>(null)

  const onPressIn = useCallback(
    (e: any) => {
      props.onPressIn?.(e)
      const { pageX, pageY } = e.nativeEvent
      ref.current?.measureInWindow?.(
        (x0: number, y0: number, w: number, h: number) => {
          if (w && h) {
            layoutRef.current = { w, h }
          }
          const x = pageX - x0
          const y = pageY - y0
          const cx = Math.max(0, Math.min(x, layoutRef.current.w))
          const cy = Math.max(0, Math.min(y, layoutRef.current.h))
          spawnRipple(cx, cy)
        },
      )
    },
    [props.onPressIn, spawnRipple],
  )

  return (
    <ButtonBase
      {...props}
      ref={ref}
      onLayout={handleLayout}
      onPressIn={onPressIn}
      ripples={ripples.map(r => (
        <Ripple
          key={`${r.id}`}
          style={{
            left: r.x - r.size / 2,
            top: r.y - r.size / 2,
            width: r.size,
            height: r.size,
            backgroundColor: rippleColor,
          }}
          size={r.size}
          duration={rippleDurationMs}
        />
      ))}
    />
  )
}
