/**
 * Copyright (c) 2026 nongdan.dev
 * Licensed under the MIT License.
 * See LICENSE file in the project root for full license information.
 */

import type { PluginObj } from '@babel/core'

import { fs } from '@/nodejs/fs'
import { codegenOutput } from '#/babel-plugin-tw/config'
import { createVisitor } from '#/babel-plugin-tw/visitor'

const min = process.env.NEXT_PUBLIC_MINIFY_CLASS_NAMES
  ? fs.readJsonSync(codegenOutput, 'utf-8')
  : undefined

export const twPlugin = (): PluginObj => ({
  visitor: createVisitor({ min }),
})
