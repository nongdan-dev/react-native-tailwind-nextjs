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

type Options = {
  projectService?: string
  transpileDirs?: string[]
}
type GetOptions = Options & {
  dir: string
}
export type BabelConfigOptions = Required<GetOptions> & {
  alias: StrMap<string>
  aliasRelative: StrMap<string>
}

const getOptions = ({
  dir,
  projectService = dir,
  transpileDirs = [],
}: GetOptions): BabelConfigOptions => ({
  dir,
  projectService,
  transpileDirs: [
    // default transpile dir in framework
    path.join(frameworkRoot, './rn'),
    ...transpileDirs,
  ],
  alias: getAlias(projectService),
  aliasRelative: getAlias(projectService, { relative: true }),
})

export const rn = (dir: string, options: Options) => {
  const o = getOptions({ dir, ...options })
  return {
    plugins: [
      asyncHookPlugin,
      twPlugin,
      ['babel-plugin-module-resolver', { alias: o.aliasRelative }],
      'react-native-worklets/plugin',
    ],
    presets: ['@react-native/babel-preset'],
    compact: false,
  }
}

export const next = () => ({
  plugins: [clientExtensionPlugin, asyncHookPlugin, twPlugin],
  presets: [
    '@babel/preset-typescript',
    ['@babel/preset-react', { runtime: 'automatic' }],
  ],
  compact: false,
})
