/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import { isInDir } from '@/nodejs/path'
import type { Falsish } from '@/shared/ts-utils'

export const shouldTranspileExtension = /\.tsx?/

export const shouldTranspile = (
  filename: string | Falsish,
  transpileDirs: string[],
) =>
  filename &&
  shouldTranspileExtension.test(filename) &&
  transpileDirs.some(d => isInDir(d, filename))
