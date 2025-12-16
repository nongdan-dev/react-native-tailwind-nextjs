import { types as t } from '@babel/core'
import template from '@babel/template'

import { jsToNode } from '#/babel-plugin-tw/utils/js-to-node'
import { moveToRootScope } from '#/babel-plugin-tw/utils/move-to-root-scope'
import type { Ctx } from '#/babel-plugin-tw/visitor'

const tpl = template.expression('(state) => state.%%prop%% && %%style%%')

export const dynamicStyle = (ctx: Ctx, prop: string, style: any) => {
  const fn = tpl({
    prop: t.identifier(prop),
    style: jsToNode(ctx, style),
  })
  return moveToRootScope(ctx, 'fn', fn)
}
