import type { ReactNode } from 'react'

import { Text } from '@/components/base/text'
import { View } from '@/components/base/view'
import { getLangName, langs } from '@/i18n/config'
import { useI18nSwitcherProps } from '@/i18n/use-i18n-switcher-props'

export const I18nSwitcher = async () => {
  const {
    currentLang,
    onPress: nativeOnPress,
    renderLink: webLink,
  } = await useI18nSwitcherProps()
  return (
    <View className='m-2 flex-row items-center gap-2 rounded-full bg-gray-200 p-1'>
      {langs.map(l => {
        let children: ReactNode = (
          <Text
            key={l}
            className={[
              'rounded-full px-3 py-1 font-medium',
              currentLang === l
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600',
            ]}
            onPress={nativeOnPress && (() => nativeOnPress(l))}
          >
            {getLangName(l)}
          </Text>
        )
        if (webLink) {
          children = webLink(l, children)
        }
        return children
      })}
    </View>
  )
}
