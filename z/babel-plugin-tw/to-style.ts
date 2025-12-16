import type { Node, NodePath } from '@babel/core'
import { types as t } from '@babel/core'
import { camelCase, set, snakeCase } from 'lodash-es'

import { twBabel } from '#/babel-plugin-tw/config'
import { dynamicStyle } from '#/babel-plugin-tw/utils/dynamic-style'
import { moveToRootScope } from '#/babel-plugin-tw/utils/move-to-root-scope'
import type { Ctx } from '#/babel-plugin-tw/visitor'

export type ToStyleOptions = {
  cn: string
  ctx: Ctx
  path: NodePath
  type: ToStyleType
  isRootClassName?: boolean
  childrenKey?: string
}
export type ToStyleType = 'tag' | 'cva-root' | 'cva-children'

export type StyleWeb = string
export type StyleNative = object | Node | undefined | void
export type Style = StyleWeb | Node | Node[] | undefined | void

// on web it will return string
// on react native it will convert to js objects or closure function for
// dynamic styles such as events on press, on focus..
export const toStyle = (opt: ToStyleOptions): Style => {
  const { cn, ctx, path, type, isRootClassName, childrenKey } = opt
  const arr = cn
    .split(' ')
    .map(v => v.trim())
    // need to strip platform selector first since we need to return string class name on web
    // other selectors will be transpile to style object only in react native
    .map(v => stripPlatform({ ...opt, cn: v }))
    .filter(v => v) as string[]
  // on web it will return string
  // also can extract and minify the class names
  if (ctx.platform === 'web') {
    if (ctx.extract) {
      return ctx.extract(arr)
    }
    return arr.map(v => ctx.min?.[v] || v).join(' ')
  }
  if (!isRootClassName && safeIncludes(cn, 'group')) {
    throw ctx.err(path, 'group is only supported in twCva root className')
  }
  if (!isRootClassName && safeIncludes(cn, 'peer')) {
    throw ctx.err(path, 'peer is only supported in twCva root className')
  }
  if (type === 'cva-children' && !childrenKey) {
    throw ctx.err(path, 'BUG: missing children key')
  }
  // on react native it will convert to js objects or closure function
  const styles = arr
    // nested selector with deeper level will take precedence
    .sort((a, b) => a.split(':').length - b.split(':').length)
    .map(v => rnStyleObjectOrDynamicFn({ ...opt, cn: v }))
    .filter(v => v) as (object | Node)[]
  const nodes = [
    mergeStylesAndMoveToRootScope(
      opt,
      styles.filter(v => !t.isNode(v)),
    ),
    ...styles.filter(v => t.isNode(v)),
  ].filter(v => v) as Node[]
  if (nodes.length <= 1) {
    return nodes[0]
  }
  return nodes
}

type TranspileStyleFn = (opt: ToStyleOptions) => StyleNative
const extraTwrnc: TranspileStyleFn[] = []

const unknown = (opt: ToStyleOptions) => {
  const { cn, ctx, path } = opt
  ctx.err(path, `unknown or invalid class name ${cn}`)
}
const unsupport = (opt: ToStyleOptions) => {
  const { cn, ctx, path } = opt
  ctx.err(path, `class name ${cn} is not support here`)
}

// transition
// transition-all
// transition-colors
// transition-opacity
// transition-shadow
// transition-transform
// transition-none
// transition-[<value>]
extraTwrnc.push(opt => {
  const { cn } = opt
  let prefix = 'transition'
  if (!cn.startsWith(prefix)) {
    return
  }
  // should keep these typings updated with the post-transpile runtime code
  type TransitionPropertyTw =
    | 'all'
    | 'colors'
    | 'opacity'
    | 'shadow'
    | 'transform'
    | 'none'
  type TransitionProperty = '' | TransitionPropertyTw | string[]
  const r = {
    transitionProperty: '' as TransitionProperty,
    transitionDuration: twBabel.transition.defaultDuration,
    transitionTimingFunction: twBabel.transition.defaultTimingFunction,
  }
  if (cn === prefix) {
    return r
  }
  prefix = `${prefix}-`
  if (!cn.startsWith(prefix)) {
    return unknown(opt)
  }
  const striped = cn.replace(prefix, '') as TransitionPropertyTw
  const tailwind: Set<TransitionPropertyTw> = new Set([
    'all',
    'colors',
    'opacity',
    'shadow',
    'transform',
    'none',
  ])
  if (tailwind.has(striped)) {
    r.transitionProperty = striped
    return r
  }
  if (!(striped.startsWith('[') && striped.endsWith(']'))) {
    return unknown(opt)
  }
  r.transitionProperty = striped.slice(1, -1).split(',').map(camelCase)
  return r
})

