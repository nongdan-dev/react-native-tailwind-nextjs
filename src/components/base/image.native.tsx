import FastImage from 'react-native-fast-image'

import type { ImageProps } from '@/components/base/image'
import { cn, cnFromProps } from '@/tw/cn'
import type { StrMap } from '@/utils/ts'

export const Image = ({ src, ...props }: ImageProps) => {
  let style = cn(cnFromProps(props)) as StrMap | undefined

  if (style) {
    // clone to be able to modify
    style = { ...style }
    props = { ...props, style }
    const k = 'resizeMode'
    if (k in style) {
      props[k as keyof typeof props] = style[k]
      delete style[k]
    }
  }

  const source = typeof src === 'string' ? { uri: src } : src
  return <FastImage {...(props as any)} source={source} />
}
