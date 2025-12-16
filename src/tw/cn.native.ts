import type { CnDynamicStyle, CnFn, CnFromProps } from '@/tw/cn'
import { dynamicStyle } from '@/tw/dynamic-style'
import { cnKey } from '@/utils/platform'

export const cn: CnFn = (...inputs) => {
  const arr = inputs.flat().filter(v => v)
  return arr.length <= 1
    ? arr[0]
    : !arr.some(v => typeof v === 'function')
      ? arr.reduce((style, v) => Object.assign(style, v), {})
      : (arr as any)
}

export const cnFromProps: CnFromProps = (props: any) => props[cnKey]
export const cnDynamicStyle: CnDynamicStyle = (...classNames) =>
  dynamicStyle(classNames) as any
