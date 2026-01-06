/**
 * Copyright (c) 2026 nongdan.dev
 * Licensed under the MIT License.
 * See LICENSE file in the project root for full license information.
 */

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
