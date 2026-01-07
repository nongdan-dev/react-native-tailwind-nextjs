/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import { codegenOutput } from '@/devtools/babel-plugin-tw/config'
import type { Ctx } from '@/devtools/babel-plugin-tw/lib/create-context'
import { generateMinifiedClassName } from '@/devtools/babel-plugin-tw/lib/generate-minified-class-name'
import { createVisitor } from '@/devtools/babel-plugin-tw/visitor'
import { fs } from '@/nodejs/fs'
import type { StrMap } from '@/shared/ts-utils'

export const twExtract = ({ err }: Pick<Ctx, 'err'>) => {
  const minified: StrMap<string> = {}
  let n = 0

  const extract = (classNames: string[]) => {
    for (const c of classNames) {
      minified[c] = generateMinifiedClassName(n)
      n++
    }
  }

  return {
    visitor: createVisitor({ extract, err }),
    done: () => fs.writeJsonSync(codegenOutput, minified),
  }
}
