/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import type { FC } from 'react'

import type { ClassName } from '@/rn/tw/class-name'
import { createClassNameComponent } from '@/rn/tw/lib/create-class-name-component'
import type { PressablePropsWocn } from '#/components/base-without-class-name/pressable'
import { PressableWocn } from '#/components/base-without-class-name/pressable'

export type { PressableRn } from '#/components/base-without-class-name/pressable'

export type PressableProps = PressablePropsWocn & {
  className?: ClassName
}

export const Pressable: FC<PressableProps> = createClassNameComponent({
  PressableWocn,
})
