import type { ReactNode } from 'react'

import type { FlatListPropsWocn } from '@/components/base-without-class-name/flat-list'
import { FlatListWocn } from '@/components/base-without-class-name/flat-list'
import type { ClassName } from '@/tw/class-name'
import { createClassNameComponent } from '@/tw/lib/create-class-name-component'

export type FlatListProps<T> = FlatListPropsWocn<T> & {
  className?: ClassName
  contentContainerClassName?: ClassName
  columnWrapperClassName?: ClassName
}

export const FlatList: <T>(props: FlatListProps<T>) => ReactNode =
  createClassNameComponent(FlatListWocn, [
    'contentContainerClassName',
    'columnWrapperClassName',
  ])
