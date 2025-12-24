import { clsx } from '@/tw/clsx'

export const createClassNameComponent =
  (Component: any, extraClassNameProps?: string[]) =>
  ({ className, ...props }: any) => {
    props.className = clsx(className)
    extraClassNameProps?.forEach(k => {
      props[k] = clsx(props[k])
    })
    return <Component {...props} />
  }
