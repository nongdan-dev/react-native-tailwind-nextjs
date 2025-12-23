import { types as t } from '@babel/core'

import type { Ctx } from '#/babel-plugin-tw/lib/create-context'
import { jsToNode } from '#/babel-plugin-tw/lib/js-to-node'

export const moveToRootScope = (ctx: Ctx, value: any) => {
  const { programPath, isInFunction } = ctx
  const node = jsToNode(ctx, value)
  if (!isInFunction && value && typeof value === 'object') {
    return node
  }
  const id = programPath.scope.generateUidIdentifier('style')
  programPath.unshiftContainer(
    'body',
    t.variableDeclaration('const', [t.variableDeclarator(id, node)]),
  )
  return id
}
