'use client'

import { useEffect } from 'react'

import { rnwClassName } from '@/tw/lib/react-native-web'

if (typeof window === 'object' && window) {
  // @ts-expect-error
  window.__rnwClassName = rnwClassName
}

export const ReactNativeWebEnhancer = () => {
  useEffect(() => undefined, [])
  return null
}
