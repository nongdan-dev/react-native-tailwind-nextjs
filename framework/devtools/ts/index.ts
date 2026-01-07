/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import { bin, binRequireResolve, cmd, exec } from '@/nodejs/exec'
import { glob } from '@/nodejs/glob'
import { resolvePath } from '@/nodejs/path'
import { repoRoot } from '@/root'

export const ts = async () => {
  const tsconfigFiles = await glob('**/tsconfig.json')

  const tsc = tsconfigFiles.map(async p =>
    cmd({
      bin: await bin(repoRoot, 'tsc'),
      args: [
        ['--noEmit'],
        ['--project', await resolvePath(p)],
        //
      ],
      argsJoinUsingSpace: true,
    }),
  )

  const coverage = tsconfigFiles.map(async p =>
    cmd({
      bin: await binRequireResolve(__dirname, 'type-coverage'),
      args: [
        ['--suppressError'],
        ['--at-least', '0'],
        ['--project', await resolvePath(p)],
        //
      ],
      argsJoinUsingSpace: true,
    }),
  )

  return Promise.all([...tsc, ...coverage])
}

export const run = () => ts().then(cmds => Promise.all(cmds.map(c => exec(c))))
