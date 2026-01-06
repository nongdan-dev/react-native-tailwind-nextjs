/**
 * Copyright (c) 2026 nongdan.dev
 * Licensed under the MIT License.
 * See LICENSE file in the project root for full license information.
 */

import { convertPathToPattern } from 'fast-glob'
import type { Options } from 'globby'
import { globby, globbySync } from 'globby'

import { path } from '@/nodejs/path'
import { repoRoot } from '@/root'
import { omit } from '@/shared/lodash'

export type { Options as GlobbyOptions } from 'globby'
export { globby, globbySync } from 'globby'

export type GlobOptions = Omit<
  Options,
  'gitignore' | 'absolute' | 'onlyDirectories' | 'onlyFiles'
> & {
  parent?: string | false
  relative?: true
  onlyFiles?: false
}

export const glob = (pattern: string, o?: GlobOptions) =>
  globby(...opt(pattern, o)).then(a => map(a, o))

export const globSync = (pattern: string, o?: GlobOptions) =>
  map(globbySync(...opt(pattern, o)), o)

const parent = (o?: GlobOptions) =>
  o?.parent !== false ? o?.parent || repoRoot : ''

const opt = (pattern: string, o?: GlobOptions): [string, Options] => {
  const dir = parent(o)
  if (dir) {
    if (process.platform === 'win32') {
      // https://github.com/sindresorhus/globby/issues/130
      // backslash \ on Windows not working
      pattern = convertPathToPattern(dir) + '/' + pattern
    } else {
      pattern = path.join(dir, pattern)
    }
  }
  return [
    pattern,
    {
      cwd: repoRoot,
      onlyFiles: true,
      gitignore: true,
      ...omit(o, 'parent', 'relative'),
      onlyDirectories: o?.onlyFiles === false ? true : false,
    },
  ]
}

const map = (paths: string[], o?: GlobOptions) => {
  const dir = parent(o)
  return !dir || !o?.relative ? paths : paths.map(p => path.relative(dir, p))
}
