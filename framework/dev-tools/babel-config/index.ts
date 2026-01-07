/**
 * Copyright (c) 2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import json5 from 'json5'

import type { StrMap } from '@/utils/ts'
import { twPlugin } from '#/babel-plugin-tw'
import { asyncHookPlugin } from '#/dev-tools/babel-plugin-async-hook'
import { clientExtensionPlugin } from '#/dev-tools/babel-plugin-client-extension'
import { repoRoot } from '#/root'

const rn = () => {
  const tsconfigPath = path.join(repoRoot, 'tsconfig.json')
  const tsconfig = json5.parse(fs.readFileSync(tsconfigPath, 'utf-8'))
  const paths: StrMap<string[]> = tsconfig.compilerOptions.paths

  const alias = Object.entries(paths).reduce((m, a) => {
    const [k, v] = [a[0], a[1][0]].map(p => p.replace(/\/\*$/, ''))
    m[k] = v
    return m
  }, {} as StrMap<string>)

  return {
    plugins: [
      asyncHookPlugin,
      twPlugin,
      ['babel-plugin-module-resolver', { alias }],
      'react-native-worklets/plugin',
    ],
    presets: ['@react-native/babel-preset'],
    compact: false,
  }
}

const next = () => ({
  plugins: [clientExtensionPlugin, asyncHookPlugin, twPlugin],
  presets: [
    '@babel/preset-typescript',
    ['@babel/preset-react', { runtime: 'automatic' }],
  ],
  compact: false,
})

export const config =
  process.env._NEXT || process.env.NEXT_PUBLIC_MINIFY_CLASS_NAMES
    ? next()
    : rn()