// duration-<number>
// duration-initial
extraTwrnc.push(opt => {
  const { cn } = opt
  const prefix = 'duration-'
  if (!cn.startsWith(prefix)) {
    return
  }
  const striped = cn.replace(prefix, '')
  if (striped === 'initial') {
    return {
      transitionDuration: 0,
    }
  }
  const n = Number(striped)
  if (Number.isNaN(n)) {
    return unknown(opt)
  }
  return {
    transitionDuration: n,
  }
})

// ease-linear
// ease-in
// ease-out
// ease-in-out
// ease-initial
extraTwrnc.push(opt => {
  const { cn } = opt
  const prefix = 'ease-'
  const arr = new Set(
    [
      'linear',
      'in',
      'out',
      'in-out',
      'initial',
      ...twBabel.transition.custom,
    ].map(v => `${prefix}${v}`),
  )
  if (!arr.has(cn)) {
    return
  }
  let striped = cn.replace(prefix, '')
  if (striped === 'initial') {
    striped = 'ease'
  }
  return {
    transitionTimingFunction: striped,
  }
})

// delay-<number>
extraTwrnc.push(opt => {
  const { cn } = opt
  const prefix = 'delay-'
  if (!cn.startsWith(prefix)) {
    return
  }
  const striped = cn.replace(prefix, '')
  const n = Number(striped)
  if (Number.isNaN(n)) {
    return unknown(opt)
  }
  return {
    transitionDelay: n,
  }
})

// animate-spin
// animate-ping
// animate-pulse
// animate-bounce
extraTwrnc.push(opt => {
  const { cn } = opt
  const prefix = 'animate-'
  const arr = new Set(
    ['spin', 'ping', 'pulse', 'bounce', ...twBabel.animation.custom].map(
      v => `${prefix}${v}`,
    ),
  )
  if (!arr.has(cn)) {
    return
  }
  return {
    animationName: cn.replace(prefix, ''),
  }
})

// line-clamp-<number>
// line-clamp-none
extraTwrnc.push(opt => {
  const { cn } = opt
  const prefix = 'line-clamp-'
  if (!cn.startsWith(prefix)) {
    return
  }
  const striped = cn.replace(prefix, '')
  if (striped === 'none') {
    return {
      numberOfLines: undefined,
    }
  }
  const n = Number(striped)
  if (Number.isNaN(n)) {
    return unknown(opt)
  }
  return {
    numberOfLines: n,
  }
})

// placeholder-<color>
extraTwrnc.push(opt => {
  const { cn, ctx } = opt
  const prefix = 'placeholder-'
  if (!cn.startsWith(prefix)) {
    return
  }
  const striped = cn.replace(prefix, '')
  const style = ctx.twrnc(`text-${striped}`)
  if (!style?.color) {
    return unknown(opt)
  }
  return {
    placeholderTextColor: style.color,
  }
})

// object-contain
// object-cover
// object-fill
// object-none
// object-scale-down
extraTwrnc.push(opt => {
  const { cn } = opt
  const prefix = 'object-'
  const arr = new Set(
    ['contain', 'cover', 'fill', 'none', 'scale-down'].map(
      v => `${prefix}${v}`,
    ),
  )
  if (!arr.has(cn)) {
    return
  }
  return {
    resizeMode: cn.replace(prefix, ''),
  }
})

const selfSelectors = ['active', 'focus', 'disabled', 'checked']
const groupSelectors = selfSelectors.map(v => `group-${v}`)
const peerSelectors = selfSelectors.map(v => `peer-${v}`)
const globalResponsiveSelectors = ['xs', 'sm', 'md', 'lg', 'xl', '2xl']
const globalDarkModeSelectors = ['dark', 'light']
const selectors = [
  ...selfSelectors,
  ...groupSelectors,
  ...peerSelectors,
  ...globalResponsiveSelectors,
  ...globalDarkModeSelectors,
] as const

