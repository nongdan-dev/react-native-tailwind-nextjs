/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import type { Config } from 'tailwindcss'

import { path } from '@/nodejs/path'
import { mergeWith } from '@/shared/lodash'
import { frameworkRoot } from '@/root'

const pathConfig: Config = {
  content: [path.join(frameworkRoot, './rn/**/*.{ts,tsx}')],
}

const withArray = (a: unknown, b: unknown) => {
  if (Array.isArray(a)) {
    return a.concat(b)
  }
  return
}

export const config = (...configs: object[]) =>
  mergeWith({}, pathConfig, ...configs, withArray)
