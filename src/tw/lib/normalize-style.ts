import { camelCase } from 'lodash'
import { bounce, ping, pulse, spin } from 'react-native-css-animations'
import type {
  CSSAnimationProperties,
  CSSTransitionTimingFunction,
} from 'react-native-reanimated'

import type { FnAny, StrMap } from '@/utils/ts'

type Style = {
  transitionProperty?: string | string[]
  transitionTimingFunction?: string | string[]
  animationName?: string
}

export const normalizeStyle: FnAny = (style: Style) => {
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
const transitionTimingFunctionMap: StrMap<CSSTransitionTimingFunction> = {
  // custom transtion timing function here
}

type AnimationNameTw = 'spin' | 'ping' | 'pulse' | 'bounce'
const animationMap: StrMap<CSSAnimationProperties> = {
  spin,
  ping,
  pulse,
  bounce,
  // custom animation here
}
