/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import type { NextConfig } from 'next'

import { shouldTranspileExtension } from '@/devtools/babel-config/should-transpile'
import { ResolveClientExtension } from '@/devtools/webpack-resolve-client-extension'

type Options = {
  dir: string
}

export const config = ({ dir }: Options): NextConfig => ({
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
      c.resolve.plugins.push(new ResolveClientExtension(dir))

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
})

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
