/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import type { AsyncHookPluginOptions } from '@/devtools/babel-plugin-async-hook'
import { asyncHookPlugin } from '@/devtools/babel-plugin-async-hook'
import { clientExtensionPlugin } from '@/devtools/babel-plugin-client-extension'
import { twPlugin } from '@/devtools/babel-plugin-tw'
import type { TwPluginOptions } from '@/devtools/babel-plugin-tw/visitor'
import { getAlias } from '@/devtools/ts/get-alias'
import { path } from '@/nodejs/path'
import { frameworkRn } from '@/root'

export type BabelConfigOptions = {
  dir: string
  target: 'rn' | 'next'
  transpileDirs?: string[]
  twrncConfig?: object
  twExtractOutputPath?: string
}

export const config = ({
  dir,
  target,
  transpileDirs = [dir],
  twrncConfig = require(path.join(dir, './src/twrnc')),
  twExtractOutputPath = dir,
}: BabelConfigOptions) => {
  transpileDirs = [
    frameworkRn,
    ...transpileDirs.map(d => (path.isAbsolute(d) ? d : path.join(dir, d))),
  ]

  const asyncHookOptions: AsyncHookPluginOptions = {
    transpileDirs,
  }

  const twOptions: TwPluginOptions = {
    transpileDirs,
    twrncConfig,
    extractOutputPath: twExtractOutputPath,
  }

  if (target === 'rn') {
    const aliasRelative = getAlias(dir, {
      relative: true,
    })
    const moduleResolverOptions = {
      alias: aliasRelative,
    }

    return {
      plugins: [
        [asyncHookPlugin, asyncHookOptions],
        [twPlugin, twOptions],
        [
          require.resolve('babel-plugin-module-resolver'),
          moduleResolverOptions,
        ],
        require.resolve('react-native-worklets/plugin'),
      ],
      presets: [require.resolve('@react-native/babel-preset')],
      compact: false,
    }
  }

  const alias = getAlias(dir)
  const clientExtensionOptions = {
    transpileDirs,
    alias,
  }

  return {
    plugins: [
      [clientExtensionPlugin, clientExtensionOptions],
      [asyncHookPlugin, asyncHookOptions],
      [twPlugin, twOptions],
      require.resolve('react-native-worklets/plugin'),
    ],
    presets: [
      require.resolve('@babel/preset-typescript'),
      [require.resolve('@babel/preset-react'), { runtime: 'automatic' }],
    ],
    compact: false,
  }
}
