/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import type { NextConfig } from 'next'

import { shouldTranspileExtension } from '@/devtools/babel-config/should-transpile'
import { cssVariablesFilenameRegex } from '@/devtools/webpack-css-variables/transform-css-variables'
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

    traverseWebpackRule(c.module.rules)

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

    c.module.rules.unshift({
      test: cssVariablesFilenameRegex,
      type: 'javascript/auto',
      use: {
        loader: require.resolve('@/devtools/webpack-css-variables'),
      },
    })

    return c
  },

  devIndicators: false,
})

const traverseWebpackRule = (rule: any): any => {
  if (!rule || typeof rule !== 'object') {
    return rule
  }
  if (Array.isArray(rule)) {
    return rule.map(traverseWebpackRule)
  }
  for (const [k, v] of Object.entries(rule)) {
    if (
      k === 'test' &&
      typeof v === 'object' &&
      v?.toString().includes('\\.css')
    ) {
      rule.exclude = rule.exclude || []
      if (Array.isArray(rule.exclude)) {
        rule.exclude.push(cssVariablesFilenameRegex)
      } else {
        rule.exclude = [rule.exclude, cssVariablesFilenameRegex]
      }
    }
    rule[k] = traverseWebpackRule(v)
  }
  return rule
}
