/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import type { LoaderContext } from 'webpack'

import { transformCssVariables } from '@/devtools/webpack-css-theme/transform-css-variables'

// eslint-disable-next-line import/no-default-export
export default function cssThemeLoader(
  this: LoaderContext<object>,
  src: string,
) {
  if (!this.resourcePath.endsWith('.theme.css')) {
    throw new Error('Expected *.theme.css')
  }
  return transformCssVariables(src)
}
