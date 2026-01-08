/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import { isRelative } from '@/nodejs/path'
import type { Falsish } from '@/shared/ts-utils'

export const shouldTranspileExtension = /\.tsx?/

export const shouldTranspile = (filename: string | Falsish) => {
  if (!filename) {
    return false
  }
  if (isRelative(filename)) {
    return true
  }
  if (filename.startsWith('@') || filename.includes('node_modules')) {
    return false
  }
  return shouldTranspileExtension.test(filename)
}
