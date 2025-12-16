'use client'

import { Text } from '@/components/base/text'
import { View } from '@/components/base/view'
import { useDarkMode, useSetDarkMode } from '@/theme/client'
import { tw } from '@/tw'
import { cn } from '@/tw/cn'

type Props = {
  options: {
    value: boolean | undefined
    name: string
  }[]
}

export const DarkModeSwitcherClient = ({ options }: Props) => {
  const dark = useDarkMode()
  const setDarkMode = useSetDarkMode()

  return (
    <View
      className={tw`m-2 flex-row items-center gap-2 rounded-full bg-gray-200 p-1`}
    >
      {options.map(v => {
        const active =
          v.value === undefined
            ? dark?.system
            : !dark?.system && dark?.dark === v.value
        return (
          <Text
            key={`${v.value}`}
            className={cn(
              tw`rounded-full px-3 py-1 font-medium`,
              active ? tw`bg-white text-gray-900 shadow-sm` : tw`text-gray-600`,
            )}
            onPress={() => setDarkMode(v.value)}
          >
            {v.name}
          </Text>
        )
      })}
    </View>
  )
}
