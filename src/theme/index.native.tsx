import AsyncStorage from '@react-native-async-storage/async-storage'
import type { PropsWithChildren } from 'react'
import { createContext, useState } from 'react'
import { useColorScheme } from 'react-native'

import { useSafeContext } from '@/hooks/use-safe-context'
import {
  darkModeCompose,
  darkModeCookieKey,
  darkModeDisabled,
  darkModeEnabled,
  darkModeToBolean,
  toDarkModeState,
} from '@/theme/config'

type ContextState = {
  value: boolean | undefined
  setDarkMode: (v: boolean | undefined) => Promise<void>
}
const Context = createContext<ContextState | undefined>(undefined)

export const useDarkModeUser = () => useSafeContext(Context).value
export const useSetDarkMode = () => useSafeContext(Context).setDarkMode

export const DarkModeProvider = ({ children }: PropsWithChildren) => {
  const [userScheme, setUserScheme] = useState(initialUserScheme)

  const contextState: ContextState = {
    value: userScheme,
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
  const user = useDarkModeUser()
  const os = useColorScheme()
  return toDarkModeState(darkModeCompose(user, os))
}
