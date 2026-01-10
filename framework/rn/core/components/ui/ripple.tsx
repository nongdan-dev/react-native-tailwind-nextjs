/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

'use client'

import type { ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'

import '@/rn/core/components/ui/ripple.css'

import type { PressableProps } from '@/rn/core/components/base/pressable'
import type { ClassName } from '@/rn/core/tw/class-name'
import { clsx } from '@/rn/core/tw/clsx'
import { ulid } from '@/shared/ulidx'

const rippleDurationMs = 1000

export const useRipple = (
  props?: RippleProps,
): [ReactNode, PressableProps | undefined] => [
  <Ripples {...props} />,
  undefined,
]

export type RippleProps = {
  className?: ClassName
}
export type RippleState = {
  id: string
  x: number
  y: number
  size: number
}

const Ripples = (props?: RippleProps) => {
  const anchorRef = useRef<HTMLSpanElement>(null)
  const timeoutsRef = useRef<number[]>([])
  const [ripples, setRipples] = useState<RippleState[]>([])

  useEffect(() => {
    const parent = anchorRef.current?.parentElement
    if (!parent) {
      return
    }

    const listener = (e: MouseEvent) => {
      if (
        e.button !== 0 ||
        parent.getAttribute('aria-disabled') === 'true' ||
        (parent as any).disabled === true
      ) {
        return
      }

      const rect = parent.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const dx = Math.max(x, rect.width - x)
      const dy = Math.max(y, rect.height - y)
      const size = Math.ceil(Math.sqrt(dx * dx + dy * dy) * 2)

      const id = ulid()
      setRipples(prev => [...prev, { id, x, y, size }])

      const t = window.setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== id))
      }, rippleDurationMs + 17)

      timeoutsRef.current.push(t)
    }

    parent.addEventListener('mousedown', listener, { passive: true })

    return () => {
      parent.removeEventListener('mousedown', listener)
      for (const t of timeoutsRef.current) {
        window.clearTimeout(t)
      }
      timeoutsRef.current = []
    }
  }, [])

  const className = clsx('ripple bg-[rgba(255,255,255,0.5)]', props?.className)

  const jsxRipples = ripples.map(r => (
    <span
      key={r.id}
      className={className as string}
      style={{
        left: r.x - r.size / 2,
        top: r.y - r.size / 2,
        width: r.size,
        height: r.size,
      }}
    />
  ))

  return (
    <>
      <span ref={anchorRef} className='hidden' />
      {jsxRipples}
    </>
  )
}
