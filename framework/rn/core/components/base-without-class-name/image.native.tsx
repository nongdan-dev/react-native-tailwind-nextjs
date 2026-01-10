/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import Image from 'react-native-fast-image'

import type { ImagePropsWocn } from '@/rn/core/components/base-without-class-name/image'
import { isReanimated } from '@/rn/core/components/base-without-class-name/props'
import { createAnimatedComponent } from '@/rn/core/tw/lib/create-animated-component'
import { styleToProps } from '@/rn/core/tw/lib/style-to-props'

const styleProps = ['resizeMode']

export const ImageWocn = ({ src, ...props }: ImagePropsWocn) => {
  props = styleToProps(props, styleProps)
  const Component: any = isReanimated(props) ? AnimatedImage : Image
  const source = typeof src === 'string' ? { uri: src } : src
  return <Component {...(props as any)} source={source} />
}

const AnimatedImage = createAnimatedComponent(Image)
