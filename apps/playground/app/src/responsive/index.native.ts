/**
 * Copyright (c) 2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import { Dimensions } from 'react-native'

import { useWindowDimensions } from '@/hooks/use-window-dimensions.native'
import { toResponsiveState } from '@/responsive/config'

export const useResponsiveState = () => {
  const { width } = useWindowDimensions()
  return toResponsiveState(width)
}
export const getResponsiveState = () => {
  const { width } = Dimensions.get('window')
  return toResponsiveState(width)
}
