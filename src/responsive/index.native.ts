import { Dimensions } from 'react-native'

import { useWindowDimensions } from '@/hooks/use-window-dimensions.native'
import type {
  ClassNameResponsiveSelector,
  ClassNameResponsiveState,
} from '@/tw/class-name'

export const useResponsiveState = () => {
  const { width } = useWindowDimensions()
  return toResponsiveState(width)
}
export const getResponsiveState = () => {
  const { width } = Dimensions.get('window')
  return toResponsiveState(width)
}

const config: Record<ClassNameResponsiveSelector, number> = {
  '2xl': 1536,
  xl: 1280,
  lg: 1024,
  md: 768,
  sm: 640,
  xs: 0,
}
const widths = Object.entries(config) as [ClassNameResponsiveSelector, number][]
const breakpoints = widths.map(([k]) => k) as ClassNameResponsiveSelector[]

const toResponsiveBreakpoint = (width: number) => {
  for (const [k, v] of widths) {
    if (width >= v) {
      return k
    }
  }
  throw new Error('Responsive breakpoint width is less than 0')
}

const toResponsiveState = (width: number) => {
  const state: ClassNameResponsiveState = {}
  const breakpoint = toResponsiveBreakpoint(width)
  for (const k of breakpoints) {
    state[k] = k === breakpoint
  }
  return state
}
