/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import type { Ref } from 'react'

export type CommonProps<T = any> = {
  ref?: Ref<T>
  rnwTag?: string
  nativeAnimatedStyle?: any
}

type Style = {
  transitionProperty?: unknown
  animationName?: unknown
}
type Props = Pick<CommonProps, 'nativeAnimatedStyle'> & {
  style?: Style
}

// style should be flatten already in create class name component
export const isReanimated = (props: any) => {
  const p = props as Props
  if (p.nativeAnimatedStyle) {
    return true
  }
  if (!p.style) {
    return false
  }
  return 'transitionProperty' in p.style || 'animationName' in p.style
}

export const renderAnimatedStyle = (Component: any, props: any) => {
  if (props.nativeAnimatedStyle) {
    props = { ...props }
    const style = Array.isArray(props.style) ? props.style : [props.style]
    props.style = [...style, props.nativeAnimatedStyle]
  }
  return <Component {...props} />
}
