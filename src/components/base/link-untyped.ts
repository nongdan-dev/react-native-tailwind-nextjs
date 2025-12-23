import type { ReactNode } from 'react'

import type { LinkPropsWocn } from '@/components/base-without-class-name/link-untyped'
import { LinkUntypedWocn } from '@/components/base-without-class-name/link-untyped'
import type { ClassName } from '@/tw/class-name'
import { createClassNameComponent } from '@/tw/lib/create-class-name-component'

export type LinkProps<
  Routes = any,
  Data = any,
  K extends keyof Routes = any,
  Q = K extends keyof Data ? Data[K] : never,
> = LinkPropsWocn<Routes, Data, K, Q> & {
  className?: ClassName
}

export type LinkComponent<Routes, Data> = <K extends keyof Routes>(
  p: LinkProps<Routes, Data, K>,
) => ReactNode

export const LinkUntyped = createClassNameComponent(LinkUntypedWocn)
