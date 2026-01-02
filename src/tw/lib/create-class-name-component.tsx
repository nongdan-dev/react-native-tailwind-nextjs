import { clsx } from '@/tw/clsx'
import { createClassNameComponentOptions } from '@/tw/lib/create-class-name-component-options'
import type { StrMap } from '@/utils/ts'

export type CreateClassNameComponentOptions = {
  extraClassNameKeys?: string[]
}
type Options = StrMap & CreateClassNameComponentOptions

export const createClassNameComponent = (options: Options) => {
  const { extraClassNameKeys, Component, displayName } =
    createClassNameComponentOptions(options)

  const ClassNameComponent = ({ ...props }: any) => {
    props.className = clsx(props.className)
    extraClassNameKeys?.forEach(k => {
      props[k] = clsx(props[k])
    })
    return <Component {...props} />
  }

  ClassNameComponent.displayName = displayName
  return ClassNameComponent
}
