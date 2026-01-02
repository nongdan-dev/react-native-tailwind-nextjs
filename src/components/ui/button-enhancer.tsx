'use client'

import { get } from 'lodash'
import { useEffect } from 'react'

import '@/components/ui/button-enhancer.css'

import { clsx } from '@/tw/clsx'

const RIPPLE_MS = 1000

export const ButtonEnhancer = () => {
  useEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0) {
        return
      }

      const t = e.target as Element | null
      const btn = t?.closest?.('[data-button="1"]') as HTMLElement | null
      if (
        !btn ||
        btn.getAttribute('aria-disabled') === 'true' ||
        get(btn, 'disabled')
      ) {
        return
      }

      const rect = btn.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const r = Math.max(
        Math.hypot(x, y),
        Math.hypot(rect.width - x, y),
        Math.hypot(x, rect.height - y),
        Math.hypot(rect.width - x, rect.height - y),
      )
      const size = Math.ceil(r * 2)

      const el = document.createElement('span')
      el.className = clsx('ui-ripple') as string
      el.style.left = `${x - size / 2}px`
      el.style.top = `${y - size / 2}px`
      el.style.width = `${size}px`
      el.style.height = `${size}px`

      btn.appendChild(el)

      const rm = () => el.remove()
      el.addEventListener('animationend', rm, { once: true })
      window.setTimeout(rm, RIPPLE_MS + 80)
    }

    document.addEventListener('pointerdown', onPointerDown, { passive: true })
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [])

  return null
}
