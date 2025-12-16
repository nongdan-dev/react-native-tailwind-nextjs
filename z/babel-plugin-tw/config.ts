import path from 'node:path'

import { repoRoot } from '#/root'

import twConfig from '../../tailwind.config.cjs'

export const {
  extra: {
    twrnc,
    babel: {
      codegen: { twFn, useTwFn, twCvaFn },
    },
    babel: twBabel,
  },
} = twConfig

export const codegenOutput = path.join(
  repoRoot,
  twConfig.extra.babel.codegen.output,
)
