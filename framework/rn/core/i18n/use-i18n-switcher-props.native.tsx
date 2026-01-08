/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import AsyncStorage from '@react-native-async-storage/async-storage'
import i18next from 'i18next'

import { getLocale, i18nCookieKey } from '@/rn/core/i18n/config'
import { useCurrentLang } from '@/rn/core/i18n/index.native'
import type { I18nSwitcherProps } from '@/rn/core/i18n/use-i18n-switcher-props'

export const useI18nSwitcherProps = (): I18nSwitcherProps => {
  const currentLang = useCurrentLang()
  return {
    currentLang,
    onPress: nativeOnPress,
  }
}
const nativeOnPress = async (v: string) => {
  i18next.changeLanguage(v)
  const locale = getLocale(v)
  await AsyncStorage.setItem(i18nCookieKey, locale)
}
