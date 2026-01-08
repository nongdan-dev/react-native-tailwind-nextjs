/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import type { PluginPass, Visitor } from '@babel/core'
import { z } from 'zod'

import type {
  CreateContextOptions,
  Ctx,
} from '@/devtools/babel-plugin-tw/lib/create-context'
import { traverseCallExpression } from '@/devtools/babel-plugin-tw/lib/traverse-call-expression'
import { traverseJSXOpeningElement } from '@/devtools/babel-plugin-tw/lib/traverse-jsx-opening-element'
import { traverseTaggedTemplateExpression } from '@/devtools/babel-plugin-tw/lib/traverse-tagged-template-expression'
import { isInDir } from '@/nodejs/path'

const pluginPassOptsSchema = z.object({
  transpileDirs: z.array(z.string()),
})

export type CreateVisitorOptions = Partial<Pick<Ctx, 'extract' | 'err'>>
export type TraverseOptions = Omit<
  CreateContextOptions,
  'rootPath' | 'calleeName'
>

export const createVisitor = (
  options: CreateVisitorOptions = {},
): Visitor<PluginPass> => ({
  // use program path to get plugin pass and perform some checks before traverse
  // also prioritize this plugin over others such as react compiler
  Program: (programPath, pluginPass) => {
    if (!pluginPass.filename) {
      return
    }
    const { transpileDirs } = pluginPassOptsSchema.parse(pluginPass.opts)
    if (!transpileDirs.some(d => isInDir(d, pluginPass.filename))) {
      return
    }

    const o: TraverseOptions = {
      ...options,
      programPath,
      pluginPass,
    }
    programPath.traverse({
      JSXOpeningElement: p => traverseJSXOpeningElement(p, o),
      CallExpression: p => traverseCallExpression(p, o),
      TaggedTemplateExpression: p => traverseTaggedTemplateExpression(p, o),
    })
  },
})
