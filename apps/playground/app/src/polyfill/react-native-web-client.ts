/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

'use client'

import { useEffect } from 'react'

import { rnwClassName } from '#/tw/lib/react-native-web'

if (typeof window === 'object' && window) {
  // @ts-expect-error
  window.__rnwClassName = rnwClassName
}

export const ReactNativeWebEnhancer = () => {
  useEffect(() => undefined, [])
  return null
}
