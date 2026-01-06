/**
 * Copyright (c) 2026 nongdan.dev
 * Licensed under the MIT License.
 * See LICENSE file in the project root for full license information.
 */

import { binRequireResolve, cmd, exec } from '@/nodejs/exec'
import { resolvePath } from '@/nodejs/path'
import { repoRoot } from '@/root'

export const prettier = async () =>
  cmd({
    bin: await binRequireResolve('@/dev-tools/prettier'),
    args: [
      ['--log-level', 'error'],
      ['--config', await resolvePath(repoRoot, 'prettier.config.js')],
      ['--write'],
      //
    ],
    target: repoRoot,
  })

export const run = () => prettier().then(exec)
