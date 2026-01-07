/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import { asyncHookPlugin } from '@/devtools/babel-plugin-async-hook'
import { clientExtensionPlugin } from '@/devtools/babel-plugin-client-extension'
import { twPlugin } from '@/devtools/babel-plugin-tw'
import { getAlias } from '@/devtools/ts/get-alias'
import { path } from '@/nodejs/path'
import { frameworkRoot } from '@/root'
import type { StrMap } from '@/shared/ts-utils'

type BabelConfigOptionsInput = Partial<{
  transpileDirs: string[]
  twJson: string
}>
type BabelConfigOptionsInputWithDir = BabelConfigOptionsInput & {
  dir: string
}
export type BabelConfigOptions = Required<BabelConfigOptionsInputWithDir> & {
  alias: StrMap<string>
  aliasRelative: StrMap<string>
  twFn: string
  cvaFn: string
  clsxFn: string
}

const normalizeOptions = ({
  dir,
  transpileDirs = [],
  twJson = dir,
}: BabelConfigOptionsInputWithDir): BabelConfigOptions => ({
  dir,
  transpileDirs: [
    // transpile this dir
    path.join(frameworkRoot, './rn'),
    ...transpileDirs,
  ],
  alias: getAlias(dir),
  aliasRelative: getAlias(dir, { relative: true }),
  twFn: 'tw',
  cvaFn: 'cva',
  clsxFn: 'clsx',
  twJson: twJson.endsWith('.json')
    ? twJson
    : path.join(twJson, './src/codegen/class-names.min.json'),
})

export const rn = (dir: string, options?: BabelConfigOptionsInput) => {
  const o = normalizeOptions({ dir, ...options })
  return {
    plugins: [
      asyncHookPlugin(o),
      twPlugin(o),
      [
        require.resolve('babel-plugin-module-resolver'),
        { alias: o.aliasRelative },
      ],
      require.resolve('react-native-worklets/plugin'),
    ],
    presets: [require.resolve('@react-native/babel-preset')],
    compact: false,
  }
}

export const next = (dir: string, options?: BabelConfigOptionsInput) => {
  const o = normalizeOptions({ dir, ...options })
  return {
    plugins: [
      clientExtensionPlugin(o),
      asyncHookPlugin(o),
      twPlugin(o),
      require.resolve('react-native-worklets/plugin'),
    ],
    presets: [
      require.resolve('@babel/preset-typescript'),
      [require.resolve('@babel/preset-react'), { runtime: 'automatic' }],
    ],
    compact: false,
  }
}
