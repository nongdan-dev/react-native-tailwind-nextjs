/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import Image from 'react-native-fast-image'

import { createAnimatedComponent } from '@/rn/tw/lib/create-animated-component'
import { isReanimated } from '@/rn/tw/lib/is-reanimated'
import { styleToProps } from '@/rn/tw/lib/style-to-props'
import type { ImagePropsWocn } from '#/components/base-without-class-name/image'

const styleProps = ['resizeMode']

export const ImageWocn = ({ src, ...props }: ImagePropsWocn) => {
  props = styleToProps(props, styleProps)
  const Component: any = isReanimated(props) ? AnimatedImage : Image
  const source = typeof src === 'string' ? { uri: src } : src
  return <Component {...(props as any)} source={source} />
}

const AnimatedImage = createAnimatedComponent(Image)
