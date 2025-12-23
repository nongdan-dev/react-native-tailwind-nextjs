import type { FC } from 'react'

import type { TextPropsWocn } from '@/components/base-without-class-name/text'
import { TextWocn } from '@/components/base-without-class-name/text'
import type { ClassName } from '@/tw/class-name'
import { createClassNameComponent } from '@/tw/lib/create-class-name-component'

export type TextProps = TextPropsWocn & {
  className?: ClassName
}

export const Text: FC<TextProps> = createClassNameComponent(TextWocn)
