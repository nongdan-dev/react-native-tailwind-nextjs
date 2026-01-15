/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

// shortcut to run devtools scripts

import { minimal as log } from '@/nodejs/log'

const supported = [
  'normalize',
  'eslint',
  'stylelint',
  'prettier',
  'ts',
] as const

const pkg = process.argv[2] as (typeof supported)[number]
if (!supported.some(v => v === pkg)) {
  log.fatal(`Invalid devtools script ${pkg}`)
}

type Options = {
  dir: string
}

export const run = ({ dir }: Options) =>
  require(`@/devtools/${pkg}`)
    .run(dir)
    .catch((err: Error) => log.stack(err, 'fatal'))
