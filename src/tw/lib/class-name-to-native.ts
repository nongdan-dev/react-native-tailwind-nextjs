// this will be copied to babel-plugin-tw
// try to make this generic and do not import additional logic
// this can be fixed if we move to pnpm workspace

import { camelCase } from 'lodash'
import type { Platform } from 'react-native'

import type { ClassNameNative, ClassNameSelector } from '@/tw/class-name'

import twConfig from '../../../tailwind.config.cjs'

export type ClassNameToNativeOptions = {
  platform: Platform['OS']
  className: string
  twrnc: Function
  onUnknown?: (className: string) => void
}

const throwOnUnknown = (className: string) => {
  throw new Error(`Unknown or invalid class name ${className}`)
}
const space = /\s+/g

export const classNameToNative = (
  options: ClassNameToNativeOptions,
): ClassNameNative => {
  const required: Required<ClassNameToNativeOptions> = {
    ...options,
    onUnknown: options.onUnknown || throwOnUnknown,
  }
  const { className, twrnc, onUnknown } = required

  if (!className) {
    return
  }

  if (space.test(className)) {
    const style = className
      .split(space)
      .filter(s => s)
      .map(s => classNameToNative({ ...required, className: s }))
    return omitEmptyClassName(style)
  }

  let style: ClassNameNative = undefined
  for (const extra of extraTwrnc) {
    style = extra(required)
    if (style) {
      break
    }
  }

  if (!style) {
    style = twrnc(className) as ClassNameNative
    style = omitEmptyClassName(style)
    if (!style) {
      return onUnknown(className)
    }
  } else {
    style = omitEmptyClassName(style)
  }

  return style
}

export const stripSelector = (className: string, selector: string) => {
  let striped = ''
  const prefix = `${selector}:`
  if (className.startsWith(prefix)) {
    striped = className.replace(prefix, '')
  }
  const mid = `:${selector}:`
  if (className.includes(mid)) {
    striped = className.replace(mid, ':')
  }
  return striped
}

const omitEmptyClassName = (native: ClassNameNative): ClassNameNative => {
  if (!native) {
    return
  }

  if (Array.isArray(native)) {
    native = native
      .flat(Infinity as 0)
      .map(omitEmptyClassName)
      .filter(v => v)
    if (native.length <= 1) {
      return native[0]
    }
    const styles: any[] = []
    const arr = native
    native = []
    for (const v of arr) {
      if (v && typeof v === 'object' && !('selector' in v)) {
        styles.push(v)
      } else {
        native.push(v)
      }
    }
    if (styles.length) {
      native.unshift(Object.assign({}, ...styles))
    }
    if (native.length <= 1) {
      return native[0]
    }
    return native
  }

  if ('selector' in native) {
    const style = omitEmptyClassName(native.style)
    if (!style) {
      return
    }
    return {
      selector: native.selector,
      style,
    }
  }

  if (!Object.keys(native).length) {
    return
  }

  return native
}

type ExtraTwrncOptions = Required<ClassNameToNativeOptions>
type ExtraTwrnc = (options: ExtraTwrncOptions) => any
const extraTwrnc: ExtraTwrnc[] = []
const twBabel = twConfig.extra.babel

const stripNative = [
  /^cursor-pointer$/,
  /^select-none$/,
  /^web-/,
  /^web:/,
  /^hover:/,
  /^group-[\w-]*hover:/,
  /^peer-[\w-]*hover:/,
]
extraTwrnc.push(options => {
  const { platform, className } = options
  const isNative = platform !== 'web'
  if (!isNative) {
    return
  }
  if (stripNative.some(r => r.test(className))) {
    return {}
  }
  return
})

const platformSelectors = ['web', 'native', 'android', 'ios']
const platformSelectorsSet = new Set<string>(platformSelectors)
const classNameSelectors: ClassNameSelector[] = [
  // responsive
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  '2xl',
  // dark
  'dark',
  'light',
  // handlers
  'active',
  'focus',
  // props
  'disabled',
  'checked',
]
const selectors = [...platformSelectors, ...classNameSelectors]
extraTwrnc.push(options => {
  const { platform, className } = options
  for (const selector of selectors) {
    const striped = stripSelector(className, selector)
    if (!striped) {
      continue
    }
    const style = classNameToNative({
      ...options,
      className: striped,
    })
    if (!style) {
      return {}
    }
    if (platformSelectorsSet.has(selector)) {
      if (platform !== selector) {
        return {}
      }
      return {
        selector: true,
        style,
      }
    }
    return {
      selector,
      style,
    }
  }
  return
})

