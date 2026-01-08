/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import { useEffect, useState } from 'react'
import type { ScaledSize } from 'react-native'
import { Dimensions } from 'react-native'

// rewrite to also support nextjs ssr and web browser
// we can import .native on web if we need this
export const useWindowDimensions = () => {
  const [dimensions, setDimensions] = useState<ScaledSize>({
    width: 0,
    height: 0,
    fontScale: 1,
    scale: 1,
  })

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
