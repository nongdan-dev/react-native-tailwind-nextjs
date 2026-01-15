/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import ignore from 'ignore'

import { fs } from '@/nodejs/fs'
import { gitignorePath } from '@/nodejs/gitignore'
import { path } from '@/nodejs/path'
import { repoRoot } from '@/root'

const ig = ignore().add(fs.readFileSync(gitignorePath, 'utf-8'))
export const isInGitignore = (abs: string) =>
  ig.ignores(path.relative(repoRoot, abs))
