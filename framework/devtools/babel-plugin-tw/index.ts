/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import type { PluginObj } from '@babel/core'

import { codegenOutput } from '@/devtools/babel-plugin-tw/config'
import { createVisitor } from '@/devtools/babel-plugin-tw/visitor'
import { fs } from '@/nodejs/fs'

const min = process.env.NEXT_PUBLIC_MINIFY_CLASS_NAMES
  ? fs.readJsonSync(codegenOutput, 'utf-8')
  : undefined

export const twPlugin = (): PluginObj => ({
  visitor: createVisitor({ min }),
})
