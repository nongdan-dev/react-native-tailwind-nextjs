import type { Node, NodePath } from '@babel/core'

import type { ClassName } from '@/tw/class-name'
import { classNameToNative, stripSelector } from '@/tw/lib/class-name-to-native'
import type { Ctx } from '#/babel-plugin-tw/lib/create-context'
import { moveToRootScope } from '#/babel-plugin-tw/lib/move-to-root-scope'

export type TranspileClassNameOptions = {
  className: string
  ctx: Ctx
  path: NodePath
}
const space = /\s+/g

// on web it will return string
// on react native it will convert to js objects or closure function for
// selectors such as responsive, theme, events active focus..
export const transpileClassName = (
  options: TranspileClassNameOptions,
): ClassName | Node => {
  const {
    className,
    ctx,
    ctx: { platform, min, extract },
    path,
  } = options
  let classNames = className.split(space).filter(v => v)
  // on web it will return strings
  // also can extract and minify the class names
  if (platform === 'web') {
    classNames = classNames.filter(
      v => !['native', 'android', 'ios'].some(s => stripSelector(v, s)),
    )
    if (extract) {
      return extract(classNames)
    }
    if (min) {
      classNames = classNames.map(v => min[v] || v)
    }
    return classNames.join(' ')
  }
  // on native it will convert to js objects
  let transpiled: any = classNameToNative({
    platform,
    twrnc: ctx.twrnc,
    className: classNames.join(' '),
    onUnknown: v => {
      throw ctx.err(path, `unknown or invalid class name ${v}`)
    },
  })
  if (transpiled && typeof transpiled === 'object') {
    transpiled = moveToRootScope(ctx, transpiled)
  }
  return transpiled
}
