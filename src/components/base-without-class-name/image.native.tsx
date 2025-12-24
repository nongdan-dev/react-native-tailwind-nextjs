import FastImage from 'react-native-fast-image'

import type { ImagePropsWocn } from '@/components/base-without-class-name/image'
import { styleToProps } from '@/tw/lib/style-to-props'

const styleProps = ['resizeMode']

export const ImageWocn = ({ src, ...props }: ImagePropsWocn) => {
  props = styleToProps(props, styleProps)
  const source = typeof src === 'string' ? { uri: src } : src
  return <FastImage {...(props as any)} source={source} />
}
