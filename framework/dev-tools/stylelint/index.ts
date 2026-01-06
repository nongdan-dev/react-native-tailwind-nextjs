/**
 * Copyright (c) 2026 nongdan.dev
 * Licensed under the MIT License.
 * See LICENSE file in the project root for full license information.
 */

import { binRequireResolve, cmd, exec } from '@/nodejs/exec'
import { gitignorePath } from '@/nodejs/gitignore'
import { path, resolvePath } from '@/nodejs/path'
import { repoRoot } from '@/root'

export const stylelint = async () =>
  cmd({
    bin: await binRequireResolve('@/dev-tools/stylelint'),
    args: [
      ['--ignore-path', gitignorePath],
      ['--config', await resolvePath(repoRoot, 'stylelint.config.js')],
      ['--fix'],
      //
    ],
    target: path.join(repoRoot, '**/*.{css,scss,sass,less}'),
  })

export const run = () => stylelint().then(exec)
