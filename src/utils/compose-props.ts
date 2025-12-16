import { cn } from '@/tw/cn'
import { cnKey } from '@/utils/platform'
import type { StrMap } from '@/utils/ts'

export const composeProps = (...propsArr: (StrMap | undefined)[]) => {
  propsArr = propsArr.filter(p => p)
  if (propsArr.length <= 1) {
    return propsArr[0]
  }
  const classNames = []
  const handlers: StrMap<Function[]> = {}
  const props: StrMap = {}

  for (const p of propsArr) {
    for (const [k, v] of Object.entries(p as StrMap)) {
      if (k === cnKey) {
        classNames.push(v)
        continue
      }
      if (typeof v === 'function') {
        let h = handlers[k]
        if (!h) {
          h = []
          handlers[k] = h
        }
        h.push(v)
        continue
      }
      props[k] = v
    }
  }

  props[cnKey] = cn(classNames as any)
  for (const [k, v] of Object.entries(handlers)) {
    props[k] = composeHandlers(v)
  }

  return props
}

const composeHandlers = (handlers: Function[]): Function => {
  if (handlers.length <= 1) {
    return handlers[0]
  }
  const composed = (...args: any[]) => {
    for (const h of handlers) {
      h(...args)
    }
  }
  return composed
}
