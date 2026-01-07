/**
 * Copyright (c) 2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

// shortcut to run dev-tools scripts

import { log } from '@/nodejs/log'

const supported = [
  'normalize',
  'eslint',
  'stylelint',
  'prettier',
  'ts',
] as const

const pkg = process.argv[2] as (typeof supported)[number]
if (!supported.some(v => v === pkg)) {
  log.fatal(`Invalid dev-tools script ${pkg}`)
}

const run = require(`@/dev-tools/${pkg}`).run as () => Promise<void>
run().catch(err => log.stack(err, 'fatal'))
