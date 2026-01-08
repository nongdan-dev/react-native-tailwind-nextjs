/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import type { Resolver } from 'enhanced-resolve'

import { getClientVariant } from '@/devtools/babel-config/get-client-variant'
import {
  shouldTranspile,
  shouldTranspileExtension,
} from '@/devtools/babel-config/should-transpile'
import { getAlias } from '@/devtools/ts/get-alias'
import { isRelative, path } from '@/nodejs/path'
import { get } from '@/shared/lodash'
import type { StrMap } from '@/shared/ts-utils'

export class ResolveClientExtension {
  alias: StrMap<string>
  constructor(dir: string) {
    this.alias = getAlias(dir)
  }

  apply = (resolver: Resolver) => {
    const target = resolver.ensureHook('resolve')

    resolver
      .getHook('beforeResolve')
      .tapAsync('ClientExtensionResolver', (req, ctx, callback) => {
        try {
          const currentFilename = get(req.context, 'issuer')
          let importPath = req.request
          if (!currentFilename || !importPath) {
            return callback()
          }

          if (!shouldTranspile(importPath)) {
            return callback()
          }

          if (!isRelative(importPath)) {
            importPath = path
              .relative(currentFilename, importPath)
              .replace(shouldTranspileExtension, '')
          }

          const clientVariant = getClientVariant({
            alias: this.alias,
            currentFilename,
            importPath,
          })
          if (!clientVariant) {
            return callback()
          }

          resolver.doResolve(
            target,
            {
              ...req,
              request: clientVariant,
            },
            'ClientExtensionResolver',
            ctx,
            callback,
          )
        } catch (err) {
          callback(err as Error)
        }
      })
  }
}
