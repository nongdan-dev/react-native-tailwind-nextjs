import { useSafeAreaInsets } from 'react-native-safe-area-context'

import type { ClassName } from '@/tw/class-name'

export const useSafeAreaPadding = () => {
  const insets = useSafeAreaInsets()
  return {
    paddingTop: insets.top,
    paddingRight: insets.right,
    paddingBottom: insets.bottom,
    paddingLeft: insets.left,
  } as ClassName
}

export const useSafeAreaPaddingTop = () => {
  const insets = useSafeAreaInsets()
  return { paddingTop: insets.top } as ClassName
}
export const useSafeAreaPaddingRight = () => {
  const insets = useSafeAreaInsets()
  return { paddingRight: insets.right } as ClassName
}
export const useSafeAreaPaddingBottom = () => {
  const insets = useSafeAreaInsets()
  return { paddingBottom: insets.bottom } as ClassName
}
export const useSafeAreaPaddingLeft = () => {
  const insets = useSafeAreaInsets()
  return { paddingLeft: insets.left } as ClassName
}
