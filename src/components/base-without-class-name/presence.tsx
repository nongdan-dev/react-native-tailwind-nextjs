'use client'

import { useEffect, useState } from 'react'

import type { ViewPropsWocn } from '@/components/base-without-class-name/view'
import { ViewWocn } from '@/components/base-without-class-name/view'
import type { ClassName } from '@/tw/class-name'
import { clsx } from '@/tw/clsx'

export type PresencePropsWocn = ViewPropsWocn & {
  show: boolean
  entering?: ClassName
  exiting?: ClassName
}

export const PresenceWocn = ({
  show,
  entering,
  exiting,
  ...props
}: PresencePropsWocn) => {
  const [render, setRender] = useState(show)

  useEffect(() => {
    if (show) {
      setRender(true)
      return
    }
    const id = setTimeout(() => setRender(false), 3000)
    return () => clearTimeout(id)
  }, [show])

  if (!render) {
    return null
  }
  const className = clsx(props.className, show ? entering : exiting)
  return <ViewWocn {...props} className={className} />
}
