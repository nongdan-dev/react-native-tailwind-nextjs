/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import type { Node, NodePath, PluginPass, types as t } from '@babel/core'
import type { Platform } from 'react-native'
import { z } from 'zod'

import {
  getPlatform,
  readTwExtractOutput,
} from '@/devtools/babel-plugin-tw/lib/config'
import type { Twrnc } from '@/devtools/babel-plugin-tw/lib/create-twrnc'
import { createTwrnc } from '@/devtools/babel-plugin-tw/lib/create-twrnc'
import type { WithPath } from '@/devtools/babel-plugin-tw/lib/path-to-js'
import { transpileClassName } from '@/devtools/babel-plugin-tw/lib/transpile-class-name'
import type { ClassName } from '@/rn/tw/class-name'
import type { StrMap } from '@/shared/ts-utils'

const pluginPassOptsSchema = z.object({
  extractOutputPath: z.string(),
  twrncConfig: z.record(z.string(), z.any()),
})

export type Ctx = {
  programPath: NodePath<t.Program>
  rootPath: NodePath
  isInFunction: boolean
  platform: Platform['OS']
  // omit in jsx class name or tagged template literal
  calleeName?: string
  twrnc: Twrnc
  min?: StrMap<string>
  extract?: (classNames: string[]) => void
  err: (path: NodePath<any>, msg: string) => Error
  // closure
  transpileClassName: (v: WithPath<string>) => ClassName | Node
}

export type CreateContextOptions = {
  pluginPass: PluginPass
} & Pick<Ctx, 'programPath' | 'rootPath' | 'calleeName'> &
  Partial<Pick<Ctx, 'extract' | 'err'>>

const codeFrameErr = (path: NodePath, msg: string) =>
  path.buildCodeFrameError(msg)

export const createContext = ({
  pluginPass,
  programPath,
  rootPath,
  calleeName,
  extract,
  err = codeFrameErr,
}: CreateContextOptions) => {
  const platform = getPlatform(pluginPass)

  const { extractOutputPath, twrncConfig } =
    pluginPassOptsSchema.parse(pluginPass)
  const twrnc = createTwrnc(platform, twrncConfig)

  const ctx: Ctx = {
    programPath,
    rootPath,
    isInFunction: !!rootPath.getFunctionParent(),
    platform,
    calleeName,
    twrnc,
    min: readTwExtractOutput(extractOutputPath),
    extract,
    err,
    transpileClassName: v => {
      const className = v.value
      if (typeof className !== 'string') {
        throw err(v.path, 'expect string literal')
      }
      return transpileClassName({
        className,
        ctx,
        path: v.path,
      })
    },
  }

  if (extract && platform !== 'web' && !process.env._MOCK_PLATFORM_OS) {
    throw err(programPath, `BUG: extract in ${platform}`)
  }

  return ctx
}
