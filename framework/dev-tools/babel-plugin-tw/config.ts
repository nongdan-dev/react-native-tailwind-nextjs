/**
 * Copyright (c) 2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import { path } from '@/nodejs/path'
import twConfig from '@/tailwind.config.cjs'
import { repoRoot } from '#/root'

export const {
  extra: {
    twrnc,
    codegen: { twFn, cvaFn, clsxFn },
  },
} = twConfig

export const codegenOutput = path.join(repoRoot, twConfig.extra.codegen.output)
