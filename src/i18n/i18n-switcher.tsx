import type { ReactNode } from 'react'

import { Text } from '@/components/base/text'
import { View } from '@/components/base/view'
import { useI18nSwitcherProps } from '@/i18n'
import { getLangName, langs } from '@/i18n/config'
import { tw } from '@/tw'
import { cn } from '@/tw/cn'

export const I18nSwitcher = async () => {
  const { currentLang, nativeOnPress, webLink } = await useI18nSwitcherProps()
  return (
    <View
      className={tw`m-2 flex-row items-center gap-2 rounded-full bg-gray-200 p-1`}
    >
      {langs.map(l => {
        let children: ReactNode = (
          <Text
            key={l}
            className={cn(
              tw`rounded-full px-3 py-1 font-medium`,
              currentLang === l
                ? tw`bg-white text-gray-900 shadow-sm`
                : tw`text-gray-600`,
            )}
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
