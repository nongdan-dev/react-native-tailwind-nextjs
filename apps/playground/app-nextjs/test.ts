/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import type { NextConfig } from 'next'

import { getClientVariant } from '@/devtools/babel-config/get-client-variant'
import {
  shouldTranspile,
  shouldTranspileExtension,
} from '@/devtools/babel-config/should-transpile'
import { getAlias } from '@/devtools/ts/get-alias'
import { path } from '@/nodejs/path'
import { repoRoot } from '@/root'

const alias = getAlias(__dirname)

class ClientExtensionResolver {
  apply(resolver: any) {
    const target = resolver.ensureHook('resolve')

    resolver
      .getHook('beforeResolve')
      .tapAsync(
        'ClientExtensionResolver',
        (req: any, ctx: any, callback: any) => {
          try {
            const currentFilename = req.context.issuer
            let importPath = req.request

            const isRelative =
              importPath.startsWith('@/') ||
              importPath.startsWith('#') ||
              importPath.startsWith('.')
            if (
              !isRelative &&
              !importPath.startsWith('@') &&
              shouldTranspile(importPath, [repoRoot])
            ) {
              importPath = path
                .relative(currentFilename, importPath)
                .replace(shouldTranspileExtension, '')
            }

            const clientVariant = getClientVariant({
              alias,
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
            callback(err)
          }
        },
      )
  }
}

export const config: NextConfig = {
  webpack: (c, { isServer }) => {
    c.resolve.alias = {
      ...c.resolve.alias,
      'next-unchecked/headers': '@/rn/core/polyfill/next/headers',
      'next-unchecked/navigation': '@/rn/core/polyfill/next/navigation',
      'react-native': 'react-native-web',
      'react-native-svg': 'react-native-svg-web',
    }

    if (!isServer) {
      c.resolve.plugins = c.resolve.plugins || []
      c.resolve.plugins.push(new ClientExtensionResolver())

      c.module.rules.push({
        test: shouldTranspileExtension,
        use: {
          loader: 'babel-loader',
          options: {
            caller: {
              isServer,
            },
          },
        },
      })
    }

    c.module.rules.push({
      test: /\.svg$/,
      use: {
        loader: '@svgr/webpack',
        options: {
          dimensions: false,
        },
      },
    })

    traverseWebpackRule(c.module.rules)

    return c
  },

  devIndicators: false,
}

const traverseWebpackRule = (use: any): any => {
  if (!use || typeof use !== 'object') {
    return use
  }
  if (Array.isArray(use)) {
    return use.map(traverseWebpackRule)
  }
  for (const [k, v] of Object.entries(use)) {
    // if (k === 'loader' && typeof v === 'string' && v.includes('babel')) {
    //   console.log(use)
    // }
    use[k] = traverseWebpackRule(v)
  }
  return use
}
