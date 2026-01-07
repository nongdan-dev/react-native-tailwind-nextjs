/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import type { NodePath } from '@babel/core'
import { types as t } from '@babel/core'

import { clsxFn, cvaFn } from '@/devtools/babel-plugin-tw/config'
import { createContext } from '@/devtools/babel-plugin-tw/lib/create-context'
import { transpileClsx } from '@/devtools/babel-plugin-tw/lib/transpile-clsx'
import { transpileCva } from '@/devtools/babel-plugin-tw/lib/transpile-cva'
import type { TraverseOptions } from '@/devtools/babel-plugin-tw/visitor'

export const traverseCallExpression = (
  path: NodePath<t.CallExpression>,
  options: TraverseOptions,
) => {
  const callee = path.node.callee
  if (!t.isIdentifier(callee)) {
    return
  }

  const calleeName = callee.name
  if (calleeName !== cvaFn && calleeName !== clsxFn) {
    return
  }

  const ctx = createContext({
    ...options,
    rootPath: path,
    calleeName,
  })
  const transpiled =
    calleeName === cvaFn ? transpileCva(ctx, path) : transpileClsx(ctx, path)

  if (ctx.extract) {
    return
  }

  path.replaceWith(transpiled)
}
