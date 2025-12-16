import { types as t } from '@babel/core'

import { jsToNode } from '#/babel-plugin-tw/utils/js-to-node'
import type { Ctx } from '#/babel-plugin-tw/visitor'

export const moveToRootScope = (ctx: Ctx, name: string, value: any) => {
  const { programPath } = ctx
  const id = programPath.scope.generateUidIdentifier(name)
  const node = jsToNode(ctx, value)
  programPath.unshiftContainer(
    'body',
    t.variableDeclaration('const', [t.variableDeclarator(id, node)]),
  )
  return id
}
