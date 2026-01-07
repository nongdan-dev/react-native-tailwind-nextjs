/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import type { ConfigAPI, PluginObj } from '@babel/core'

import type { BabelConfigOptions } from '@/devtools/babel-config'
import { getClientVariant } from '@/devtools/babel-config/get-client-variant'
import { getIsServer } from '@/devtools/babel-config/get-is-server'
import { isInDir } from '@/nodejs/path'

export const clientExtensionPlugin =
  (options: BabelConfigOptions) =>
  (api: ConfigAPI): PluginObj => {
    const isServer = getIsServer({
      api,
      throwOnInvalid: true,
    })

    return {
      visitor: {
        // use program path to get plugin pass and perform some checks before traverse
        // also prioritize this plugin over others such as react compiler
        Program: (programPath, pluginPass) => {
          if (
            isServer ||
            !pluginPass.filename ||
            !options.transpileDirs.some(d => isInDir(d, pluginPass.filename))
          ) {
            return
          }
          const currentFilename = pluginPass.filename as string

          programPath.traverse({
            ImportDeclaration: p => {
              const n = p.node
              if (n.importKind === 'type') {
                return
              }
              const clientVariant = getClientVariant({
                options,
                currentFilename,
                importPath: n.source.value,
              })
              if (!clientVariant) {
                return
              }
              n.source.value = clientVariant
            },
          })
        },
      },
    }
  }
