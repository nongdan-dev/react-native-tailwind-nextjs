import type { FC } from 'react'

import type { PressablePropsWocn } from '@/components/base-without-class-name/pressable'
import { PressableWocn } from '@/components/base-without-class-name/pressable'
import type { ClassName } from '@/tw/class-name'
import { createClassNameComponent } from '@/tw/lib/create-class-name-component'

export type { PressableRn } from '@/components/base-without-class-name/pressable'

export type PressableProps = PressablePropsWocn & {
  className?: ClassName
}

export const Pressable: FC<PressableProps> = createClassNameComponent({
  PressableWocn,
})
