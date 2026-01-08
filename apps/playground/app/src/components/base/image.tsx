/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import type { FC } from 'react'

import type { ClassName } from '@/rn/tw/class-name'
import { createClassNameComponent } from '@/rn/tw/lib/create-class-name-component'
import type { ImagePropsWocn } from '#/components/base-without-class-name/image'
import { ImageWocn } from '#/components/base-without-class-name/image'

export type ImageProps = ImagePropsWocn & {
  className?: ClassName
}

export const Image: FC<ImageProps> = createClassNameComponent({
  ImageWocn,
})
