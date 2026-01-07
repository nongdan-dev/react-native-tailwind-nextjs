/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import type { FC } from 'react'

import type { InputPropsWocn } from '#/components/base-without-class-name/input'
import { InputWocn } from '#/components/base-without-class-name/input'
import type { ClassName } from '#/tw/class-name'
import { createClassNameComponent } from '#/tw/lib/create-class-name-component'

export type { InputRn } from '#/components/base-without-class-name/input'

export type InputProps = InputPropsWocn & {
  className?: ClassName
}

export const Input: FC<InputProps> = createClassNameComponent({
  InputWocn,
})
