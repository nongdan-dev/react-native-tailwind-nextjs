/**
 * Copyright (c) 2026 nongdan.dev
 * Licensed under the MIT License.
 * See LICENSE file in the project root for full license information.
 */

import type { StrMap } from '@/utils/ts'

export const mergeDefault = (
  value: StrMap<unknown>,
  defaultValue?: StrMap<unknown>,
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
