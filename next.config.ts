import type { NextConfig } from 'next'

const config: NextConfig = {
  turbopack: {
    resolveAlias: {
      'react-native': 'react-native-web',
      'react-native-svg': 'react-native-svg-web',
    },
    rules: {
      '*.{ts,tsx}': {
        loaders: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      '*.svg': {
        loaders: [
          {
            loader: '@svgr/webpack',
            options: { dimensions: false },
          },
        ],
        as: '*.js',
      },
    },
  },
  experimental: {
    // react native metro doesnt support esm and typescript
    // we need to use commonjs in babel.config.cjs
    // we need to disable the default babel loader and add a custom one above
    turbopackUseBuiltinBabel: false,
  },
  devIndicators: false,
}

export default config
