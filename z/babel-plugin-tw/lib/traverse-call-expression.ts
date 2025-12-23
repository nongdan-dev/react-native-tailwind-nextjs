import type { NodePath } from '@babel/core'
import { types as t } from '@babel/core'

import { clsxFn, cvaFn } from '#/babel-plugin-tw/config'
import { createContext } from '#/babel-plugin-tw/lib/create-context'
import { transpileClsx } from '#/babel-plugin-tw/lib/transpile-clsx'
import { transpileCva } from '#/babel-plugin-tw/lib/transpile-cva'
import type { TraverseOptions } from '#/babel-plugin-tw/visitor'

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
