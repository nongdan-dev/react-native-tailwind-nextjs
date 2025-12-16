import { getDefaultConfig, mergeConfig } from '@react-native/metro-config'
import type { MetroConfig } from 'metro-config'

import { repoRoot } from '#/root'

const defaultConfig = getDefaultConfig(repoRoot)
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

export const config = mergeConfig(defaultConfig, extraConfig)
