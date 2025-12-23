import type { FC } from 'react'

import type { InputPropsWocn } from '@/components/base-without-class-name/input'
import { InputWocn } from '@/components/base-without-class-name/input'
import type { ClassName } from '@/tw/class-name'
import { createClassNameComponent } from '@/tw/lib/create-class-name-component'

export type InputProps = InputPropsWocn & {
  className?: ClassName
}

export const Input: FC<InputProps> = createClassNameComponent(InputWocn)
