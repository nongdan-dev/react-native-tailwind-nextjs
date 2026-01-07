/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import { path } from '@/nodejs/path'
import type { StrMap } from '@/shared/ts-utils'

export const config = (dir: string, min?: string) => {
  let j: StrMap<string> | undefined = undefined
  if (min) {
    j = require(path.join(dir, min))
  }
  return {
    plugins: {
      '@tailwindcss/postcss': {},
      'postcss-rename': {
        strategy: (n: string) => j?.[n] || n,
      },
      autoprefixer: {},
    },
  }
}
