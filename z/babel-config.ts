import type { ConfigAPI } from '@babel/core'
import fs from 'fs-extra'
import json5 from 'json5'
import path from 'node:path'

import type { StrMap } from '@/utils/ts'
import { asyncHookPlugin } from '#/babel-plugin-async-hook'
import { clientExtensionPlugin } from '#/babel-plugin-client-extension'
import { twPlugin } from '#/babel-plugin-tw'
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

export const config = (api: ConfigAPI) => {
  if (process.env.BABEL_DISABLE_CACHE) {
    api.cache.never()
  }
  return process.env._NEXT || process.env.NEXT_PUBLIC_MINIFY_CLASS_NAMES
    ? next()
    : rn()
}
