/**
 * Copyright (c) 2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import type { FC } from 'react'

import type { ImagePropsWocn } from '@/components/base-without-class-name/image'
import { ImageWocn } from '@/components/base-without-class-name/image'
import type { ClassName } from '@/tw/class-name'
import { createClassNameComponent } from '@/tw/lib/create-class-name-component'

export type ImageProps = ImagePropsWocn & {
  className?: ClassName
}

export const Image: FC<ImageProps> = createClassNameComponent({
  ImageWocn,
})
