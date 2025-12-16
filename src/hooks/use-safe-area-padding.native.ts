import { useSafeAreaInsets } from 'react-native-safe-area-context'

import type { CnValue } from '@/tw/cn'

export const useSafeAreaPadding = (): CnValue => {
  const insets = useSafeAreaInsets()
  return {
    paddingTop: insets.top,
    paddingRight: insets.right,
    paddingBottom: insets.bottom,
    paddingLeft: insets.left,
  } as any
}

export const useSafeAreaPaddingTop = (): CnValue => {
  const insets = useSafeAreaInsets()
  return { paddingTop: insets.top } as any
}
export const useSafeAreaPaddingRight = (): CnValue => {
  const insets = useSafeAreaInsets()
  return { paddingRight: insets.right } as any
}
export const useSafeAreaPaddingBottom = (): CnValue => {
  const insets = useSafeAreaInsets()
  return { paddingBottom: insets.bottom } as any
}
export const useSafeAreaPaddingLeft = (): CnValue => {
  const insets = useSafeAreaInsets()
  return { paddingLeft: insets.left } as any
}
