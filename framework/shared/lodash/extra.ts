/**
 * Copyright (c) 2026 nongdan.dev
 * Licensed under the MIT License.
 * See LICENSE file in the project root for full license information.
 */

import { camelCase, snakeCase, upperFirst } from '@/shared/lodash'

export const captialCase = (s?: string) =>
  snakeCase(s)
    .split(/[\W_]+/)
    .filter(v => v)
    .map(upperFirst)
    .join(' ')

export const pascalCase = (s?: string) => upperFirst(camelCase(s))
