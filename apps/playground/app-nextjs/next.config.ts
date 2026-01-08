/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import type { NextConfig } from 'next'

const config: NextConfig = {
  webpack: (c, { isServer }) => {
    c.resolve.alias = {
      ...c.resolve.alias,
      'next-unchecked/headers': '@/rn/core/polyfill/next/headers',
      'next-unchecked/navigation': '@/rn/core/polyfill/next/navigation',
      'react-native': 'react-native-web',
      'react-native-svg': 'react-native-svg-web',
    }

    if (!isServer) {
      c.module.rules.push({
        test: /\.tsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: false,
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

    return c
  },

  experimental: {
    externalDir: true,
  },

  devIndicators: false,
}

export default config
