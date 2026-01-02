import AsyncStorage from '@react-native-async-storage/async-storage'
import i18next from 'i18next'

import type { Lang } from '@/i18n/config'
import { getLocale, i18nCookieKey } from '@/i18n/config'
import { useCurrentLang } from '@/i18n/index.native'
import type { I18nSwitcherProps } from '@/i18n/use-i18n-switcher-props'

export const useI18nSwitcherProps = (): I18nSwitcherProps => {
  const currentLang = useCurrentLang()
  return {
    currentLang,
    onPress: nativeOnPress,
  }
}
const nativeOnPress = async (v: Lang) => {
  i18next.changeLanguage(v)
  const locale = getLocale(v)
  await AsyncStorage.setItem(i18nCookieKey, locale)
}
