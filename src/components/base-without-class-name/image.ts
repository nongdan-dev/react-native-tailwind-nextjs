import type { FC } from 'react'
import { createElement } from 'react'
import type { ImageStyle, StyleProp } from 'react-native'

export type ImagePropsWocn = {
  // only support some basic props for now
  // resize mode should be supported using class name in native
  src: string
  style?: StyleProp<ImageStyle>
}

export const ImageWocn: FC<ImagePropsWocn> = props =>
  createElement('img', props)