for (const sel of selectors) {
  extraTwrnc.push(opt => {
    const {
      cn,
      ctx,
      ctx: { metadata, metadataChildren },
      type,
      childrenKey,
    } = opt
    const striped = stripSelector(cn, sel)
    if (!striped) {
      return
    }
    // no support for dynamic style in tagged template literal
    if (type === 'tag') {
      return unsupport(opt)
    }
    // set metadata
    let stateSel: string = sel
    let parentSel: string | undefined = sel
    let childrenSel: string | undefined = undefined
    if (selfSelectors.includes(sel)) {
      if (type === 'cva-children') {
        parentSel = undefined
        childrenSel = sel
      }
    }
    for (const ty of ['group', 'peer'] as const) {
      const sels = ty === 'group' ? groupSelectors : peerSelectors
      if (sels.includes(sel)) {
        // only support group / peer selectors in children
        if (type !== 'cva-children') {
          return unsupport(opt)
        }
        stateSel = snakeCase(sel)
        parentSel = sel.replace(`${ty}-`, '')
        childrenSel = stateSel
        metadata[ty] = true
      }
    }
    if (parentSel) {
      set(metadata, parentSel, true)
    }
    if (childrenSel) {
      set(metadataChildren, `${childrenKey}.${childrenSel}`, true)
    }
    // use this function to handle nested selector
    // it can return another function since selector can be nested
    let style = rnStyleObjectOrDynamicFn({
      ...opt,
      cn: striped,
    })
    if (style && !t.isNode(style)) {
      style = mergeStylesAndMoveToRootScope(opt, [style])
    }
    return dynamicStyle(ctx, `_${stateSel}`, style)
  })
}

const stripNative = new Set(['group', 'cursor-pointer', 'select-none'])
extraTwrnc.push(opt => {
  const { cn, ctx } = opt
  const isNative = ctx.platform !== 'web'
  if (!isNative) {
    return
  }
  if (!stripNative.has(cn)) {
    return
  }
  return {}
})

const allPlatforms = ['web', 'native', 'android', 'ios'] as const
const stripPlatform = (opt: ToStyleOptions): string | false | undefined => {
  const { cn, ctx } = opt
  if (!cn) {
    return
  }
  const isWeb = ctx.platform === 'web'
  const isNative = !isWeb
  const isAndroid = ctx.platform === 'android'
  const isIos = ctx.platform === 'ios'
  for (const sel of allPlatforms) {
    const striped = stripSelector(cn, sel)
    if (!striped) {
      continue
    }
    if (sel === 'web') {
      // it will not match with tailwind if we strip web
      // we already defined custom variant in global.css for this
      return isWeb && cn
    }
    if (sel === 'native') {
      return isNative && striped
    }
    if (sel === 'ios') {
      return isIos && striped
    }
    if (sel === 'android') {
      return isAndroid && striped
    }
  }
  return cn
}

const stripSelector = (cn: string, sel: string) => {
  let striped = ''
  const prefix = `${sel}:`
  if (cn.startsWith(prefix)) {
    striped = cn.replace(prefix, '')
  }
  const mid = `:${sel}:`
  if (cn.includes(mid)) {
    striped = cn.replace(mid, ':')
  }
  return striped
}

const rnStyleObjectOrDynamicFn = (
  opt: ToStyleOptions,
): object | Node | undefined => {
  const { cn, ctx } = opt
  if (!cn) {
    return
  }
  for (const extra of extraTwrnc) {
    const style = extra(opt)
    if (style) {
      return style
    }
  }
  return ctx.twrnc(cn)
}

const mergeStylesAndMoveToRootScope = (
  opt: ToStyleOptions,
  styles: object[],
) => {
  const { ctx, path } = opt
  if (styles.some(v => t.isNode(v))) {
    throw ctx.err(path, 'BUG: merge styles to root scope found babel node')
  }
  const style = styles.reduce((m, v) => Object.assign(m, v), {})
  if (!Object.keys(style).length) {
    return
  }
  return moveToRootScope(ctx, 'style', style)
}

export const safeIncludes = (cn: string, k: string) =>
  cn === k ||
  cn.startsWith(`${k} `) ||
  cn.endsWith(` ${k}`) ||
  cn.includes(` ${k} `)
