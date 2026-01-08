/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import { ConfigAPI } from '@babel/core'

import { asyncHookPlugin } from '@/devtools/babel-plugin-async-hook'
import { clientExtensionPlugin } from '@/devtools/babel-plugin-client-extension'
import { twPlugin } from '@/devtools/babel-plugin-tw'
import { getAlias } from '@/devtools/ts/get-alias'
import { path } from '@/nodejs/path'
import { frameworkRn } from '@/root'

export type BabelConfigOptions = {
  dir: string
  target: 'rn' | 'nextjs'
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

  const asyncHookOptions = {
    transpileDirs,
  }

  const twOptions = {
    transpileDirs,
    twrncConfig,
    extractOutputPath: twExtractOutputPath,
  }

  if (target === 'nextjs') {
    const clientExtensionOptions = {
      transpileDirs,
      alias: getAlias(dir),
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

  const moduleResolverOptions = {
    alias: getAlias(dir, {
      relative: true,
    }),
  }

  const extraOptions = {
    isServer: false,
  }
  Object.assign(asyncHookOptions, extraOptions)
  Object.assign(twOptions, extraOptions)

  return {
    plugins: [
      [asyncHookPlugin, asyncHookOptions],
      [twPlugin, twOptions],
      [require.resolve('babel-plugin-module-resolver'), moduleResolverOptions],
      require.resolve('react-native-worklets/plugin'),
    ],
    presets: [require.resolve('@react-native/babel-preset')],
    compact: false,
  }
}
