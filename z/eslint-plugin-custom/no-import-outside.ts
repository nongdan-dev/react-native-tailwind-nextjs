import type { TSESLint, TSESTree } from '@typescript-eslint/utils'
import path from 'node:path'

import { srcRoot } from '#/root'

export const noImportOutside: TSESLint.RuleModule<
  'noImportOutside',
  [string[]]
> = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Disallow import outside from specific folders in `src` with `@/` alias',
    },
    messages: {
      noImportOutside: "Disallow import outside from '{{dir}}'",
    },
    schema: [
      {
        type: 'array',
        items: { type: 'string' },
      },
    ],
  },

  defaultOptions: [[]],

  create: c => {
    const dirs = c.options[0].map(d =>
      d.replace(/^\/+/, '').replace(/\/+$/, ''),
    )
    const srcPrefixes = dirs.map(d => path.join(srcRoot, `${d}/`))

    const file = c.filename
    const i = srcPrefixes.findIndex(v => file.startsWith(v))
    if (i < 0) {
      return {}
    }
    const importPrefix = `@/${dirs[i]}/`

    const check = (n: TSESTree.ImportDeclaration) => {
      const imp = n.source.value
      if (!imp.startsWith('@/') || imp.startsWith(importPrefix)) {
        return
      }
      const dir = importPrefix.replace(/\/+$/, '')
      c.report({
        node: n.source,
        messageId: 'noImportOutside',
        data: { dir },
      })
    }

    return {
      ImportDeclaration: check,
    }
  },
}
