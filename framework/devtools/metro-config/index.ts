/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import { getDefaultConfig } from '@react-native/metro-config'
import { makeMetroConfig } from '@rnx-kit/metro-config'
import MetroSymlinksResolver from '@rnx-kit/metro-resolver-symlinks'

type Options = {
  dir: string
}

export const config = ({ dir }: Options) => {
  const defaultConfig = getDefaultConfig(dir)
  const { assetExts, sourceExts } = defaultConfig.resolver

  return makeMetroConfig({
    projectRoot: dir,
    resolver: {
      assetExts: assetExts.filter(e => e !== 'svg' && e !== 'css'),
      sourceExts: [...sourceExts, 'svg', 'css'],
      resolveRequest: MetroSymlinksResolver(),
    },
    transformer: {
      babelTransformerPath: require.resolve('./transformer'),
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: false,
        },
      }),
    },
  })
}
