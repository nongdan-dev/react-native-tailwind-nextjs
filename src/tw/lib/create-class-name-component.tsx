import { clsx } from '@/tw/clsx'

export const createClassNameComponent =
  (Component: any, extraClassNameKeys?: string[]) =>
  ({ className, ...props }: any) => {
    props.className = clsx(className)
    extraClassNameKeys?.forEach(k => {
      props[k] = clsx(props[k])
    })
    return <Component {...props} />
  }
