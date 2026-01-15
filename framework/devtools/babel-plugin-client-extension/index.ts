/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import type { ConfigAPI, PluginObj } from '@babel/core'
import { z } from 'zod'

import { getClientVariant } from '@/devtools/babel-config/get-client-variant'
import {
  getCallerIsServer,
  getIsServer,
} from '@/devtools/babel-config/is-server'
import { shouldTranspile } from '@/devtools/babel-config/should-transpile'

const pluginPassOptsSchema = z.object({
  alias: z.record(z.string(), z.string()),
})

export const clientExtensionPlugin = (api: ConfigAPI): PluginObj => {
  const callerIsServer = getCallerIsServer(api)

  return {
    visitor: {
      // use program path to get plugin pass and perform some checks before traverse
      // also prioritize this plugin over others such as react compiler
      Program: (programPath, pluginPass) => {
        const isServer = getIsServer(pluginPass, callerIsServer)
        const { alias } = pluginPassOptsSchema.parse(pluginPass.opts)
        if (isServer || !shouldTranspile(pluginPass.filename)) {
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
              alias,
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
