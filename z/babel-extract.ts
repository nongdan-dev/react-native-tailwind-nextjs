import { codeFrameColumns } from '@babel/code-frame'
import * as parser from '@babel/parser'
import type { NodePath } from '@babel/traverse'
import traverse from '@babel/traverse'
import fs from 'fs-extra'
import { globbySync } from 'globby'
import path from 'node:path'

import { twExtract } from '#/babel-plugin-tw/extract'
import { srcRoot } from '#/root'

let currentCode = ''
const err = (npath: NodePath, msg: string) => {
  const loc = npath.node?.loc
  if (!loc) {
    throw new Error(msg)
  }
  const frame = codeFrameColumns(
    currentCode,
    { start: loc.start, end: loc.end },
    { highlightCode: true },
  )
  return new Error(`${msg}\n${frame}`)
}

const extracts = []
if (process.env.NEXT_PUBLIC_MINIFY_CLASS_NAMES) {
  extracts.push(twExtract({ err }))
}

const paths = globbySync('**/*.{ts,tsx}', {
  cwd: srcRoot,
})

const parserOption = {
  sourceType: 'module' as const,
  plugins: ['typescript' as const, 'jsx' as const],
}
for (const p of paths) {
  currentCode = fs.readFileSync(path.join(srcRoot, p), 'utf-8')
  const ast = parser.parse(currentCode, parserOption)
  for (const { visitor } of extracts) {
    traverse(ast, visitor as any)
  }
}

for (const { done } of extracts) {
  done()
}
