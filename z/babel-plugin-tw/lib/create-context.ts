import type { Node, NodePath, PluginPass, types as t } from '@babel/core'
import { get } from 'lodash'
import type { Platform } from 'react-native'

import type { ClassName } from '@/tw/class-name'
import type { StrMap } from '@/utils/ts'
import type { Twrnc } from '#/babel-plugin-tw/lib/create-twrnc'
import { createTwrnc } from '#/babel-plugin-tw/lib/create-twrnc'
import type { WithPath } from '#/babel-plugin-tw/lib/path-to-js'
import { transpileClassName } from '#/babel-plugin-tw/lib/transpile-class-name'

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
  Partial<Pick<Ctx, 'min' | 'extract' | 'err'>>

const buildCodeFrameError = (path: NodePath, msg: string) =>
  path.buildCodeFrameError(msg)

export const createContext = ({
  pluginPass,
  programPath,
  rootPath,
  calleeName,
  min,
  extract,
  err = buildCodeFrameError,
}: CreateContextOptions) => {
  // mock to test other platforms using extract logic
  const mockPlatform = process.env._MOCK_PLATFORM_OS as any
  if (mockPlatform) {
    min = undefined
    extract = undefined
  }

  const platform: Platform['OS'] =
    mockPlatform || get(pluginPass, 'file.opts.caller.platform') || 'web'

  const twrnc = createTwrnc(platform)

  const ctx: Ctx = {
    programPath,
    rootPath,
    isInFunction: !!rootPath.getFunctionParent(),
    platform,
    calleeName,
    twrnc,
    min,
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

  if ((min || extract) && platform !== 'web') {
    throw err(programPath, `BUG: min|extract in ${platform}`)
  }

  return ctx
}
