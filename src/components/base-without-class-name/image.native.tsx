import Image from 'react-native-fast-image'

import type { ImagePropsWocn } from '@/components/base-without-class-name/image'
import { createAnimatedComponent } from '@/tw/lib/create-animated-component'
import { isReanimated } from '@/tw/lib/is-reanimated'
import { styleToProps } from '@/tw/lib/style-to-props'

const styleProps = ['resizeMode']

export const ImageWocn = ({ src, ...props }: ImagePropsWocn) => {
  props = styleToProps(props, styleProps)
  const Component: any = isReanimated(props) ? AnimatedImage : Image
  const source = typeof src === 'string' ? { uri: src } : src
  return <Component {...(props as any)} source={source} />
}

const AnimatedImage = createAnimatedComponent(Image)
