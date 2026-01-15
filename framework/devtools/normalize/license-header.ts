/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import { fs } from '@/nodejs/fs'
import { glob } from '@/nodejs/glob'
import { path } from '@/nodejs/path'
import { repoRoot } from '@/root'

const root = require(path.join(repoRoot, './package.json'))

const year0 = 2025
const year1 = new Date().getFullYear()

const copyright = `Copyright (c) ${year0}-${year1} ${root.author}`
const copyrightRegex = /Copyright \(c\) .+/
const description =
  'See LICENSE file in the project root for full license information.'

const raw = `
/**
 * ${copyright}
 * ${description}
 */
`

const license = `${raw.trim()}\n\n`
// to check if missing new lines at the end of the license header
const suffix = license.slice(license.indexOf(description))

export const normalizeLicenseHeader = async () => {
  const paths = await glob(
    '**/*.{ts,tsx,js,jsx,cts,mts,cjs,mjs,css,scss,sass,less}',
  )
  const promises = paths.map(async p => {
    let content = await fs.readFile(p, 'utf-8')
    let rewrite = false
    if (!copyrightRegex.test(content)) {
      content = license + content
      rewrite = true
    } else {
      const trim = suffix.trim()
      if (!content.includes(suffix) && content.includes(trim)) {
        content = content.replace(trim, `${trim}\n\n`)
        rewrite = true
      }
    }
    if (!rewrite) {
      return
    }
    await fs.writeFile(p, content)
  })
  await Promise.all(promises)
}
