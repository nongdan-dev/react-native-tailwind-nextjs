'use client'

import { Text } from '@/components/base/text'
import { View } from '@/components/base/view'
import { useTranslation } from '@/i18n'
import { useDarkModeUser, useSetDarkMode } from '@/theme'

export const DarkModeSwitcher = async () => {
  const [t, dark] = await Promise.all([
    useTranslation('common'),
    useDarkModeUser(),
  ])
  const setDarkMode = useSetDarkMode()

  const options = [
    {
      value: true,
      name: t('dark'),
    },
    {
      value: false,
      name: t('light'),
    },
    {
      value: undefined,
      name: t('system'),
    },
  ]

  return (
    <View className='m-2 flex-row items-center gap-2 rounded-full bg-gray-200 p-1'>
      {options.map(v => {
        const active = v.value === dark
        return (
          <Text
            key={`${v.value}`}
            className={[
              'rounded-full px-3 py-1 font-medium',
              active ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600',
            ]}
            onPress={() => setDarkMode(v.value)}
          >
            {v.name}
          </Text>
        )
      })}
    </View>
  )
}
