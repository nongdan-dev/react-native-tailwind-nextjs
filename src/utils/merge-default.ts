import type { StrMap } from '@/utils/ts'

export const mergeDefault = (
  value: StrMap<unknown>,
  defaultValue?: StrMap<unknown>,
): any => {
  if (!defaultValue) {
    return value
  }
  value = { ...value }
  Object.keys(defaultValue).forEach(k => {
    if (value[k] === undefined) {
      value[k] = defaultValue[k]
    }
  })
  return value
}