// transition
// transition-all
// transition-colors
// transition-opacity
// transition-shadow
// transition-transform
// transition-none
// transition-[<value>]
extraTwrnc.push(options => {
  const { className, onUnknown } = options
  let prefix = 'transition'
  if (!className.startsWith(prefix)) {
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
  if (className === prefix) {
    return r
  }
  prefix = `${prefix}-`
  if (!className.startsWith(prefix)) {
    return onUnknown(className)
  }
  const striped = className.replace(prefix, '') as TransitionPropertyTw
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
    return onUnknown(className)
  }
  r.transitionProperty = striped.slice(1, -1).split(',').map(camelCase)
  return r
})

// duration-<number>
// duration-initial
extraTwrnc.push(options => {
  const { className, onUnknown } = options
  const prefix = 'duration-'
  if (!className.startsWith(prefix)) {
    return
  }
  const striped = className.replace(prefix, '')
  if (striped === 'initial') {
    return {
      transitionDuration: 0,
    }
  }
  const n = Number(striped)
  if (Number.isNaN(n)) {
    return onUnknown(className)
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
extraTwrnc.push(options => {
  const { className, onUnknown } = options
  const prefix = 'ease-'
  if (!className.startsWith(prefix)) {
    return
  }
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
  if (!arr.has(className)) {
    return onUnknown(className)
  }
  let striped = className.replace(prefix, '')
  if (striped === 'initial') {
    striped = 'ease'
  }
  return {
    transitionTimingFunction: striped,
  }
})

// delay-<number>
extraTwrnc.push(options => {
  const { className, onUnknown } = options
  const prefix = 'delay-'
  if (!className.startsWith(prefix)) {
    return
  }
  const striped = className.replace(prefix, '')
  const n = Number(striped)
  if (Number.isNaN(n)) {
    return onUnknown(className)
  }
  return {
    transitionDelay: n,
  }
})

// animate-spin
// animate-ping
// animate-pulse
// animate-bounce
extraTwrnc.push(options => {
  const { className, onUnknown } = options
  const prefix = 'animate-'
  if (!className.startsWith(prefix)) {
    return
  }
  const arr = new Set(
    ['spin', 'ping', 'pulse', 'bounce', ...twBabel.animation.custom].map(
      v => `${prefix}${v}`,
    ),
  )
  if (!arr.has(className)) {
    return onUnknown(className)
  }
  return {
    animationName: className.replace(prefix, ''),
  }
})

// line-clamp-<number>
// line-clamp-none
extraTwrnc.push(options => {
  const { className, onUnknown } = options
  const prefix = 'line-clamp-'
  if (!className.startsWith(prefix)) {
    return
  }
  const striped = className.replace(prefix, '')
  if (striped === 'none') {
    return {
      numberOfLines: undefined,
    }
  }
  const n = Number(striped)
  if (Number.isNaN(n)) {
    return onUnknown(className)
  }
  return {
    numberOfLines: n,
  }
})

// placeholder-<color>
extraTwrnc.push(options => {
  const { className, twrnc, onUnknown } = options
  const prefix = 'placeholder-'
  if (!className.startsWith(prefix)) {
    return
  }
  const striped = className.replace(prefix, '')
  const style = twrnc(`text-${striped}`)
  if (!style?.color) {
    return onUnknown(className)
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
extraTwrnc.push(options => {
  const { className, onUnknown } = options
  const prefix = 'object-'
  if (!className.startsWith(prefix)) {
    return
  }
  const arr = new Set(
    ['contain', 'cover', 'fill', 'none', 'scale-down'].map(
      v => `${prefix}${v}`,
    ),
  )
  if (!arr.has(className)) {
    return onUnknown(className)
  }
  return {
    resizeMode: className.replace(prefix, ''),
  }
})
