import type { PropsWithChildren } from 'react'

import { View } from '@/components/base/view'
import { useTw } from '@/tw'

export const Layout = ({ children }: PropsWithChildren) => {
  const [p] = useTw({
    className: 'flex-1 bg-white transition dark:bg-gray-700',
  })
  return <View {...p}>{children}</View>
}
