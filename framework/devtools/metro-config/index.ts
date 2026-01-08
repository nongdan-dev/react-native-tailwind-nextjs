/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import { getDefaultConfig } from '@react-native/metro-config'
import { makeMetroConfig } from '@rnx-kit/metro-config'
import MetroSymlinksResolver from '@rnx-kit/metro-resolver-symlinks'

export const config = (dir: string) => {
  const defaultConfig = getDefaultConfig(dir)
  const { assetExts, sourceExts } = defaultConfig.resolver

  return makeMetroConfig({
    projectRoot: dir,
    resolver: {
      assetExts: assetExts.filter(e => e !== 'svg'),
      sourceExts: [...sourceExts, 'svg'],
      resolveRequest: MetroSymlinksResolver(),
    },
    transformer: {
      babelTransformerPath:
        require.resolve('react-native-svg-transformer/react-native'),
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: false,
        },
      }),
    },
  })
}
