import path from 'node:path'

import { repoRoot } from '#/root'

import twConfig from '../../tailwind.config'

export const {
  extra: {
    twrnc,
    codegen: { twFn, cvaFn, clsxFn },
  },
} = twConfig

export const codegenOutput = path.join(repoRoot, twConfig.extra.codegen.output)
