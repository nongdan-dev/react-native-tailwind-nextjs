/**
 * Copyright (c) 2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import path from 'node:path'

import { fs } from '@/nodejs/fs'
import { frameworkRoot, repoRoot } from '@/root'

export { path }

export const isInDir = (dir: string, abs: string) => {
  if (!abs) {
    return
  }
  const relative = path.relative(dir, abs)
  return !path.isAbsolute(relative) && !relative.startsWith('..')
}
export const isInFramework = (abs: string) => isInDir(frameworkRoot, abs)
export const isInRepo = (abs: string) => isInDir(repoRoot, abs)

export const isSameDir = (abs1: string, abs2: string) =>
  !path.relative(abs1, abs2)
export const isFrameworkRoot = (abs: string) => isSameDir(frameworkRoot, abs)
export const isRepoRoot = (abs: string) => isSameDir(repoRoot, abs)

/**
 * Join paths then check using fs.exists just like {@link require.resolve}
 */
export const resolvePath = async (...paths: string[]) => {
  const f = path.join(...paths)
  if (!(await fs.exists(f))) {
    throw resolvePathErr(f)
  }
  return f
}

/**
 * Join paths then check using fs.existsSync just like {@link require.resolve}
 */
export const resolvePathSync = (...paths: string[]) => {
  const f = path.join(...paths)
  if (!fs.existsSync(f)) {
    throw resolvePathErr(f)
  }
  return f
}

const resolvePathErr = (f: string) =>
  new Error(`Cannot resolve: ${path.relative(repoRoot, f) || '.'}`)
