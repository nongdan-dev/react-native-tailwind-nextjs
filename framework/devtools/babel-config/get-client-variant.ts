/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import { fs } from '@/nodejs/fs'
import { path } from '@/nodejs/path'
import type { StrMap } from '@/shared/ts-utils'

const extensions = ['ts', 'tsx']
const indexes = ['', '/index']
const alreadyResolved = ['client', 'server', 'native', 'ios', 'android']

type GetClientVariantOptions = {
  alias: StrMap<string>
  currentFilename: string
  importPath: string
}

export const getClientVariant = ({
  alias,
  currentFilename,
  importPath,
}: GetClientVariantOptions) => {
  if (alreadyResolved.some(k => importPath.endsWith(`.${k}`))) {
    return
  }
  let baseAbs = ''
  if (importPath.startsWith('.')) {
    baseAbs = path.join(path.dirname(currentFilename), importPath)
  } else {
    for (const [k, v] of Object.entries(alias)) {
      if (importPath.startsWith(k)) {
        baseAbs = path.join(v, importPath.replace(k, ''))
        break
      }
    }
  }
  if (!baseAbs) {
    return
  }
  for (const ext of extensions) {
    for (const idx of indexes) {
      const abs = `${baseAbs}${idx}.client.${ext}`
      if (currentFilename === abs) {
        // allow to import 'something' in something.variant, if we transpile here it will import itself
        // NOTE: in react native, it is transpiled anyway and it will import itself with this case
        return
      }
      if (fs.existsSync(abs)) {
        return `${importPath}${idx}.client`
      }
    }
  }
  return
}
