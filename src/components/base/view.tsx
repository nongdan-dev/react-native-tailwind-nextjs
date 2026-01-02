import type { FC } from 'react'

import type { ViewPropsWocn } from '@/components/base-without-class-name/view'
import { ViewWocn } from '@/components/base-without-class-name/view'
import type { ClassName } from '@/tw/class-name'
import { createClassNameComponent } from '@/tw/lib/create-class-name-component'

export type { ViewRn } from '@/components/base-without-class-name/view'

export type ViewProps = ViewPropsWocn & {
  className?: ClassName
}

export const View: FC<ViewProps> = createClassNameComponent({
  ViewWocn,
})
