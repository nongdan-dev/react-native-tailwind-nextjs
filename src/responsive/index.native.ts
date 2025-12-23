import { useWindowDimensions } from '@/hooks/use-window-dimensions.native'

export const responsiveBreakpoints = [
  '2xl',
  'xl',
  'lg',
  'md',
  'sm',
  'xs',
] as const
export type ResponsiveBreakpoint = (typeof responsiveBreakpoints)[number]

const sm = 640
const md = 768
const lg = 1024
const xl = 1280
const xl2 = 1536

export const useResponsive = (): ResponsiveBreakpoint => {
  const { width } = useWindowDimensions()
  if (width >= xl2) {
    return '2xl'
  }
  if (width >= xl) {
    return 'xl'
  }
  if (width >= lg) {
    return 'lg'
  }
  if (width >= md) {
    return 'md'
  }
  if (width >= sm) {
    return 'sm'
  }
  return 'xs'
}
