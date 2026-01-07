/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import { path } from '@/nodejs/path'
import type { StrMap } from '@/shared/ts-utils'

type GetAliasesOptions = {
  relative?: true
}

export const getAlias = (dir: string, { relative }: GetAliasesOptions = {}) => {
  const tsconfig = require(path.join(dir, 'tsconfig.json'))
  const paths: StrMap<string[]> = tsconfig.compilerOptions.paths

  return Object.entries(paths).reduce((m, a) => {
    const [k, v] = [a[0], a[1][0]].map(p => p.replace(/\/\*$/, ''))
    m[k] = relative ? v : path.join(dir, v)
    return m
  }, {} as StrMap<string>)
}
