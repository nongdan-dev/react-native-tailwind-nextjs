import AsyncStorage from '@react-native-async-storage/async-storage'
import type { PropsWithChildren } from 'react'
import { createContext, useState } from 'react'
import { Appearance, useColorScheme } from 'react-native'

import { useSafeContext } from '@/hooks/use-safe-context'
import type { DarkMode } from '@/theme/config'
import {
  darkModeCompose,
  darkModeCookieKey,
  darkModeDisabled,
  darkModeEnabled,
  darkModeToBolean,
} from '@/theme/config'
import type { ClassNameDarkModeState } from '@/tw/class-name'

type ContextState = {
  value: DarkMode
  setDarkMode: (v?: boolean) => Promise<void>
}
const Context = createContext<ContextState | undefined>(undefined)

export const useDarkMode = () => useSafeContext(Context).value
export const useSetDarkMode = () => useSafeContext(Context).setDarkMode

export const DarkModeProvider = ({ children }: PropsWithChildren) => {
  const [userScheme, setUserScheme] = useState(initialUserScheme)
  const osScheme = useColorScheme()

  const contextState: ContextState = {
    value: darkModeCompose(userScheme, osScheme),
    setDarkMode: v => {
      let p: Promise<void>
      if (v === true) {
        p = AsyncStorage.setItem(darkModeCookieKey, darkModeEnabled)
      } else if (v === false) {
        p = AsyncStorage.setItem(darkModeCookieKey, darkModeDisabled)
      } else {
        p = AsyncStorage.removeItem(darkModeCookieKey)
      }
      initialUserScheme = v
      setUserScheme(v)
      return p
    },
  }

  return <Context value={contextState}>{children}</Context>
}

// this promise should be await before using the below provider
let initialUserScheme: boolean | undefined = undefined
export const darkModePromise = AsyncStorage.getItem(darkModeCookieKey).then(
  v => {
    initialUserScheme = darkModeToBolean(v)
  },
)

export const useDarkModeState = () => {
  const dark = useDarkMode()
  return toDarkModeState(dark)
}
export const getDarkModeState = () => {
  const osScheme = Appearance.getColorScheme()
  const dark = darkModeCompose(initialUserScheme, osScheme)
  return toDarkModeState(dark)
}
const toDarkModeState = (dark: DarkMode) => {
  const state: ClassNameDarkModeState = {}
  state.dark = dark.dark
  state.light = !state.dark
  return state
}
