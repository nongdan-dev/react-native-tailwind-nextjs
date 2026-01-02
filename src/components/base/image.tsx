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
