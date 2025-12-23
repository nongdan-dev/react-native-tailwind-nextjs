import EventEmitter from 'eventemitter3'
import BrowserCookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { useColorScheme } from 'react-native'

import type { DarkMode } from '@/theme/config'
import {
  darkClassName,
  darkModeCompose,
  darkModeCookieKey,
  darkModeCookieMaxAge,
  darkModeDisabled,
  darkModeEnabled,
  darkModeToBolean,
  lightClassName,
} from '@/theme/config'

let initialUserScheme = darkModeToBolean(BrowserCookies.get(darkModeCookieKey))
const emitter = new EventEmitter()

export const useDarkMode = () => {
  const [userScheme, setUserScheme] = useState(initialUserScheme)
  useEffect(() => {
    emitter.on('change', setUserScheme)
    return () => void emitter.off('change', setUserScheme)
  }, [setUserScheme])

  const osScheme = useColorScheme()

  // os scheme is only available and valid to use in browser
  const [v, setV] = useState<DarkMode>()
  useEffect(() => {
    setV(darkModeCompose(userScheme, osScheme))
  }, [userScheme, osScheme])

  return v
}

export const useSetDarkMode = () => (v?: boolean) => {
  const list = document.documentElement.classList
  list.remove(darkClassName)
  list.remove(lightClassName)
  if (v === true) {
    list.add(darkClassName)
    BrowserCookies.set(darkModeCookieKey, darkModeEnabled, {
      expires: darkModeCookieMaxAge,
    })
  } else if (v === false) {
    list.add(lightClassName)
    BrowserCookies.set(darkModeCookieKey, darkModeDisabled, {
      expires: darkModeCookieMaxAge,
    })
  } else {
    BrowserCookies.remove(darkModeCookieKey)
  }
  initialUserScheme = v
  emitter.emit('change', v)
}
