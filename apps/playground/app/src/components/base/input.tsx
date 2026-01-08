/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import type { FC } from 'react'

import type { ClassName } from '@/rn/tw/class-name'
import { createClassNameComponent } from '@/rn/tw/lib/create-class-name-component'
import type { InputPropsWocn } from '#/components/base-without-class-name/input'
import { InputWocn } from '#/components/base-without-class-name/input'

export type { InputRn } from '#/components/base-without-class-name/input'

export type InputProps = InputPropsWocn & {
  className?: ClassName
}

export const Input: FC<InputProps> = createClassNameComponent({
  InputWocn,
})
