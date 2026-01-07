/**
 * Copyright (c) 2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import { fs } from '@/nodejs/fs'
import { glob } from '@/nodejs/glob'

const year = new Date().getFullYear()
const pre = `
/**
 * Copyright (c) ${year} nongdan.dev
`
const suf = `
 * See LICENSE file in the project root for full license information.
 */

`
const license = [pre, suf, '', ''].map(v => v.trim()).join('\n')

export const normalizeLicense = async () => {
  const paths = await glob(
    '**/*.{ts,tsx,js,jsx,cts,mts,cjs,mjs,css,scss,sass,less}',
  )
  const promises = paths.map(async p => {
    let content = await fs.readFile(p, 'utf-8')
    if (content.includes(suf)) {
      return
    }
    const trim = suf.trim()
    if (content.includes(trim)) {
      content = content.replace(trim, [trim, '', ''].join('\n'))
    } else {
      content = license + content
    }
    await fs.writeFile(p, content)
  })
  await Promise.all(promises)
}
