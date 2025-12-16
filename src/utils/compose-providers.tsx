import type { ComponentType, PropsWithChildren } from 'react'

export const composeProviders = (
  ...arr: ComponentType<PropsWithChildren<any>>[]
): ComponentType<PropsWithChildren> =>
  arr.length === 1
    ? arr[0]
    : props =>
        arr.reduceRight(
          (children, Provider) => <Provider>{children}</Provider>,
          props.children,
        )
