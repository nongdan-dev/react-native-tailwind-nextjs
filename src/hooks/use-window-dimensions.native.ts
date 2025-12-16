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
