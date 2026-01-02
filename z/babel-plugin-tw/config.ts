import path from 'node:path'

import { repoRoot } from '#/root'

import twConfig from '../../tailwind.config'

export const {
  extra: {
    twrnc,
    babel: {
      codegen: { twFn, cvaFn, clsxFn },
    },
    babel: twBabel,
  },
} = twConfig

export const codegenOutput = path.join(
  repoRoot,
  twConfig.extra.babel.codegen.output,
)
