/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import { path } from '@/nodejs/path'
import { repoRoot } from '@/root'
import twConfig from '@/tailwind.config.cjs'

export const {
  extra: {
    twrnc,
    codegen: { twFn, cvaFn, clsxFn },
  },
} = twConfig

export const codegenOutput = path.join(repoRoot, twConfig.extra.codegen.output)
