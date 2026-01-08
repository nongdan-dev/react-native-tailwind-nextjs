/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import { camelCase, snakeCase, upperFirst } from 'lodash-es'

export const captialCase = (s?: string) =>
  snakeCase(s)
    .split(/[\W_]+/)
    .filter(v => v)
    .map(upperFirst)
    .join(' ')

export const pascalCase = (s?: string) => upperFirst(camelCase(s))
