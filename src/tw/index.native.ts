/* eslint-disable custom/no-access-property */

import { camelCase } from 'lodash-es'
import { bounce, ping, pulse, spin } from 'react-native-css-animations'
import { useImmer } from 'use-immer'

import { useResponsive } from '@/responsive/index.native'
import { useDarkMode } from '@/theme/client'
import type { CvaNative, Metadata, MetadataChildren } from '@/tw'
import { composeCva } from '@/tw/compose-cva'
import { composeProps } from '@/utils/compose-props'
import type { StrMap } from '@/utils/ts'

// state for dynamic style, transpiled in babel-plugin-tw
type GlobalSelectorsState = Partial<{
  _xs: boolean
  _sm: boolean
  _md: boolean
  _lg: boolean
  _xl: boolean
  _2xl: boolean
  _dark: boolean
  _light: boolean
}>
type SelfSelectorsState = Partial<{
  _active: boolean
  _focus: boolean
}>
type GroupState = Partial<{
  [k in `_group${keyof SelfSelectorsState}`]: boolean
}>
type ParentState = SelfSelectorsState
type ChildrenState = StrMap<SelfSelectorsState>

const cvaNative: CvaNative = o => ho => {
  const globalState: GlobalSelectorsState = {}
  const [parentState, setParentState] = useImmer<ParentState>({})
  const [childrenState, setChildrenState] = useImmer<ChildrenState>({})

  const { metadata, metadataChildren } = o
  let resProps: StrMap = {}

  //
  // global selectors
  if (metadata.responsive) {
    // metadata is static at build time so any hook here is guaranteed to not change
    const v = useResponsive()
    const arr = ['2xl', 'xl', 'lg', 'md', 'sm', 'xs'] as const
    for (const k of arr) {
      globalState[`_${k}`] = k === v
    }
  }
  if (metadata.dark) {
    // metadata is static at build time so any hook here is guaranteed to not change
    const v = useDarkMode()
    globalState._dark = v?.dark
    globalState._light = !globalState._dark
  }

  //
  // self selectors
  addHandlers(metadata, resProps, setParentState)

  //
  // children self selectors
  const resChildrenProps: StrMap<StrMap> = {}
  for (const [k, v] of Object.entries(metadataChildren)) {
    if (!v) {
      continue
    }
    let p = resChildrenProps[k]
    if (!p) {
      p = {}
      resChildrenProps[k] = p
    }
    addHandlers(v, p, setChildrenState, k)
  }

  //
  // cva
  const { classNames, childrenClassNames } = composeCva<TranspiledStyleSingle>(
    ho.variant as any,
    o as any,
  )

  //
  // merge with dynamic style from state
  const parentStateWithProps = {
    ...parentState,
    ...stateFromProps(metadata, ho.props),
  }
  resProps.style = mergeTranspiledStyles(classNames, {
    ...globalState,
    ...parentStateWithProps,
  })
  resProps = composeProps(resProps, ho.props) as StrMap

  //
  // children
  const groupAndPeerState = (['group', 'peer'] as const).map(ty => {
    if (!metadata[ty]) {
      return
    }
    return Object.entries(parentStateWithProps).reduce((m, [pk, pv]) => {
      m[`_${ty}${pk}`] = pv
      return m
    }, {} as StrMap)
  })
  for (const k in childrenClassNames) {
    // should be transpiled already
    let v = childrenClassNames[k] as any as TranspiledStyle
    if (!Array.isArray(v)) {
      v = [v]
    }
    resChildrenProps[k] = {
      style: mergeTranspiledStyles(v as TranspiledStyleSingle[], {
        ...globalState,
        ...childrenState[k],
        ...stateFromProps(metadataChildren[k], ho.childrenProps?.[k]),
        ...groupAndPeerState[0],
        ...groupAndPeerState[1],
      }),
      ...resChildrenProps[k],
    }
    resChildrenProps[k] = composeProps(
      resChildrenProps[k],
      ho.childrenProps?.[k],
    ) as StrMap
  }

  return [resProps, resChildrenProps] as any
}

