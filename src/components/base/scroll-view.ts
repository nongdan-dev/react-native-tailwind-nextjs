import type { FC } from 'react'

import type { ScrollViewPropsWocn } from '@/components/base-without-class-name/scroll-view'
import { ScrollViewWocn } from '@/components/base-without-class-name/scroll-view'
import type { ClassName } from '@/tw/class-name'
import { createClassNameComponent } from '@/tw/lib/create-class-name-component'

export type ScrollViewProps = ScrollViewPropsWocn & {
  className?: ClassName
  contentContainerClassName?: ClassName
}

export const ScrollView: FC<ScrollViewProps> = createClassNameComponent(
  ScrollViewWocn,
  ['contentContainerClassName'],
)
