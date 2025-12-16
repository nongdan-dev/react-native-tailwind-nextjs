import fs from 'fs-extra'
import json5 from 'json5'
import path from 'node:path'

import { asyncHookPlugin } from '#/babel-plugin-async-hook'
import { twPlugin } from '#/babel-plugin-tw'
import { repoRoot } from '#/root'

const rn = () => {
  const tsconfigPath = path.join(repoRoot, 'tsconfig.json')
  const tsconfig = json5.parse(fs.readFileSync(tsconfigPath, 'utf-8'))
  const paths: { [k: string]: string[] } = tsconfig.compilerOptions.paths

  const alias = Object.entries(paths).reduce(
    (m, a) => {
      const [k, v] = [a[0], a[1][0]].map(p => p.replace(/\/\*$/, ''))
      m[k] = v
      return m
    },
    {} as { [k: string]: string },
  )

  return {
    plugins: [
      asyncHookPlugin,
      twPlugin,
      ['babel-plugin-module-resolver', { alias }],
      'babel-plugin-react-native-classname-to-style',
      'react-native-worklets/plugin',
    ],
    presets: ['module:@react-native/babel-preset'],
  }
}

const next = () => ({
  plugins: [twPlugin],
  presets: [
    '@babel/preset-typescript',
    ['@babel/preset-react', { runtime: 'automatic' }],
  ],
})

export const config = process.env._NEXT ? next() : rn()
