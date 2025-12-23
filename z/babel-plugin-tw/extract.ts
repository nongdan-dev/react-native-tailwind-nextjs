import fs from 'fs-extra'

import type { StrMap } from '@/utils/ts'
import { codegenOutput } from '#/babel-plugin-tw/config'
import type { Ctx } from '#/babel-plugin-tw/lib/create-context'
import { generateMinifiedClassName } from '#/babel-plugin-tw/lib/generate-minified-class-name'
import { createVisitor } from '#/babel-plugin-tw/visitor'

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
