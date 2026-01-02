import type { NextConfig } from 'next'

const config: NextConfig = {
  webpack: c => {
    c.resolve.alias = {
      ...c.resolve.alias,
      'next-unchecked/headers': '@/polyfill/next/headers',
      'next-unchecked/navigation': '@/polyfill/next/navigation',
      lodash: 'lodash-es',
      'react-native': 'react-native-web',
      'react-native-svg': 'react-native-svg-web',
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

  devIndicators: false,
}

export default config
