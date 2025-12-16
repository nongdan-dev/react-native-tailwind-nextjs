import type { ImageStyle, StyleProp } from 'react-native'

import type { CnValue } from '@/tw/cn'

export type ImageProps = {
  // only support some basic props for now
  // resize mode should be supported using class name in native
  src: string
  className?: CnValue
  style?: StyleProp<ImageStyle>
}

export const Image = (props: ImageProps) => <img {...(props as any)} />
