import type { FC } from 'react'

import type { PresencePropsWocn } from '@/components/base-without-class-name/presence'
import { PresenceWocn } from '@/components/base-without-class-name/presence'
import type { ClassName } from '@/tw/class-name'
import { createClassNameComponent } from '@/tw/lib/create-class-name-component'

export type PresenceProps = PresencePropsWocn & {
  className?: ClassName
}

export const Presence: FC<PresenceProps> = createClassNameComponent({
  PresenceWocn,
})
