import type { TSESLint, TSESTree } from '@typescript-eslint/utils'

export const noErrorVariable: TSESLint.RuleModule<'noErrorVariable', []> = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Use `err` instead of `error` variable name',
    },
    messages: {
      noErrorVariable: 'Use `err` instead of `error` variable name',
    },
    schema: [],
  },

  defaultOptions: [],

  create: c => {
    const check = (n: TSESTree.BindingName | TSESTree.Parameter) => {
      if (!n) {
        return
      }
      if (
        n.type !== 'Identifier' ||
        !n.name.startsWith('erro') ||
        /^err\d/.test(n.name)
      ) {
        return
      }
      c.report({
        node: n,
        messageId: 'noErrorVariable',
      })
    }
    const checkFunction = (
      n: TSESTree.FunctionExpression | TSESTree.ArrowFunctionExpression,
    ) => {
      if (
        n.parent.type === 'CallExpression' &&
        n.parent.callee.type === 'MemberExpression' &&
        'name' in n.parent.callee.property &&
        n.parent.callee.property.name === 'catch'
      ) {
        n.params.forEach(check)
      }
    }
    return {
      // try {..} catch(err) {..}
      CatchClause: n => n.param && check(n.param),
      // .catch(function(err) {..})
      FunctionExpression: n => checkFunction(n),
      // .catch(err => {..})
      ArrowFunctionExpression: n => checkFunction(n),
      // const err = ..
      VariableDeclarator: n => check(n.id),
    }
  },
}
