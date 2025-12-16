import { cnKey } from '@/utils/platform'

// reference tw.native.ts to see the transpiled styles
export const isReanimated = (props: any) => {
  const styles = props[cnKey]
  if (!styles) {
    return false
  }
  if (Array.isArray(styles)) {
    return styles
      .flat()
      .filter(s => s)
      .some(s => isReanimatedSingle(s))
  }
  return isReanimatedSingle(styles)
}

const isReanimatedSingle = (style: any) =>
  style.transitionProperty || style.animationName
