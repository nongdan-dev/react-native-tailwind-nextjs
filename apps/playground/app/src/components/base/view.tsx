/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import type { FC } from 'react'

import type { ClassName } from '@/rn/tw/class-name'
import { createClassNameComponent } from '@/rn/tw/lib/create-class-name-component'
import type { ViewPropsWocn } from '#/components/base-without-class-name/view'
import { ViewWocn } from '#/components/base-without-class-name/view'

export type { ViewRn } from '#/components/base-without-class-name/view'

export type ViewProps = ViewPropsWocn & {
  className?: ClassName
}

export const View: FC<ViewProps> = createClassNameComponent({
  ViewWocn,
})
