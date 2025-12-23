import type { PropsWithChildren } from 'react'

import { View } from '@/components/base/view'

export const Layout = ({ children }: PropsWithChildren) => (
  <View className='flex-1 bg-white transition dark:bg-gray-700'>
    {children}
  </View>
)
