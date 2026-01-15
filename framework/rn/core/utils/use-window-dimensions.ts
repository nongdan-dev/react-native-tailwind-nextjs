/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

'use client'

import { useEffect, useState } from 'react'
import type { ScaledSize } from 'react-native'
import { Dimensions } from 'react-native'

export const useWindowDimensions = () => {
  // initial value will be undefined and matched with server
  const [dimensions, setDimensions] = useState<ScaledSize | undefined>(
    undefined,
  )

  useEffect(() => {
    const d = Dimensions.get('window')
    setDimensions(d)

    const h = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window)
    })
    return () => h.remove()
  }, [])

  return dimensions
}
