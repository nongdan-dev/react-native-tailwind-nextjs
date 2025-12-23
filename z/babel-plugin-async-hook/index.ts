import type { NodePath, PluginObj } from '@babel/core'
import { types as t } from '@babel/core'

import { isInSrcRoot } from '#/root'

const hookRegex = /^use[A-Z]/

export const asyncHookPlugin = (): PluginObj => ({
  visitor: {
    // use program path to prioritize this plugin over others such as react compiler
    Program: (programPath, pluginPass) => {
      if (pluginPass && !isInSrcRoot(pluginPass.filename)) {
        return
      }
      programPath.traverse({
        CallExpression: traverseCallExpression,
      })
    },
  },
})

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
