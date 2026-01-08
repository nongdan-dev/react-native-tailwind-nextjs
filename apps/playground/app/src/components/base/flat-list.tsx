/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import type { ReactNode } from 'react'

import type { ClassName } from '@/rn/tw/class-name'
import { createClassNameComponent } from '@/rn/tw/lib/create-class-name-component'
import type { FlatListPropsWocn } from '#/components/base-without-class-name/flat-list'
import { FlatListWocn } from '#/components/base-without-class-name/flat-list'

export type { FlatListRn } from '#/components/base-without-class-name/flat-list'

export type FlatListProps<T> = FlatListPropsWocn<T> & {
  className?: ClassName
  contentContainerClassName?: ClassName
  columnWrapperClassName?: ClassName
}

export const FlatList: <T>(props: FlatListProps<T>) => ReactNode =
  createClassNameComponent({
    FlatListWocn,
    extraClassNameKeys: ['contentContainerClassName', 'columnWrapperClassName'],
  })
