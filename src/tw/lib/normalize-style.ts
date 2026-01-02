import { camelCase } from 'lodash'

import {
  animationMap,
  transitionTimingFunctionMap,
} from '@/tw/lib/normalize-style-extra'
import type { FnAny } from '@/utils/ts'

type Style = {
  marker?: true
  transitionProperty?: string | string[]
  transitionTimingFunction?: string | string[]
  animationName?: string
}

// style should be flatten already in create class name component
export const normalizeStyle: FnAny = (style?: Style) => {
  if (!style) {
    return
  }

  delete style.marker

  if (typeof style.transitionProperty === 'string') {
    const p = style.transitionProperty as
      | TransitionPropertyTw
      | TransitionPropertyTw[]
    style.transitionProperty = Array.isArray(p) ? p : transitionMap[p] || p
  }

  if (typeof style.transitionTimingFunction === 'string') {
    const t = style.transitionTimingFunction
    style.transitionTimingFunction = (
      Array.isArray(t)
        ? t.map(v => transitionTimingFunctionMap[v] || v)
        : transitionTimingFunctionMap[t] || t
    ) as any
  }

  if (typeof style.animationName === 'string') {
    const v = style.animationName as AnimationNameTw
    Object.assign(style, animationMap[v])
  }
}

// should keep these typings updated with the babel-plugin-tw transpile code
type TransitionPropertyTw =
  | ''
  | 'all'
  | 'colors'
  | 'opacity'
  | 'shadow'
  | 'transform'
  | 'none'

// data copied from tailwind
// commented out incompatible values in react native

const transitionColors = [
  'color',
  'background-color',
  'border-color',
  'outline-color',
  'text-decoration-color',
  // 'fill',
  // 'stroke',
  // '--tw-gradient-from',
  // '--tw-gradient-via',
  // '--tw-gradient-to',
].map(camelCase)
const transitionOpacity = [
  'opacity',
  //
].map(camelCase)
const transitionShadow = [
  'box-shadow',
  //
].map(camelCase)
const transitionTransform = [
  'transform',
  'translate',
  'scale',
  'rotate',
  // from react native:
  'translateX',
  'translateY',
  'scaleX',
  'scaleY',
  'rotation',
].map(camelCase)
const transitionWildcard = [
  ...transitionColors,
  ...transitionOpacity,
  ...transitionShadow,
  ...transitionTransform,
]
const transitionMap: { [k in TransitionPropertyTw]?: string[] } = {
  '': transitionWildcard,
  colors: transitionColors,
  opacity: transitionOpacity,
  shadow: transitionShadow,
  transform: transitionTransform,
  // all and none are supported by reanimated
  // we can keep the string value
  all: undefined,
  none: undefined,
}

type AnimationNameTw = 'spin' | 'ping' | 'pulse' | 'bounce'
