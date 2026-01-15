/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import { transform as defaultTransform } from '@react-native/metro-babel-transformer'
import { transform as svgTransform } from 'react-native-svg-transformer/react-native'

import { transformCssVariables } from '@/devtools/webpack-css-theme/transform-css-variables'

type Options = {
  filename: string
  src: string
}

export const transform = async (o: Options) => {
  if (o.filename.endsWith('.svg')) {
    return svgTransform(o)
  }

  if (o.filename.endsWith('.theme.css')) {
    return defaultTransform({
      ...o,
      src: transformCssVariables(o.src),
    })
  }

  return defaultTransform(o)
}
