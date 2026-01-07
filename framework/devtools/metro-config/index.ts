/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import type { MetroConfig } from '@react-native/metro-config'
import { getDefaultConfig, mergeConfig } from '@react-native/metro-config'

export const config = (dir: string) => {
  const defaultConfig = getDefaultConfig(dir)
  const { assetExts, sourceExts } = defaultConfig.resolver

  const extraConfig: MetroConfig = {
    transformer: {
      babelTransformerPath:
        require.resolve('react-native-svg-transformer/react-native'),
    },
    resolver: {
      assetExts: assetExts.filter(e => e !== 'svg'),
      sourceExts: [...sourceExts, 'svg'],
    },
  }

  return mergeConfig(defaultConfig, extraConfig)
}
