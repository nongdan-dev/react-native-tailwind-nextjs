/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import type { Falsish, StrMap } from '@/shared/ts-utils'

export const mergeDefault = (
  value: StrMap<unknown>,
  defaultValue: StrMap<unknown> | Falsish,
): any => {
  if (!defaultValue) {
    return value
  }
  value = { ...value }
  Object.keys(defaultValue).forEach(k => {
    if (value[k] === undefined) {
      value[k] = defaultValue[k]
    }
  })
  return value
}
