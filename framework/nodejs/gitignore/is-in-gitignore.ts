/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import ignore from 'ignore'
import fs from 'node:fs'
import path from 'node:path'

import { gitignorePath } from '@/nodejs/gitignore'
import { repoRoot } from '@/root'

const ig = ignore().add(fs.readFileSync(gitignorePath, 'utf-8'))
export const isInGitignore = (abs: string) =>
  ig.ignores(path.relative(repoRoot, abs))
