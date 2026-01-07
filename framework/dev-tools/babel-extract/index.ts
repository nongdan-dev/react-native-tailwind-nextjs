/**
 * Copyright (c) 2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import { codeFrameColumns } from '@babel/code-frame'
import * as parser from '@babel/parser'
import type { NodePath } from '@babel/traverse'
import traverse from '@babel/traverse'
import { globbySync } from 'globby'

import { fs } from '@/nodejs/fs'
import { path } from '@/nodejs/path'
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
