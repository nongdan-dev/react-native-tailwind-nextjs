/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import type { ConfigAPI, NodePath, PluginObj } from '@babel/core'
import { types as t } from '@babel/core'

import type { BabelConfigOptions } from '@/devtools/babel-config'
import { getIsServer } from '@/devtools/babel-config/get-is-server'
import { isInDir } from '@/nodejs/path'

const hookRegex = /^use[A-Z]/

export const asyncHookPlugin =
  (options: BabelConfigOptions) =>
  (api: ConfigAPI): PluginObj => {
    const isServer = getIsServer({
      api,
    })

    return {
      visitor: {
        // use program path to get plugin pass and perform some checks before traverse
        // also prioritize this plugin over others such as react compiler
        Program: (programPath, pluginPass) => {
          if (
            isServer ||
            !pluginPass.filename ||
            !options.transpileDirs.some(d => isInDir(d, pluginPass.filename))
          ) {
            return
          }
          programPath.traverse({
            CallExpression: traverseCallExpression,
          })
        },
      },
    }
  }

const traverseCallExpression = (p: NodePath<t.CallExpression>) => {
  const callee = p.node.callee
  if (!t.isIdentifier(callee)) {
    return
  }
  if (!hookRegex.test(callee.name)) {
    return
  }

  const parentFn = p.getFunctionParent()
  if (
    !parentFn ||
    !parentFn.node.async ||
    !(
      parentFn.isFunctionDeclaration() ||
      parentFn.isFunctionExpression() ||
      parentFn.isArrowFunctionExpression() ||
      parentFn.isObjectMethod() ||
      parentFn.isClassMethod()
    )
  ) {
    return
  }

  parentFn.traverse({
    Function: inner => {
      if (inner === parentFn) {
        return
      }
      inner.skip()
    },
    AwaitExpression: stripAwaitOrYield,
    YieldExpression: stripAwaitOrYield,
  })

  parentFn.node.async = false
}

const stripAwaitOrYield = (
  p: NodePath<t.YieldExpression | t.AwaitExpression>,
) => {
  const arg = p.node.argument
  const invalid = (): never => {
    throw p.buildCodeFrameError(
      'only support `await use...` or `await Promise.all(...)`',
    )
  }
  if (!arg) {
    return invalid()
  }
  if (t.isCallExpression(arg) && t.isIdentifier(arg.callee)) {
    const name = arg.callee.name
    if (!hookRegex.test(name)) {
      return invalid()
    }
    p.replaceWith(arg)
    return
  }
  if (t.isCallExpression(arg) && t.isMemberExpression(arg.callee)) {
    const { object, property, computed } = arg.callee
    const isPromiseAll =
      t.isIdentifier(object, { name: 'Promise' }) &&
      t.isIdentifier(property, { name: 'all' }) &&
      !computed
    if (!isPromiseAll) {
      return invalid()
    }
    p.replaceWith(arg.arguments[0])
    return
  }
  return invalid()
}
