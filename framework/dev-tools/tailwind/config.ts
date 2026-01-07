/**
 * Copyright (c) 2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import type { Config } from 'tailwindcss'

import { globSync } from '@/nodejs/glob'
import { frameworkRoot } from '@/root'

export const config: Config = {
  content: [
    ...globSync('**/*.{js,jsx,ts,tsx}', {
      parent: frameworkRoot,
    }),
  ],
}