// class name string should be already transpiled by babel-plugin-tw
// into style object or function for dynamic style
type TranspiledStyleSingle = object | Function | undefined
type TranspiledStyle = TranspiledStyleSingle | TranspiledStyleSingle[]
const mergeTranspiledStyles = (
  styles: TranspiledStyleSingle[],
  state: GlobalSelectorsState & SelfSelectorsState & GroupState,
) => {
  const modifiers: StrMap[] = []
  styles.flat().forEach((v, i) => {
    if (typeof v === 'function') {
      styles[i] = undefined
      // it can return another function since selector can be nested
      do {
        v = v(state)
      } while (typeof v === 'function')
      modifiers.push(v as any)
    }
  })

  const style: StrMap = {}
  styles.forEach(s => Object.assign(style, s))
  modifiers.forEach(s => Object.assign(style, s))

  if (typeof style.transitionProperty === 'string') {
    const p = style.transitionProperty as TransitionPropertyTw
    style.transitionProperty = Array.isArray(p) ? p : transitionMap[p] || p
    const t = style.transitionTimingFunction as string
    style.transitionTimingFunction = Array.isArray(t)
      ? t.map(v => transitionTimingFunctionMap[v] || v)
      : transitionTimingFunctionMap[t] || t
  }

  if (typeof style.animationName === 'string') {
    const v = style.animationName as AnimationNameTw
    Object.assign(style, animationMap[v])
  }

  return style
}

const addHandlers = (
  meta: Metadata | MetadataChildren,
  resProps: StrMap,
  set: Function,
  childrenKey?: string,
) => {
  if (meta.active) {
    // metadata is static at build time so any hook here is guaranteed to not change
    addHandlerActive(resProps, set, childrenKey)
  }
  if (meta.focus) {
    // metadata is static at build time so any hook here is guaranteed to not change
    addHandlerFocus(resProps, set, childrenKey)
  }
}

const addHandlerActive = (
  resProps: StrMap,
  set: Function,
  childrenKey?: string,
) => {
  resProps.onPressIn = () => set(setImmerStateFn('_active', true, childrenKey))
  resProps.onPressOut = () =>
    set(setImmerStateFn('_active', false, childrenKey))
}
const addHandlerFocus = (
  resProps: StrMap,
  set: Function,
  childrenKey?: string,
) => {
  resProps.onFocus = () => set(setImmerStateFn('_focus', true, childrenKey))
  resProps.onBlur = () => set(setImmerStateFn('_focus', false, childrenKey))
}
const setImmerStateFn =
  (k: keyof SelfSelectorsState, v: boolean, childrenKey?: string) =>
  (d: StrMap) => {
    const s = getImmerState(d, childrenKey)
    s[k] = v
  }
const getImmerState = (d: StrMap, childrenKey?: string): SelfSelectorsState => {
  if (!childrenKey) {
    return d
  }
  let s = d[childrenKey]
  if (!s) {
    s = {}
    d[childrenKey] = s
  }
  return s
}

const selectorsFromProps = ['disabled', 'checked'] as const
const stateFromProps = (
  meta: Metadata | MetadataChildren | undefined,
  props?: StrMap,
) => {
  if (!meta) {
    return
  }
  let state: StrMap | undefined = undefined
  for (const k of selectorsFromProps) {
    if (meta[k]) {
      state = state || {}
      state[`_${k}`] = props?.[k]
    }
  }
  return state
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
const transitionTimingFunctionMap: StrMap = {
  // custom transtion timing function here
}

type AnimationNameTw = 'spin' | 'ping' | 'pulse' | 'bounce'
const animationMap: StrMap = {
  spin,
  ping,
  pulse,
  bounce,
  // custom animation here
}

export const twCva = cvaNative
export const useTw = (o: any) => cvaNative(o)(o)
