/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import { readTwExtractOutput } from '../babel-plugin-tw/lib/config'

type Options = {
  dir: string
  twExtractOutputPath?: string
}

export const config = ({
  dir,
  twExtractOutputPath = dir
}: Options) => {
  const min = readTwExtractOutput(twExtractOutputPath)
  return {
    plugins: {
      '@tailwindcss/postcss': {},
      'postcss-rename': {
        strategy: (n: string) => min?.[n] || n,
      },
      autoprefixer: {},
    },
  }
}
