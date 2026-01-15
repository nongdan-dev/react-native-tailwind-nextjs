/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

/* eslint-disable no-restricted-imports */

import { useSafeAreaInsets as useSafeAreaInsetsOriginal } from 'react-native-safe-area-context'

import type { ClassName } from '@/rn/core/tw/class-name'

export const useSafeAreaInsets = useSafeAreaInsetsOriginal as () => ClassName

export const useSafeAreaPadding = () => {
  const insets = useSafeAreaInsetsOriginal()
  return {
    paddingTop: insets.top,
    paddingRight: insets.right,
    paddingBottom: insets.bottom,
    paddingLeft: insets.left,
  } as ClassName
}

export const useSafeAreaPaddingTop = () => {
  const insets = useSafeAreaInsetsOriginal()
  return { paddingTop: insets.top } as ClassName
}
export const useSafeAreaPaddingRight = () => {
  const insets = useSafeAreaInsetsOriginal()
  return { paddingRight: insets.right } as ClassName
}
export const useSafeAreaPaddingBottom = () => {
  const insets = useSafeAreaInsetsOriginal()
  return { paddingBottom: insets.bottom } as ClassName
}
export const useSafeAreaPaddingLeft = () => {
  const insets = useSafeAreaInsetsOriginal()
  return { paddingLeft: insets.left } as ClassName
}
