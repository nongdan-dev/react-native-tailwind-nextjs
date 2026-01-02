import type { PluginPass, Visitor } from '@babel/core'

import type {
  CreateContextOptions,
  Ctx,
} from '#/babel-plugin-tw/lib/create-context'
import { traverseCallExpression } from '#/babel-plugin-tw/lib/traverse-call-expression'
import { traverseJSXOpeningElement } from '#/babel-plugin-tw/lib/traverse-jsx-opening-element'
import { traverseTaggedTemplateExpression } from '#/babel-plugin-tw/lib/traverse-tagged-template-expression'
import { isInSrcRoot } from '#/root'

export type CreateVisitorOptions = Partial<Pick<Ctx, 'min' | 'extract' | 'err'>>
export type TraverseOptions = Omit<
  CreateContextOptions,
  'rootPath' | 'calleeName'
>

export const createVisitor = (
  options: CreateVisitorOptions,
): Visitor<PluginPass> => ({
  // use program path to get plugin pass and perform some checks before traverse
  // also prioritize this plugin over others such as react compiler
  Program: (programPath, pluginPass) => {
    // could be empty in traverse only mode without api plugin pass
    if (pluginPass && !isInSrcRoot(pluginPass.filename)) {
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
