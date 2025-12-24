import type { FC } from 'react'
import type { ImageStyle } from 'react-native'

export type ImagePropsWocn = {
  // only support some basic props for now
  // resize mode should be supported using class name in native
  src: string
  style?: ImageStyle
}

export const ImageWocn: FC<ImagePropsWocn> = props => (
  <img {...(props as any)} />
)
