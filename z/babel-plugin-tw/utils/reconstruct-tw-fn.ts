import template from '@babel/template'

import { jsToNode } from '#/babel-plugin-tw/utils/js-to-node'
import type { Ctx } from '#/babel-plugin-tw/visitor'

// need to use .call to avoid infinite transpile once replaced
const tpl = template.expression('%%fn%%.call(undefined, %%arg%%)')

export const reconstructTwFn = (ctx: Ctx, arg: any) =>
  tpl({
    fn: ctx.calleeName,
    arg: jsToNode(ctx, arg),
  })
