/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import { useWindowDimensions } from '@/rn/core/hooks/use-window-dimensions.native'
import { toResponsiveState } from '@/rn/core/responsive/config'

export const useResponsiveState = () => {
  const { width } = useWindowDimensions()
  return toResponsiveState(width)
}
