/**
 * Copyright (c) 2026 nongdan.dev
 * Licensed under the MIT License.
 * See LICENSE file in the project root for full license information.
 */

import { fs } from '@/nodejs/fs'
import { glob } from '@/nodejs/glob'

const year = new Date().getFullYear()
const license = `
/**
 * Copyright (c) ${year} nongdan.dev
 * Licensed under the MIT License.
 * See LICENSE file in the project root for full license information.
 */

`
const licenseFragment = '* Copyright (c)'

export const normalizeLicense = async () => {
  const paths = await glob(
    '**/*.{ts,tsx,js,jsx,cts,mts,cjs,mjs,css,scss,sass,less}',
  )
  const promises = paths.map(async p => {
    const content = await fs.readFile(p, 'utf-8')
    if (content.includes(licenseFragment)) {
      return
    }
    await fs.writeFile(p, license + content)
  })
  await Promise.all(promises)
}
