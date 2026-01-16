/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import { transform as defaultTransform } from '@react-native/metro-babel-transformer'
import { transform as svgTransform } from 'react-native-svg-transformer/react-native'

import {
  cssVariablesFilenameRegex,
  transformCssVariables,
} from '@/devtools/webpack-css-variables/transform-css-variables'

type Options = {
  filename: string
  src: string
}

export const transform = ({ filename, src, ...options }: Options) => {
  if (filename.endsWith('.svg')) {
    return svgTransform({
      filename,
      src,
      ...options,
    })
  }

  if (cssVariablesFilenameRegex.test(filename)) {
    return defaultTransform({
      filename,
      src: transformCssVariables(src),
      ...options,
    })
  }

  return defaultTransform({
    filename,
    src,
    ...options,
  })
}
