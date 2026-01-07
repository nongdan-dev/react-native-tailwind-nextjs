/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import { fs } from '@/nodejs/fs'
import { glob } from '@/nodejs/glob'

const year = new Date().getFullYear()
const authors = [
  {
    name: 'nongdan.dev',
    fromYear: 2025,
    toYear: year,
  },
].map(a => `${a.fromYear}-${a.toYear} ${a.name}`)
// this is useful for us if we rename or move the ownership of this repository
// if not, please add more authors above and do not remove existings
const forceReplaceAuthor = false

const copyright = `Copyright (c) ${authors}`
const copyrightRegex = /Copyright \(c\) .+/

const raw = `
/**
 * ${copyright}
 * See LICENSE file in the project root for full license information.
 */
`

const license = `${raw.trim()}\n\n`
// to check if missing new lines at the end of the license header
const suffix = license.slice(license.indexOf(copyright) + copyright.length)

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
      if (forceReplaceAuthor) {
        content = content.replace(copyrightRegex, copyright)
        rewrite = true
      }
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
