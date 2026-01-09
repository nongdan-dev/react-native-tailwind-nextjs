/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import type { Config } from 'tailwindcss'

import { globSync } from '@/nodejs/glob'
import { frameworkRoot } from '@/root'
import { merge } from '@/shared/lodash'

export const config: Config = {
  content: [
    ...globSync('**/*.{js,jsx,ts,tsx}', {
      cwd: frameworkRoot,
    }),
  ],
}

export const mergeConfig = (...configs: object[]) => merge(config, ...configs)
