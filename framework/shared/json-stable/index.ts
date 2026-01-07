/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import jsonStableStringify from 'json-stable-stringify'

import { jsonSafe } from '@/shared/json-safe'
import type { Nullish } from '@/shared/ts-utils'

export const jsonStable = (v: unknown) => {
  let j: Nullish<string>
  try {
    j = jsonStableStringify(v)
  } catch (err) {
    void err
    // try to fix circular json
    j = jsonStableStringify(JSON.parse(jsonSafe(v)))
  }
  if (!j) {
    throw new Error('Empty json stable stringify')
  }
  return j
}
